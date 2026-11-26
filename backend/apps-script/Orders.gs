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
function createOrderPrivate_(book,payload,point){
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    const sheet=book.getSheetByName('Замовлення'),existing=findOrder_(sheet,payload.requestId);
    if(existing)return {ok:true,number:existing[0],duplicate:true};
    const cfg=orderSettings_(book);
    if(!cfg.enabled)return {ok:false,error:'store_closed'};
    const v=validateOrder_(payload,cfg,point);
    if(v.priceChanged)return {ok:false,error:'price_changed',price:v.price};
    const props=PropertiesService.getScriptProperties(),counter=Number(props.getProperty('ORDER_COUNTER'));
    if(!Number.isSafeInteger(counter)||counter<0)throw Error('counter');
    const next=counter+1,number='KLIK'+String(next).padStart(6,'0');
    // Reserve before writing: a failed write may leave a gap, but cannot reuse a number.
    props.setProperty('ORDER_COUNTER',String(next));
    const now=new Date(),colors=payload.colors.map(c=>c==='yellow'?'Жовтий':'Синій');
    sheet.appendRow([textCell_(number),now,now,'Нове',textCell_(v.name),textCell_(v.phone),
      textCell_(payload.settlementName),textCell_(point.name),textCell_(point.address),textCell_(point.ref),
      payload.quantity===1?'Одна кнопка':'Дві кнопки',payload.quantity,colors[0],colors[1]||'',v.amount,
      'При отриманні','','','','',payload.language,'Так',textCell_(cfg.legal),'Сайт KLIK',textCell_(payload.requestId)]);
    SpreadsheetApp.flush();
    return {ok:true,number,duplicate:false};
  }finally{lock.releaseLock();}
}
