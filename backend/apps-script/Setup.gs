// Owner-only initializer. The trailing underscore keeps this off google.script.run.
function setupKlik_() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const props = PropertiesService.getScriptProperties();
  if (!book || book.getName() !== KLIK.title) throw Error('Відкрийте прив’язаний проєкт таблиці KLIK.');
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const id = props.getProperty('SPREADSHEET_ID');
    if (id && id !== book.getId()) throw Error('Інша таблиця. Налаштування зупинено.');
    if (!id) {
      const first = book.getSheets();
      if (first.length !== 1 || first[0].getLastRow()) throw Error('Потрібна нова порожня таблиця KLIK.');
      props.setProperty('SPREADSHEET_ID',book.getId());
    }
    if (props.getProperty('SETUP_VERSION') === '1.5') return;
    book.setSpreadsheetLocale(KLIK.locale);
    book.setSpreadsheetTimeZone(KLIK.zone);
    const names = ['Замовлення','Налаштування','Статистика','Журнал'];
    if (!book.getSheetByName(names[0])) book.getSheets()[0].setName(names[0]);
    const [orders, settings, stats, journal] = names.map(n=>book.getSheetByName(n)||book.insertSheet(n));
    if (orders.getLastRow()>1 || journal.getLastRow()>1) throw Error('Є робочі записи. Автоматичну ініціалізацію зупинено.');
    setupHeader_(orders,KLIK.orders,[145,105,95,140,210,155,105,240,300,290,155,115,135,135,145,170,180,135,135,260,110,140,180,180,300]);
    setupHeader_(settings,['Параметр','Значення'],[290,285]);
    setupHeader_(journal,KLIK.log,[165,185,105,155,340,155]);
    journal.getRange('A2:A').setNumberFormat('dd.MM.yyyy HH:mm:ss');
    for (const c of ['A','F','J','Q','W','Y']) orders.getRange(c+'2:'+c).setNumberFormat('@');
    for (const c of ['B','R','S']) orders.getRange(c+'2:'+c).setNumberFormat('dd.MM.yyyy');
    orders.getRange('C2:C').setNumberFormat('HH:mm:ss');
    orders.getRange('O2:O').setNumberFormat('#,##0.00 "грн"');
    const status = orders.getRange('D2:D');
    status.setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(KLIK.statuses,true).setAllowInvalid(false).build());
    orders.setConditionalFormatRules(KLIK.statuses.map((s,i)=>SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(s)
      .setBackground(KLIK.colors[i]).setFontColor(i===3?'#FFFFFF':'#10223A').setRanges([status]).build()));
    if (!orders.getFilter()) orders.getRange(1,1,orders.getMaxRows(),25).createFilter();
    settings.getRange('B3').setNumberFormat('@');
    if(settings.getLastRow()<=1) settings.getRange(2,1,KLIK.settings.length,2).setValues(KLIK.settings);
    for(const a of ['B8','B9','B10']) settings.getRange(a).setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build());
    settings.getRange('B5:B6').setNumberFormat('#,##0.00 "грн"');
    if (!props.getProperty('ADMIN_EMAIL')) props.setProperty('ADMIN_EMAIL',String(settings.getRange('B4').getValue()));
    if (props.getProperty('ORDER_COUNTER')===null) props.setProperty('ORDER_COUNTER','0');
    refreshStats_(book);
    SpreadsheetApp.flush();
    props.setProperty('SETUP_VERSION','1.5');
  } finally {lock.releaseLock();}
}
function setupHeader_(sheet, labels, widths) {
  sheet.setFrozenRows(1);
  sheet.setTabColor('#0066D9');
  sheet.getRange(1,1,1,labels.length).setValues([labels]).setBackground('#09278C').setFontColor('#FFFFFF').setFontWeight('bold').setWrap(true);
  sheet.setRowHeight(1,46);
  widths.forEach((w,i)=>sheet.setColumnWidth(i+1,w));
  sheet.getRange(2,1,sheet.getMaxRows()-1,labels.length).setWrap(true).setVerticalAlignment('middle');
}
