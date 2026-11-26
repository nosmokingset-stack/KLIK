function onOpen() {
  migrateNotificationAddress_();
  cleanupDirectorySettings_();
  SpreadsheetApp.getUi().createMenu('KLIK').addItem('Підготувати таблицю','setupKlik_')
    .addItem('Перевірити довідник Нової пошти','testDirectoryOwner_')
    .addItem('Перевірити тестове замовлення і email','testOrderOwner_')
    .addItem('Перевірити email сповіщень','testNotificationOwner_').addToUi();
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
