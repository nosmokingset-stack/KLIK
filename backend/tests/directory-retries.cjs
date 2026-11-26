const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../apps-script/NovaPoshta.gs'),'utf8');
const ok={success:true,data:[]}, busy={success:false,errorCodes:['20000401501']};
function mock(replies){
  let clock=10000;
  const calls=[],sleeps=[];
  const c=vm.createContext({
    Date:class extends Date {static now(){return clock;}},
    Utilities:{sleep:ms=>{assert(ms>=0);sleeps.push(ms);clock+=ms;}},
    PropertiesService:{getScriptProperties:()=>({getProperty:()=>'fixture-only'})},
    UrlFetchApp:{fetch:(url,options)=>{
      calls.push(JSON.parse(options.payload));
      const [status,data,headers={}]=replies.shift();
      return {getResponseCode:()=>status,getContentText:()=>JSON.stringify(data),getHeaders:()=>headers};
    }}
  });
  vm.runInContext(source,c);
  return {calls,sleeps,c};
}
{
  const {c,calls,sleeps}=mock([[200,busy],[429,{}, {'Retry-After':'16'}],[200,ok],[200,ok]]);
  c.directoryRequest_('getWarehouses',{Page:'2'});c.directoryRequest_('getWarehouses',{Page:'3'});
  assert.deepEqual(calls.map(x=>x.methodProperties.Page),['2','2','2','3']);
  assert.deepEqual(sleeps,[5000,16000,2500]);
}
{
  const {c,calls}=mock([[200,{success:false,errorCodes:['12345']}],[200,ok]]);
  assert.throws(()=>c.directoryRequest_('searchSettlements',{}),e=>e.npReason==='api_rejected codes=12345');
  assert.equal(calls.length,1);
}
{
  const {c,calls}=mock(Array(5).fill([200,busy]));
  assert.throws(()=>c.directoryRequest_('getWarehouses',{Page:'7'}),e=>e.npReason==='rate_limited retries=4 page=7');
  assert.equal(calls.length,5);
}
{
  const {c,calls,sleeps}=mock([[429,{}, {'Retry-After':'500'}]]);
  assert.throws(()=>c.directoryRequest_('searchSettlements',{}),e=>e.npReason==='sync_time_budget');
  assert.equal(calls.length,1);assert.deepEqual(sleeps,[]);
}
console.log('PASS: page identity, request pacing, exponential backoff, Retry-After, non-retriable errors, retry cap and time budget');
