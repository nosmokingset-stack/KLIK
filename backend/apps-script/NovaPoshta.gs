function npFailure_(reason) {
  const e=new Error('Не вдалося оновити довідник.');
  e.npReason=reason;
  throw e;
}
// These values are local to one Apps Script execution; the directory job already holds its script lock.
let npNextCallMs_=0, npDeadlineMs_=0;
function npRetryAfterMs_(headers,now) {
  const key=Object.keys(headers||{}).find(k=>k.toLowerCase()==='retry-after');
  if(!key)return 0;
  const value=String(headers[key]).trim();
  return /^\d+$/.test(value)?Number(value)*1000:Math.max(0,(Date.parse(value)||0)-now);
}
function directoryRequest_(method, fields) {
  if (!['getAreas','getCities','getWarehouses','getWarehouseTypes'].includes(method)) throw Error('Метод довідника не дозволено.');
  const key=PropertiesService.getScriptProperties().getProperty('NOVA_POSHTA_API_KEY');
  if(!key)npFailure_('key_missing');
  const options={method:'post',contentType:'application/json',followRedirects:false,muteHttpExceptions:true,
    payload:JSON.stringify({apiKey:key,modelName:'Address',calledMethod:method,methodProperties:fields})};
  if(!npDeadlineMs_)npDeadlineMs_=Date.now()+240000;
  for(let attempt=0;attempt<5;attempt++){
    const now=Date.now();
    if(Math.max(now,npNextCallMs_)>=npDeadlineMs_)npFailure_('sync_time_budget');
    if(npNextCallMs_>now)Utilities.sleep(npNextCallMs_-now);
    const response=UrlFetchApp.fetch('https://api.novaposhta.ua/v2.0/json/',options);
    const status=response.getResponseCode();
    npNextCallMs_=Date.now()+2500;
    let codes=[];
    if(status===200){
      let envelope;
      try{envelope=JSON.parse(response.getContentText());}catch(_){npFailure_('invalid_json');}
      if(envelope?.success===true&&Array.isArray(envelope.data))return envelope;
      codes=(Array.isArray(envelope?.errorCodes)?envelope.errorCodes:[]).map(String).filter(s=>/^\d{1,12}$/.test(s));
      if(!codes.length||!codes.every(c=>c==='20000401501'))npFailure_('api_rejected'+(codes.length?' codes='+codes.slice(0,4).join(','):''));
    }else if(status!==429){
      npFailure_('http='+status);
    }
    if(attempt===4)npFailure_('rate_limited retries=4 page='+(fields.Page||1));
    const end=Date.now(), pause=Math.max(5000*Math.pow(2,attempt),npRetryAfterMs_(response.getHeaders(),end));
    npNextCallMs_=end+pause;
  }
}
function listPages_(method,params,request) {
  const out=[], seen=new Set();
  for(let p=1;p<=100;p++){
    const r=request(method,Object.assign({},params,{Page:String(p),Limit:'100'}));
    for(const item of r.data){
      if(!item.Ref||seen.has(item.Ref))npFailure_('duplicate_or_missing_ref page='+p);
      seen.add(item.Ref);out.push(item);
    }
    const total=Number(r.info && r.info.totalCount);
    if(total>0 && out.length===total)return out;
    if(!r.data.length || (r.data.length<100 && !(total>out.length))){
      if(total>out.length)npFailure_('incomplete page='+p+' count='+out.length+' total='+total);
      return out;
    }
  }
  npFailure_('page_limit');
}
function selectBranches_(warehouses, city, types, stamp) {
  const ordinary=new Map(types.filter(t=>/^(поштове|вантажне) відділення(?:$|\s|\()/i.test(String(t.Description).trim())).map(t=>[t.Ref,t.Description]));
  if(!ordinary.size)npFailure_('no_recognized_types types='+types.length);
  const rows=warehouses.filter(w=>w.CityRef===city && ordinary.has(w.TypeOfWarehouse) &&
    (!w.CategoryOfWarehouse || String(w.CategoryOfWarehouse).toLowerCase()==='branch') &&
    (!w.WarehouseStatus || String(w.WarehouseStatus).toLowerCase()==='working') &&
    w.Ref && w.Number && w.Description && w.ShortAddress).map(w=>[
      w.Ref,String(w.Number),w.Description,w.ShortAddress,ordinary.get(w.TypeOfWarehouse),w.WarehouseStatus||'',city,stamp
    ]);
  if(!rows.length){
    const local=warehouses.filter(w=>w.CityRef===city),typed=local.filter(w=>ordinary.has(w.TypeOfWarehouse));
    npFailure_('no_matches total='+warehouses.length+' local='+local.length+' types='+typed.length+' branch='+typed.filter(w=>!w.CategoryOfWarehouse||String(w.CategoryOfWarehouse).toLowerCase()==='branch').length+' working='+typed.filter(w=>!w.WarehouseStatus||String(w.WarehouseStatus).toLowerCase()==='working').length);
  }
  return rows.sort((a,b)=>Number(a[1])-Number(b[1]));
}
function syncBranches_(){
  setupKlik_();
  const book=SpreadsheetApp.getActiveSpreadsheet(), props=PropertiesService.getScriptProperties();
  if(!book||book.getId()!==props.getProperty('SPREADSHEET_ID'))throw Error('Не та таблиця.');
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  const log=book.getSheetByName('Журнал');
  let stage='areas';
  try{
    const areas=directoryRequest_('getAreas',{}).data.filter(a=>/^Харківська(?: область)?$/i.test(String(a.Description).trim()));
    if(areas.length!==1)npFailure_('area_matches='+areas.length);
    stage='cities';
    const cities=listPages_('getCities',{FindByString:'Харків'},directoryRequest_).filter(c=>
      c.Description==='Харків' && c.Area===areas[0].Ref && (!c.SettlementTypeDescription || /^(місто|м\.?)$/i.test(c.SettlementTypeDescription)));
    if(cities.length!==1)npFailure_('city_matches='+cities.length);
    const city=cities[0].Ref, last=props.getProperty('NOVA_POSHTA_CITY_REF');
    if(last && last!==city)npFailure_('city_ref_changed');
    stage='types';
    const stamp=new Date(),types=directoryRequest_('getWarehouseTypes',{}).data;
    stage='warehouses';
    const warehouses=listPages_('getWarehouses',{CityRef:city},directoryRequest_);
    stage='filter';
    const rows=selectBranches_(warehouses,city,types,stamp);
    stage='write';
    const sheet=book.getSheetByName('Відділення НП'), height=Math.max(sheet.getLastRow()-1,rows.length);
    if(height+1>sheet.getMaxRows())sheet.insertRowsAfter(sheet.getMaxRows(),height+1-sheet.getMaxRows());
    // Replace the snapshot in one write, only after every page has been validated.
    const safe=rows.map(row=>row.map(v=>typeof v==='string'&&/^[\s]*[=+@-]/.test(v)?"'"+v:v));
    while(safe.length<height)safe.push(Array(8).fill(''));
    sheet.getRange(2,1,height,8).setValues(safe);SpreadsheetApp.flush();
    props.setProperties({NOVA_POSHTA_CITY_REF:city,NP_LAST_SUCCESS:stamp.toISOString()});
    log.appendRow([stamp,'Відділення НП','Інформація','','Довідник Харкова оновлено',String(rows.length)]);
  }catch(e){
    const detail='NP:'+stage+' '+(e.npReason||'service_error');
    log.appendRow([new Date(),'Відділення НП','Помилка','','Не вдалося оновити довідник',detail]);
    throw Error('Оновлення не завершено. '+detail);
  }finally{lock.releaseLock();}
}
