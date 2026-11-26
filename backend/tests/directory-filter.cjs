const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const c=vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname,'../apps-script/NovaPoshta.gs'),'utf8'),c);
const b={CityRef:'city',Number:'1',ShortAddress:'Тестова адреса',WarehouseStatus:'Working'};
const row=(Ref,category,description,extra={})=>({...b,Ref,CategoryOfWarehouse:category,Description:description,...extra});
const result=c.pointRows_([
 row('b','Branch','Відділення №1: адреса'),
 row('l','Postomat','Поштомат №2: адреса'),
 row('n','','Поштомат №3: адреса'),
 row('p','ParcelShop','Пункт приймання: адреса'),
 row('closed','Branch','Відділення №4: адреса',{WarehouseStatus:'Closed'}),
 row('other','Branch','Відділення №5: адреса',{CityRef:'other'}),
 row('conflict','Branch','Поштомат №6: адреса')
],'city',0);
assert.deepEqual(Array.from(result,r=>r[0]),['b','l','n']);
assert.deepEqual(Array.from(result,r=>r[4]),['Відділення','Поштомат','Поштомат']);
console.log('PASS: branches, lockers, unknown categories, closed and foreign cities');
