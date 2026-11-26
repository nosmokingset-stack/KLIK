function onOpen() {
  SpreadsheetApp.getUi().createMenu('KLIK').addItem('Підготувати таблицю','setupKlik_')
    .addItem('Оновити відділення й поштомати міста','syncBranches_').addToUi();
}
