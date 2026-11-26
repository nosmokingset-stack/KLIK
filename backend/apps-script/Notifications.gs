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
