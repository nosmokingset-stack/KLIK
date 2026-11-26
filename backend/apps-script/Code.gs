function onOpen() {
  SpreadsheetApp.getUi().createMenu('KLIK').addItem('Підготувати таблицю','setupKlik_')
    .addItem('Оновити відділення Харкова','syncBranches_').addToUi();
}
