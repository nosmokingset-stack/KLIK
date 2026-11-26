const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
let blue=false,marker='',held=false,writes=0;
const sheet={getRange:k=>({getDisplayValue:()=>k==='A9'?'Синій доступний':'',setValue:v=>{blue=v;writes++}})};
const props={getProperty:k=>k==='SPREADSHEET_ID'?'book':marker,setProperty:(_,v)=>{marker=v}};
const ctx={SpreadsheetApp:{getActiveSpreadsheet:()=>({getId:()=> 'book',getSheetByName:()=>sheet}),flush:()=>{}},
 PropertiesService:{getScriptProperties:()=>props},LockService:{getScriptLock:()=>({waitLock:()=>{assert(!held);held=true},releaseLock:()=>{held=false}})}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../apps-script/Code.gs'),'utf8'),ctx);
ctx.enableBlueOnce_();assert.equal(blue,true);assert.equal(marker,'done');assert.equal(held,false);
blue=false;ctx.enableBlueOnce_();assert.equal(blue,false);assert.equal(writes,1);
console.log('PASS: blue activation runs once; later owner changes stay intact');
