function summarizeKlik_(rows,today,dayOf) {
  const statuses = Object.fromEntries(KLIK.statuses.map(s=>[s,0]));
  const colors = {'Жовтий':0,'Синій':0}, packs = {'Одна кнопка':0,'Дві кнопки':0}, days = {};
  let all=0,units=0,value=0,received=0,month=0,daily=0;
  for(const row of rows){
    if(!row[0]) continue;
    const status=row[3], amount=Number(row[14])||0, day=dayOf(row[1]);
    all++;
    if(Object.prototype.hasOwnProperty.call(statuses,status)) statuses[status]++;
    if(day) {days[day]=(days[day]||0)+1;if(day===today)daily++;if(day.slice(0,7)===today.slice(0,7))month++;}
    if(!['Скасовано','Повернення','Не отримано'].includes(status)) value+=amount;
    if(status!=='Отримано')continue;
    received+=amount; units+=Number(row[11])||0;
    if(row[11]===1)packs['Одна кнопка']++;
    if(row[11]===2)packs['Дві кнопки']++;
    for(const color of row.slice(12,14))if(Object.prototype.hasOwnProperty.call(colors,color))colors[color]++;
  }
  const eligible=all-statuses['Скасовано']-statuses['Повернення']-statuses['Не отримано'];
  return {statuses,colors,packs,days,metrics:[
    ['Загальна кількість замовлень',all],...Object.entries(statuses),['Кількість проданих кнопок',units],
    ['Жовтих кнопок отримано',colors['Жовтий']],['Синіх кнопок отримано',colors['Синій']],
    ['Сума оформлених (без скасувань, неотримань та повернень)',value],['Вартість отриманих замовлень',received],
    ['Середня вартість чинного замовлення',eligible?value/eligible:0],['Замовлення за сьогодні',daily],['Замовлення за поточний місяць',month]
  ]};
}
function refreshStats_(book) {
  const source=book.getSheetByName('Замовлення'), sheet=book.getSheetByName('Статистика');
  const dateOf=d=>d instanceof Date?Utilities.formatDate(d,KLIK.zone,'yyyy-MM-dd'):'';
  const last=source.getLastRow();
  const data=summarizeKlik_(last<2?[]:source.getRange(2,1,last-1,15).getValues(),dateOf(new Date()),dateOf);
  const blocks=[
    [1,'Показник','Значення',data.metrics],
    [4,'День','Замовлення',Object.entries(data.days).sort((a,b)=>a[0].localeCompare(b[0]))],
    [7,'Статус','Кількість',Object.entries(data.statuses)],
    [10,'Колір','Продано',Object.entries(data.colors)],
    [13,'Комплект','Отримано',Object.entries(data.packs)]
  ];
  for(const [col,a,b,entries] of blocks){
    if(entries.length+1>sheet.getMaxRows())sheet.insertRowsAfter(sheet.getMaxRows(),entries.length+1-sheet.getMaxRows());
    sheet.getRange(1,col,sheet.getMaxRows(),2).clearContent();
    sheet.getRange(1,col,1,2).setValues([[a,b]]).setBackground('#09278C').setFontColor('#FFFFFF').setFontWeight('bold');
    if(entries.length)sheet.getRange(2,col,entries.length,2).setValues(entries);
    sheet.setColumnWidth(col,col===1?325:165);sheet.setColumnWidth(col+1,110);
  }
  sheet.setFrozenRows(1);sheet.setTabColor('#FFD200');
  sheet.getRange('B14:B16').setNumberFormat('#,##0.00 "грн"');
  sheet.getRange('A2:A18').setWrap(true);
  sheet.getRange('A20').setValue('Отримання визначається за статусом, не за банківською випискою. Часткові повернення не обліковуються.').setWrap(true);
  sheet.setRowHeight(20,75);
  if(!sheet.getCharts().length){
    for(const [col,row,x,title,type] of [[4,22,1,'Замовлення за днями',Charts.ChartType.LINE],[7,22,7,'Замовлення за статусами',Charts.ChartType.BAR],[10,39,1,'Кольори отриманих кнопок',Charts.ChartType.COLUMN],[13,39,7,'Отримані комплекти',Charts.ChartType.COLUMN]]){
      const range=sheet.getRange(1,col,col===4?sheet.getMaxRows():col===7?9:3,2);
      sheet.insertChart(sheet.newChart().setChartType(type).addRange(range).setNumHeaders(1).setOption('title',title).setOption('colors',['#0066D9','#FFD200']).setPosition(row,x,0,0).build());
    }
  }
}
function onEdit(e) {
  if(!e || !e.range || e.range.getSheet().getName()!=='Замовлення')return;
  if(e.source.getId()!==PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'))return;
  refreshStats_(e.source);
}
