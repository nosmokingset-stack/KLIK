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
function pointRows_(warehouses, city, stamp) {
  const clean=v=>String(v==null?'':v).trim().replace(/\s+/g,' ');
  const rows=[];
  for(const w of warehouses){
    if(clean(w.CityRef).toLowerCase()!==city.toLowerCase() || !clean(w.Ref) || !clean(w.Number) || !clean(w.ShortAddress))continue;
    const category=clean(w.CategoryOfWarehouse).toLowerCase(), status=clean(w.WarehouseStatus).toLowerCase();
    if(status && status!=='working')continue;
    const heading=clean(w.Description).split(':')[0].toLowerCase();
    if(!heading || /parcel\s*shop|пункт приймання|пункт видачі|партнерськ/.test(heading))continue;
    const byName=/^(?:поштомат|почтомат|постамат)/.test(heading)?'locker':/^(?:(?:поштове|вантажне) )?відділення/.test(heading)?'branch':'';
    const byCategory={branch:'branch',postomat:'locker',poshtomat:'locker',parcelstation:'locker',postmachine:'locker'}[category];
    if(category && !byCategory || byCategory && byName && byCategory!==byName)continue;
    const kind=byCategory||byName;
    if(!['branch','locker'].includes(kind))continue;
    rows.push([w.Ref,String(w.Number),w.Description,w.ShortAddress,kind==='branch'?'Відділення':'Поштомат',w.WarehouseStatus||'',w.CityRef,stamp,w.CityDescription||'']);
  }
  return rows;
}
function syncBranches_(){
  setupKlik_();
  const ui=SpreadsheetApp.getUi(),book=SpreadsheetApp.getActiveSpreadsheet(),props=PropertiesService.getScriptProperties();
  if(!book||book.getId()!==props.getProperty('SPREADSHEET_ID'))throw Error('Не та таблиця.');
  const cfg=book.getSheetByName('Налаштування');
  if(String(cfg.getRange('A7').getValue())==='Місто доставки')cfg.getRange('A7:B7').setValues([['Географія доставки','Україна']]);
  const ask=ui.prompt('Довідник Нової пошти','Назва населеного пункту України:',ui.ButtonSet.OK_CANCEL);
  if(ask.getSelectedButton()!==ui.Button.OK)return;
  const found=cityLookup_(ask.getResponseText());
  if(!found.length){ui.alert('Населений пункт не знайдено.');return;}
  let choice=found[0];
  if(found.length>1){
    const ans=ui.prompt('Оберіть населений пункт',found.map((c,i)=>(i+1)+'. '+c.label).join('\n'),ui.ButtonSet.OK_CANCEL);
    if(ans.getSelectedButton()!==ui.Button.OK)return;
    choice=found[Number(ans.getResponseText())-1];if(!choice)throw Error('Невірний номер.');
  }
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  const log=book.getSheetByName('Журнал');
  try{
    const stamp=new Date(),all=listPages_('getWarehouses',{CityRef:choice.ref},directoryRequest_),rows=pointRows_(all,choice.ref,stamp);
    if(!rows.length)npFailure_('no_active_points total='+all.length);
    const sh=book.getSheetByName('Відділення НП'),n=sh.getLastRow()-1;
    const others=n?sh.getRange(2,1,n,9).getValues().filter(r=>r[0] && r[6]!==choice.ref):[];
    // Preserve snapshots of other cities. Only this city's complete refresh is replaced.
    const merged=others.concat(rows).map(row=>row.map(v=>typeof v==='string'&&/^\s*[=+@-]/.test(v)?"'"+v:v));
    while(merged.length<n)merged.push(Array(9).fill(''));
    if(merged.length+1>sh.getMaxRows())sh.insertRowsAfter(sh.getMaxRows(),merged.length+1-sh.getMaxRows());
    sh.getRange('I1').setValue('Населений пункт');
    sh.getRange(2,1,merged.length,9).setValues(merged);SpreadsheetApp.flush();
    props.setProperty('NP_LAST_SUCCESS',stamp.toISOString());
    log.appendRow([stamp,'Відділення НП','Інформація','','Оновлено точки доставки: '+choice.label,String(rows.length)]);
  }catch(e){
    const detail='NP:directory '+(e.npReason||'service_error');
    log.appendRow([new Date(),'Відділення НП','Помилка','','Не вдалося оновити довідник',detail]);throw Error(detail);
  }finally{lock.releaseLock();}
}
