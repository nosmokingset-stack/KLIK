// Owner-invoked: delivery is not transactional with Gmail. Review the journal before retrying.
function sendOrderNoticePrivate_(book,number,row){
  const address=String(book.getSheetByName('Налаштування').getRange('B4').getDisplayValue()).trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address))throw Error('notification_not_configured');
  const body=['Нове замовлення KLIK!','Номер замовлення: '+number,
    'Покупець: '+row[4],'Телефон: '+row[5],'Населений пункт: '+row[6],
    'Точка Нової пошти: '+row[7],'Адреса: '+row[8],'Комплект: '+row[10],
    'Колір кнопки №1: '+row[12],
    ...(row[13]?['Колір кнопки №2: '+row[13]]:[]),
    'Вартість товару: '+row[14]+' грн','Оплата: при отриманні','Статус: Нове',
    'Таблиця: '+book.getUrl()].join('\n');
  MailApp.sendEmail(address,'KLIK – нове замовлення №'+number,body);
}
function sendOrderNoticeOnce_(book,number,row){
  if(!/^KLIK\d{6,}$/.test(number))throw Error('invalid_order_number');
  const props=PropertiesService.getScriptProperties(),key='NOTICE_'+number;
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    if(props.getProperty(key))return;
    // Mark before sending: on ambiguous failure an owner must inspect email before retrying.
    props.setProperty(key,'uncertain');
  }finally{lock.releaseLock();}
  try{
    sendOrderNoticePrivate_(book,number,row);
    props.setProperty(key,'sent');
    book.getSheetByName('Журнал').appendRow([new Date(),'Email замовлення','Інформація',number,'Сповіщення передано MailApp','sent']);
  }catch(_){
    try{book.getSheetByName('Журнал').appendRow([new Date(),'Email замовлення','Помилка',number,'Перевірте доставку до повторної відправки','uncertain']);}catch(__){}
  }
}
function testNotificationOwner_(){
  const book=SpreadsheetApp.getActiveSpreadsheet(),props=PropertiesService.getScriptProperties();
  if(!book||book.getId()!==props.getProperty('SPREADSHEET_ID'))throw Error('Не та таблиця.');
  const row=Array(25).fill('');
  Object.assign(row,{4:'Тест Покупець',5:'380671234567',6:'Тестове місто',7:'Тестове відділення',
    8:'Тестова адреса',10:'Одна кнопка',12:'Жовтий',14:'199'});
  sendOrderNoticePrivate_(book,'ТЕСТ KLIK000000',row);
  book.getSheetByName('Журнал').appendRow([new Date(),'Тест email','Інформація','','Лише тестові дані','MailApp: надіслано']);
  SpreadsheetApp.getUi().alert('Тестове повідомлення передано Google Mail. Перевірте адресу в налаштуваннях і папку спаму.');
}
