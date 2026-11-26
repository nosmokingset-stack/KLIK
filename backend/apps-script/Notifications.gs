// Owner-invoked: delivery is not transactional with Gmail. Review the journal before retrying.
function sendOrderNoticePrivate_(book,number,row){
  const address=String(book.getSheetByName('Налаштування').getRange('B4').getDisplayValue()).trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address))throw Error('notification_not_configured');
  const body=['Нове замовлення KLIK!','Номер замовлення: '+number,
    'Покупець: '+row[4],'Телефон: '+row[5],'Населений пункт: '+row[6],
    'Точка Нової пошти: '+row[7],'Адреса: '+row[8],'Комплект: '+row[10],
    'Кольори: '+[row[12],row[13]].filter(Boolean).join(', '),
    'Вартість товару: '+row[14]+' грн','Оплата: при отриманні','Статус: Нове',
    'Таблиця: '+book.getUrl()].join('\n');
  MailApp.sendEmail(address,'KLIK – нове замовлення №'+number,body);
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
