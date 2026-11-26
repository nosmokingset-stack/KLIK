function onOpen() {
  migrateNotificationAddress_();
  cleanupDirectorySettings_();
  migrateLegalVersion_();
  try{cleanupDirectorySheet_();}catch(_){}
  SpreadsheetApp.getUi().createMenu('KLIK').addItem('Підготувати таблицю','setupKlik_')
    .addItem('Перевірити довідник Нової пошти','testDirectoryOwner_')
    .addItem('Перевірити тестове замовлення і email','testOrderOwner_')
    .addItem('Перевірити email сповіщень','testNotificationOwner_').addToUi();
}
function migrateLegalVersion_(){
  const book=SpreadsheetApp.getActiveSpreadsheet(),props=PropertiesService.getScriptProperties();
  if(!book||book.getId()!==props.getProperty('SPREADSHEET_ID'))return;
  const s=book.getSheetByName('Налаштування');
  if(s&&s.getRange('A11').getDisplayValue()==='Версія юридичних документів'&&s.getRange('B11').getDisplayValue()==='1.4-draft')
    s.getRange('B11').setValue('1.5-draft');
}
function cleanupDirectorySheet_(){
  const book=SpreadsheetApp.getActiveSpreadsheet(),props=PropertiesService.getScriptProperties();
  if(!book||book.getId()!==props.getProperty('SPREADSHEET_ID')||props.getProperty('DIRECTORY_REMOVED_V1')==='done')return;
  const sheet=book.getSheetByName('Відділення НП');
  if(!sheet){props.setProperty('DIRECTORY_REMOVED_V1','done');return;}
  const expected=['Ref','Номер','Назва','Адреса','Тип','Статус','Ref міста','Оновлено'];
  if(sheet.getLastColumn()>9||JSON.stringify(sheet.getRange(1,1,1,8).getDisplayValues()[0])!==JSON.stringify(expected))return;
  book.deleteSheet(sheet);
  props.setProperty('DIRECTORY_REMOVED_V1','done');
}
function cleanupDirectorySettings_(){
  const book=SpreadsheetApp.getActiveSpreadsheet(),props=PropertiesService.getScriptProperties();
  if(!book||book.getId()!==props.getProperty('SPREADSHEET_ID'))return;
  const sheet=book.getSheetByName('Налаштування');if(!sheet)return;
  const obsolete=['Щоденно оновлювати відділення','Поріг застарілості, год'];
  const n=sheet.getLastRow();if(n<2)return;
  const names=sheet.getRange(2,1,n-1,1).getDisplayValues();
  names.forEach((row,i)=>{if(obsolete.includes(row[0]))sheet.getRange(i+2,1,1,2).clearContent();});
}
function migrateNotificationAddress_(){
  const book=SpreadsheetApp.getActiveSpreadsheet(),props=PropertiesService.getScriptProperties();
  if(!book||book.getId()!==props.getProperty('SPREADSHEET_ID'))return;
  const sheet=book.getSheetByName('Налаштування');
  if(!sheet||String(sheet.getRange('A4').getDisplayValue())!=='Email сповіщень')return;
  const lock=LockService.getScriptLock();lock.waitLock(10000);
  try{
    if(props.getProperty('NOTIFICATION_SETTINGS_V2')==='done')return;
    const address=sheet.getRange('B4');
    if(String(address.getDisplayValue()).trim().toLowerCase()==='igoryarmack@gmail.com')address.setValue('nosmokingset@gmail.com');
    props.setProperty('NOTIFICATION_SETTINGS_V2','done');
  }finally{lock.releaseLock();}
}
