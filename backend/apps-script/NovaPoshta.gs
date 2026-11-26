function directoryRequest_(method, fields) {
  if (!['getAreas','getCities','getWarehouses','getWarehouseTypes'].includes(method)) throw Error('Метод довідника не дозволено.');
  const key=PropertiesService.getScriptProperties().getProperty('NOVA_POSHTA_API_KEY');
  if(!key)throw Error('Відсутнє налаштування ключа Нової пошти.');
  const response=UrlFetchApp.fetch('https://api.novaposhta.ua/v2.0/json/',{method:'post',contentType:'application/json',
    followRedirects:false,muteHttpExceptions:true,payload:JSON.stringify({apiKey:key,modelName:'Address',calledMethod:method,methodProperties:fields})});
  if(response.getResponseCode()!==200)throw Error('Довідник: помилка HTTP ('+method+').');
  const envelope=JSON.parse(response.getContentText());
  if(envelope.success!==true||!Array.isArray(envelope.data))throw Error('Довідник: запит відхилено ('+method+').');
  return envelope;
}
function listPages_(method,params,request) {
  const out=[], seen=new Set();
  for(let p=1;p<=100;p++){
    const r=request(method,Object.assign({},params,{Page:String(p),Limit:'100'}));
    for(const item of r.data){
      if(!item.Ref||seen.has(item.Ref))throw Error('Неповна або повторена сторінка довідника.');
      seen.add(item.Ref);out.push(item);
    }
    const total=Number(r.info && r.info.totalCount);
    if(total>0 && out.length===total)return out;
    if(!r.data.length || (r.data.length<100 && !(total>out.length))){
      if(total>out.length)throw Error('Не всі сторінки довідника отримано.');
      return out;
    }
  }
  throw Error('Перевищено ліміт сторінок.');
}
function selectBranches_(warehouses, city, types, stamp) {
  const ordinary=new Map(types.filter(t=>/^(поштове|вантажне) відділення(?:$|\s|\()/i.test(String(t.Description).trim())).map(t=>[t.Ref,t.Description]));
  if(!ordinary.size)throw Error('Не підтверджені типи відділень.');
  const rows=warehouses.filter(w=>w.CityRef===city && ordinary.has(w.TypeOfWarehouse) &&
    (!w.CategoryOfWarehouse || String(w.CategoryOfWarehouse).toLowerCase()==='branch') &&
    (!w.WarehouseStatus || String(w.WarehouseStatus).toLowerCase()==='working') &&
    w.Ref && w.Number && w.Description && w.ShortAddress).map(w=>[
      w.Ref,String(w.Number),w.Description,w.ShortAddress,ordinary.get(w.TypeOfWarehouse),w.WarehouseStatus||'',city,stamp
    ]);
  if(!rows.length)throw Error('Немає підтверджених діючих відділень Харкова.');
  return rows.sort((a,b)=>Number(a[1])-Number(b[1]));
}
function syncBranches_(){
  setupKlik_();
  const book=SpreadsheetApp.getActiveSpreadsheet(), props=PropertiesService.getScriptProperties();
  if(!book||book.getId()!==props.getProperty('SPREADSHEET_ID'))throw Error('Не та таблиця.');
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  const log=book.getSheetByName('Журнал');
  try{
    const areas=directoryRequest_('getAreas',{}).data.filter(a=>/^Харківська(?: область)?$/i.test(String(a.Description).trim()));
    if(areas.length!==1)throw Error('Не підтверджена Харківська область.');
    const cities=listPages_('getCities',{FindByString:'Харків'},directoryRequest_).filter(c=>
      c.Description==='Харків' && c.Area===areas[0].Ref && (!c.SettlementTypeDescription || /^(місто|м\.?)$/i.test(c.SettlementTypeDescription)));
    if(cities.length!==1)throw Error('Не підтверджено однозначний Ref міста Харкова.');
    const city=cities[0].Ref, last=props.getProperty('NOVA_POSHTA_CITY_REF');
    if(last && last!==city)throw Error('Ref Харкова змінився. Потрібна перевірка.');
    const stamp=new Date(),types=directoryRequest_('getWarehouseTypes',{}).data;
    const rows=selectBranches_(listPages_('getWarehouses',{CityRef:city},directoryRequest_),city,types,stamp);
    const sheet=book.getSheetByName('Відділення НП'), height=Math.max(sheet.getLastRow()-1,rows.length);
    if(height+1>sheet.getMaxRows())sheet.insertRowsAfter(sheet.getMaxRows(),height+1-sheet.getMaxRows());
    // Replace the snapshot in one write, only after every page has been validated.
    const safe=rows.map(row=>row.map(v=>typeof v==='string'&&/^[\s]*[=+@-]/.test(v)?"'"+v:v));
    while(safe.length<height)safe.push(Array(8).fill(''));
    sheet.getRange(2,1,height,8).setValues(safe);SpreadsheetApp.flush();
    props.setProperties({NOVA_POSHTA_CITY_REF:city,NP_LAST_SUCCESS:stamp.toISOString()});
    log.appendRow([stamp,'Відділення НП','Інформація','','Довідник Харкова оновлено',String(rows.length)]);
  }catch(e){
    log.appendRow([new Date(),'Відділення НП','Помилка','','Не вдалося оновити довідник','Перевірте налаштування та доступність API']);
    throw Error('Оновлення не завершено. Перевірте ключ, доступність API й відповідність фільтрів довіднику.');
  }finally{lock.releaseLock();}
}
