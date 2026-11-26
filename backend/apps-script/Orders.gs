// Private order service. Not exposed by the deployed read-only directory.
function orderSettings_(book){
  const s=book.getSheetByName('Налаштування');
  return {one:Number(s.getRange('B5').getValue()),two:Number(s.getRange('B6').getValue()),
    yellow:s.getRange('B8').getValue()===true,blue:s.getRange('B9').getValue()===true,
    enabled:s.getRange('B10').getValue()===true,legal:String(s.getRange('B11').getValue())};
}
function textCell_(value){return "'"+String(value==null?'':value).replace(/[\u0000-\u001f\u007f]/g,' ').trim();}
function validateOrder_(payload,cfg,point){
  if(!payload||typeof payload!=='object'||Array.isArray(payload))throw Error('invalid');
  const name=String(payload.name||'').normalize('NFC').trim().replace(/\s+/g,' ');
  const phone=String(payload.phone||'').replace(/[\s()+-]/g,'');
  if(name.length>80||name.split(' ').filter(s=>/\p{L}/u.test(s)).length<2)throw Error('name');
  if(!/^380[1-9]\d{8}$/.test(phone))throw Error('phone');
  if(![1,2].includes(payload.quantity)||!Array.isArray(payload.colors)||payload.colors.length!==payload.quantity)throw Error('quantity');
  if(payload.colors.some(c=>!['yellow','blue'].includes(c)||!cfg[c]))throw Error('color');
  if(!refOK_(payload.settlementRef)||!refOK_(payload.pointRef)||!point||point.ref!==payload.pointRef)throw Error('point');
  if(typeof payload.settlementName!=='string'||payload.settlementName.trim().length<2||payload.settlementName.length>150)throw Error('city');
  if(payload.consent!==true||payload.legalVersion!==cfg.legal||!['uk','ru'].includes(payload.language))throw Error('consent');
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(payload.requestId||''))throw Error('request');
  const amount=payload.quantity===1?cfg.one:cfg.two;
  if(!Number.isSafeInteger(amount)||amount<=0||amount>100000)throw Error('config');
  if(payload.confirmedPrice!==amount)return {priceChanged:true,price:amount};
  return {name,phone,amount};
}
function findOrder_(sheet,requestId){
  const n=sheet.getLastRow()-1;if(n<=0)return null;
  const refs=sheet.getRange(2,25,n,1).getDisplayValues();
  const i=refs.findIndex(r=>r[0]===requestId);
  return i<0?null:sheet.getRange(i+2,1,1,25).getDisplayValues()[0];
}
function createOrderPrivate_(book,payload){
  if(!payload || typeof payload!=='object')throw Error('invalid');
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(payload.requestId||''))throw Error('request');
  const initialLock=LockService.getScriptLock();initialLock.waitLock(20000);
  try{
    const existing=findOrder_(book.getSheetByName('Замовлення'),payload.requestId);
    if(existing)return {ok:true,number:existing[0],duplicate:true};
  }finally{initialLock.releaseLock();}
  const initial=orderSettings_(book);
  if(!initial.enabled)return {ok:false,error:'store_closed'};
  const props=PropertiesService.getScriptProperties();
  const testBook=props.getProperty('KLIK_TEST_BOOK_ID')===book.getId();
  if(!testBook&&props.getProperty('ALLOW_LIVE_ORDERS')!=='YES')return {ok:false,error:'store_closed'};
  const cityName=CacheService.getScriptCache().get('ua4:valid:'+payload.settlementRef);
  if(!cityName || cityName!==payload.settlementName)throw Error('city_expired');
  const point=verifiedPoint_(payload.settlementRef,payload.pointRef);
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  let result,notify=true;
  try{
    const sheet=book.getSheetByName('Замовлення'),existing=findOrder_(sheet,payload.requestId);
    if(existing)return {ok:true,number:existing[0],duplicate:true};
    const cfg=orderSettings_(book);
    if(!cfg.enabled)return {ok:false,error:'store_closed'};
    const v=validateOrder_(payload,cfg,point);
    if(v.priceChanged)return {ok:false,error:'price_changed',price:v.price};
    const counterKey=book.getId()===props.getProperty('KLIK_TEST_BOOK_ID')?'ORDER_TEST_COUNTER':'ORDER_COUNTER';
    notify=counterKey!=='ORDER_TEST_COUNTER';
    const raw=props.getProperty(counterKey);
    if(raw===null&&counterKey==='ORDER_COUNTER')throw Error('counter_missing');
    const counter=raw===null?0:Number(raw);
    if(!Number.isSafeInteger(counter)||counter<0)throw Error('counter');
    const next=counter+1,number='KLIK'+String(next).padStart(6,'0');
    // Reserve before writing: a failed write may leave a gap, but cannot reuse a number.
    props.setProperty(counterKey,String(next));
    const now=new Date(),colors=payload.colors.map(c=>c==='yellow'?'Жовтий':'Синій');
    sheet.appendRow([textCell_(number),now,now,'Нове',textCell_(v.name),textCell_(v.phone),
      textCell_(payload.settlementName),textCell_(point.name),textCell_(point.address),textCell_(point.ref),
      payload.quantity===1?'Одна кнопка':'Дві кнопки',payload.quantity,colors[0],colors[1]||'',v.amount,
      'При отриманні','','','','',payload.language,'Так',textCell_(cfg.legal),'Сайт KLIK',textCell_(payload.requestId)]);
    SpreadsheetApp.flush();
    result={ok:true,number,duplicate:false};
  }finally{lock.releaseLock();}
  try{
    const saved=findOrder_(book.getSheetByName('Замовлення'),payload.requestId);
    try{book.getSheetByName('Журнал').appendRow([new Date(),'Замовлення','Інформація',result.number,'Замовлення збережено','ok']);}catch(_){}
    if(saved&&notify)sendOrderNoticeOnce_(book,result.number,saved);
  }catch(_){
    // A saved order is never rolled back because mail or logging failed.
  }
  return result;
}
