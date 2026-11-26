function onOpen() {
  SpreadsheetApp.getUi().createMenu('KLIK').addItem('Підготувати таблицю','setupKlik_')
    .addItem('Перевірити довідник Нової пошти','testDirectoryOwner_').addToUi();
}
