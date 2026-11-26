// Creates a separate owner-only test workbook; never switches on the real store.
function testOrderOwner_(){
  const active=SpreadsheetApp.getActiveSpreadsheet(),props=PropertiesService.getScriptProperties(),ui=SpreadsheetApp.getUi();
  if(!active || active.getId()!==props.getProperty('SPREADSHEET_ID'))throw Error('Тест дозволено лише з таблиці KLIK.');
  const c=cityLookup_('Харків').find(x=>/^(?:м\.\s*)?Харків(?:\s*\(|\s*,)/i.test(x.label)&&/Харківськ/i.test(x.label));
  if(!c)throw Error('Населений пункт не знайдено.');
  const page=cityPage_(c.ref,1),point=page.items.find(x=>x.kind==='branch');
  if(!point)throw Error('Відділення не знайдено.');
  const confirmed=verifiedPoint_(c.ref,point.ref);
  if(!confirmed)throw Error('Перевірка відділення не пройдена.');
  const test=SpreadsheetApp.create('KLIK – ТЕСТОВІ ЗАМОВЛЕННЯ');
  const sheet=test.getSheets()[0];sheet.setName('Замовлення');sheet.appendRow(KLIK.orders);
  const settings=test.insertSheet('Налаштування');
  settings.getRange(1,1,1,2).setValues([['Параметр','Значення']]);
  settings.getRange(2,1,KLIK.settings.length,2).setValues(KLIK.settings);
  settings.getRange('B10').setValue(true);
  const requestId=Utilities.getUuid(),order={name:'Тест Покупець',phone:'380671234567',quantity:1,colors:['yellow'],
    settlementRef:c.ref,settlementName:c.label,pointRef:point.ref,consent:true,legalVersion:'1.5-draft',
    language:'uk',requestId,confirmedPrice:199};
  // Do not touch the production counter: use a dedicated test property and restore under lock.
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  const previous=props.getProperty('ORDER_COUNTER');
  try{
    // Use a test-only counter key selected by the workbook identity.
    props.setProperty('KLIK_TEST_BOOK_ID',test.getId());
  }finally{lock.releaseLock();}
  let result;
  try{
    result=createOrderPrivate_(test,order);
    if(!result.ok)throw Error('Тестове збереження не виконано: '+result.error);
    const repeated=createOrderPrivate_(test,order);
    if(!repeated.duplicate || repeated.number!==result.number || sheet.getLastRow()!==2)throw Error('Помилка перевірки повтору.');
    const row=sheet.getRange(2,1,1,25).getDisplayValues()[0];
    sendOrderNoticePrivate_(test,'ТЕСТ '+result.number,row);
    ui.alert('Тестове замовлення збережено окремо. Тестовий лист надіслано. Таблиця: '+test.getUrl());
  }finally{
    props.deleteProperty('KLIK_TEST_BOOK_ID');
  }
}
