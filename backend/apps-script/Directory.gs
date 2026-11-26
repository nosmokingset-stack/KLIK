// This endpoint only serves public carrier directory data. It never opens the order sheet.
function refOK_(v){return /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(v||'');}
function directoryCache_(key,load){
  const c=CacheService.getScriptCache(),prefix='ua3:',cached=c.get(prefix+key);
  if(cached!==null)return JSON.parse(cached);
  const lock=LockService.getScriptLock();
  if(!lock.tryLock(12000))throw Error('busy');
  try{
    const prior=c.get(prefix+key);if(prior!==null)return JSON.parse(prior);
    const now=Date.now(),bucket=String(Math.floor(now/60000)),calls=Number(c.get(prefix+bucket)||0);
    if(calls>=24)throw Error('busy');
    c.put(prefix+bucket,String(calls+1),120);
    npNextCallMs_=Math.max(npNextCallMs_,Number(c.get(prefix+'next')||0));
    try{
      const value=load(), json=JSON.stringify(value);
      if(Utilities.newBlob(json).getBytes().length<98000)c.put(prefix+key,json,21600);
      return value;
    }finally{c.put(prefix+'next',String(npNextCallMs_),300);}
  }finally{lock.releaseLock();}
}
function cityLookup_(raw){
  const q=String(raw||'').normalize('NFC').trim().replace(/\s+/g,' ').toLowerCase();
  if(q.length<2||q.length>60||!/^[\p{L}\p{M} '\u2019\u02bc.\-]+$/u.test(q))return [];
  const result=directoryCache_('c:'+q,()=>directoryRequest_('getCities',{FindByString:q,Limit:'40',Page:'1'}).data.filter(c=>refOK_(c.Ref)&&c.Description).map(c=>({
    ref:c.Ref,label:[c.Description,c.AreaDescription,c.SettlementTypeDescription].filter(Boolean).join(', ')
  })));
  const c=CacheService.getScriptCache();
  for(const item of result)c.put('ua3:valid:'+item.ref,'1',21600);
  return result;
}
function cityPage_(ref,p){
  if(!refOK_(ref)||!Number.isInteger(p)||p<1||p>200)throw Error('invalid');
  const c=CacheService.getScriptCache();
  if(!c.get('ua3:valid:'+ref) || p>1 && !c.get('ua3:page:'+ref+':'+p))throw Error('expired');
  const result=directoryCache_('p:'+ref+':'+p,()=>{
    const r=directoryRequest_('getWarehouses',{CityRef:ref,Page:String(p),Limit:'200'});
    const total=Number(r.info && r.info.totalCount);
    return {items:pointRows_(r.data,ref,'').map(a=>({ref:a[0],number:a[1],address:a[3],kind:a[4]==='Поштомат'?'locker':'branch'})),
      more:r.data.length>0&&(total>0?p*200<total:r.data.length>=200)};
  });
  if(result.more)c.put('ua3:page:'+ref+':'+(p+1),'1',21600);
  return result;
}
function doGet(e){
  const p=e&&e.parameter||{};let body;
  try{
    if(p.action==='health')body={ok:true,scope:'UA',ordersEnabled:false};
    else if(p.action==='cities')body={ok:true,items:cityLookup_(p.q)};
    else if(p.action==='points')body=Object.assign({ok:true},cityPage_(p.city,Number(p.page||1)));
    else body={ok:false,error:'unknown_action'};
  }catch(_){body={ok:false,error:'directory_unavailable'};}
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
