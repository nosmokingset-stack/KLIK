function onOpen() {
  migrateNotificationAddress_();
  SpreadsheetApp.getUi().createMenu('KLIK').addItem('Підготувати таблицю','setupKlik_')
    .addItem('Перевірити довідник Нової пошти','testDirectoryOwner_')
    .addItem('Перевірити тестове замовлення і email','testOrderOwner_').addToUi();
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
