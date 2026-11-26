const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
let called=0,html='';
const props={getProperty:()=> 'test-workbook'};
const ctx={CacheService:{getScriptCache:()=>({get:()=>null,put:()=>{}})},
 LockService:{getScriptLock:()=>({waitLock:()=>{},releaseLock:()=>{}})},
 PropertiesService:{getScriptProperties:()=>props},SpreadsheetApp:{openById:()=>({})},
 createOrderPrivate_:()=>{called++;return {ok:false,error:'store_closed'}},
 HtmlService:{XFrameOptionsMode:{ALLOWALL:'ALLOWALL'},createHtmlOutput:s=>{html=s;return {setXFrameOptionsMode:()=>s}}}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../apps-script/Transport.gs'),'utf8'),ctx);
const nonce='a'.repeat(32),order=JSON.stringify({name:'test'});
ctx.doPost({parameter:{origin:'https://attacker.example',nonce,order}});assert.equal(called,0);
ctx.doPost({parameter:{origin:'https://klik.kh.ua',nonce:'bad',order}});assert.equal(called,0);
ctx.doPost({parameter:{origin:'https://klik.kh.ua',nonce,order:'x'.repeat(4097)}});assert.equal(called,0);
ctx.doPost({parameter:{origin:'https://klik.kh.ua',nonce,order:JSON.stringify({website:'spam'})}});assert.equal(called,0);
ctx.doPost({parameter:{origin:'https://klik.kh.ua',nonce,order}});assert.equal(called,1);
assert(html.includes('store_closed'));assert(!html.includes('test'));assert(html.includes('https://klik.kh.ua'));
console.log('PASS: closed order response, origin, nonce, size, spam trap and no customer data in response');
