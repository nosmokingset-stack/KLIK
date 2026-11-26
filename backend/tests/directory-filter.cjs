const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const c=vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname,'../apps-script/Directory.gs'),'utf8'),c);
const id='aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
const result=c.mapPoints_([
 {Ref:id,Description:'Відділення №1',WarehouseStatus:'Working'},
 {Ref:id,Description:'Поштомат №2',CategoryOfWarehouse:'Postomat'},
 {Ref:id,Description:'Поштомат №3',WarehouseStatus:'Closed'},
 {Ref:'invalid',Description:'Відділення'}
]);
assert.deepEqual(Array.from(result,r=>r.kind),['branch','locker']);
console.log('PASS: carrier branch and locker mapping, closed and invalid locations excluded');
