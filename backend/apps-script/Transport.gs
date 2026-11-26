// POST never returns customer details. Origin and nonce are transport checks, not authentication.
function doPost(e){
  const p=e&&e.parameter||{},origin=String(p.origin||''),nonce=String(p.nonce||'');
  const allowed=['https://klickkhua.blogspot.com','https://klik.kh.ua'];
  let result={ok:false,error:'unavailable'};
  if(allowed.includes(origin)&&/^[0-9a-f]{32}$/.test(nonce)){
    try{
      const raw=String(p.order||'');
      if(raw.length>4096)throw Error('size');
      const payload=JSON.parse(raw);
      if(payload.website)throw Error('spam');
      const cache=CacheService.getScriptCache(),lock=LockService.getScriptLock();
      lock.waitLock(10000);
      try{
        const k='orders-rate:'+Math.floor(Date.now()/60000),n=Number(cache.get(k)||0);
        if(n>=15)throw Error('rate_limited');
        cache.put(k,String(n+1),120);
      }finally{lock.releaseLock();}
      const id=PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
      if(!id)throw Error('unavailable');
      result=createOrderPrivate_(SpreadsheetApp.openById(id),payload);
    }catch(err){result={ok:false,error:err&&err.message==='city_expired'?'city_expired':'unavailable'};}
  }
  const message=JSON.stringify({channel:'klik-order-v1',nonce,result}).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
  const target=allowed.includes(origin)?JSON.stringify(origin):'""';
  return HtmlService.createHtmlOutput('<!doctype html><meta charset="utf-8"><script>if('+target+')window.top.postMessage('+message+','+target+');<\/script>')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
