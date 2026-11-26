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
  if (!['searchSettlements','getWarehouses'].includes(method)) throw Error('Метод довідника не дозволено.');
  const key=PropertiesService.getScriptProperties().getProperty('NOVA_POSHTA_API_KEY');
  if(!key)npFailure_('key_missing');
  const options={method:'post',contentType:'application/json',followRedirects:false,muteHttpExceptions:true,
    payload:JSON.stringify({apiKey:key,modelName:'AddressGeneral',calledMethod:method,methodProperties:fields})};
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
