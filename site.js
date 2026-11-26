/* KLIK v1.3 – centralized translations; client-only order dialog. */
(() => {
 'use strict';
 const translations = {
  uk:{product:'Магнітна кнопка для води',benefits:'Переваги',how:'Як користуватись',priceNav:'Ціна',faqNav:'FAQ',contacts:'Контакти',slogan:'Один клік – вільні руки!',easy:'Зручно та просто',time:'Економія часу',magnet:'Надійний магніт',order:'Замовити',one:'Одна кнопка',two:'Дві кнопки',saving:'Економія 99 грн',currency:'грн',problem:'Знайома ситуація?',solution:'KLIK – просте рішення',howTitle:'Як користуватися',benefitsTitle:'Переваги KLIK',construction:'Як влаштована кнопка',colors:'Обери свій колір',orderTitle:'Вартість та замовлення',delivery:'Доставка та оплата',faqTitle:'Часті запитання',skip:'До основного вмісту',menu:'Відкрити меню',closeMenu:'Закрити меню',nav:'Основна навігація',language:'Мова сайту',next:'До наступного розділу',home:'KLIK – на початок',heroAlt:'Жовта магнітна кнопка KLIK та цифрова візуалізація синьої кнопки з декоративними бризками води',singleAlt:'Одна жовта магнітна кнопка KLIK',pairAlt:'Жовта кнопка KLIK та візуалізація синьої',footer:'Магнітна кнопка для води',prices:'Варіанти комплекту'},
  ru:{product:'Магнитная кнопка для воды',benefits:'Преимущества',how:'Как пользоваться',priceNav:'Цена',faqNav:'FAQ',contacts:'Контакты',slogan:'Один клик – свободные руки!',easy:'Удобно и просто',time:'Экономия времени',magnet:'Надёжный магнит',order:'Заказать',one:'Одна кнопка',two:'Две кнопки',saving:'Экономия 99 грн',currency:'грн',problem:'Знакомая ситуация?',solution:'KLIK – простое решение',howTitle:'Как пользоваться',benefitsTitle:'Преимущества KLIK',construction:'Как устроена кнопка',colors:'Выбери свой цвет',orderTitle:'Стоимость и заказ',delivery:'Доставка и оплата',faqTitle:'Частые вопросы',skip:'К основному содержимому',menu:'Открыть меню',closeMenu:'Закрыть меню',nav:'Основная навигация',language:'Язык сайта',next:'К следующему разделу',home:'KLIK – в начало',heroAlt:'Жёлтая магнитная кнопка KLIK и цифровая визуализация синей кнопки с декоративными брызгами воды',singleAlt:'Одна жёлтая магнитная кнопка KLIK',pairAlt:'Жёлтая кнопка KLIK и визуализация синей',footer:'Магнитная кнопка для воды',prices:'Варианты комплекта'}
 };
 Object.assign(translations.uk,{difference:'Відчуй різницю з KLIK!',before:'До KLIK',after:'З KLIK',beforeDescription:'Доводиться постійно утримувати кнопку',afterDescription:'Вода набирається, а твої руки вільні',beforeAlt:'Демонстраційна візуалізація: людина утримує пальцем кнопку подачі води',afterAlt:'Демонстраційна візуалізація: жовта кнопка KLIK на автоматі, вода надходить у пляшку без руки',comparisonNote:'Демонстраційна цифрова візуалізація, а не фотографія випробувань. Сумісність із конкретним автоматом потребує перевірки.'});
 Object.assign(translations.ru,{difference:'Почувствуй разницу с KLIK!',before:'До KLIK',after:'С KLIK',beforeDescription:'Приходится постоянно удерживать кнопку',afterDescription:'Вода набирается, а твои руки свободны',beforeAlt:'Демонстрационная визуализация: человек удерживает пальцем кнопку подачи воды',afterAlt:'Демонстрационная визуализация: жёлтая кнопка KLIK на автомате, вода поступает в бутылку без руки',comparisonNote:'Демонстрационная цифровая визуализация, а не фотография испытаний. Совместимость с конкретным автоматом требует проверки.'});
 Object.assign(translations.uk,{kioskAlt:'Харківський кіоск «Питна вода для харків’ян»',selectPackage:'Обрати комплект',dialogTitle:'Замовлення KLIK',closeDialog:'Закрити вікно',choosePackage:'Обери свій комплект',chooseColor:'Обери колір',colorOne:'Колір кнопки №1',colorTwo:'Колір кнопки №2',yellow:'Жовтий',blue:'Синій',blueStatus:'Синя кнопка ще не виготовлена. Зображення показує візуалізацію кольору; наявність і термін виготовлення не підтверджені.',customerDetails:'Дані покупця',customerName:'Твоє ім’я',customerPhone:'Номер телефону',customerCity:'Місто',customerBranch:'Відділення Нової пошти',totalLabel:'До сплати',shippingExcluded:'Вартість доставки не включена.',placeOrder:'Оформити замовлення',ordersUnavailable:'Онлайн-замовлення поки недоступне. Дані не надсилаються.',notSent:'Замовлення не надіслано. Онлайн-оформлення ще не підключене.',nameRequired:'Укажи своє ім’я (щонайменше 2 символи).',phoneRequired:'Укажи повний номер: +380 та 9 цифр.',cityRequired:'Укажи місто (щонайменше 2 символи).',branchRequired:'Укажи відділення Нової пошти.',independentBrand:'KLIK – незалежний бренд, не офіційний продукт міської адміністрації.'});
 Object.assign(translations.ru,{kioskAlt:'Харьковский киоск «Питна вода для харків’ян»',selectPackage:'Выбрать комплект',dialogTitle:'Заказ KLIK',closeDialog:'Закрыть окно',choosePackage:'Выбери свой комплект',chooseColor:'Выбери цвет',colorOne:'Цвет кнопки №1',colorTwo:'Цвет кнопки №2',yellow:'Жёлтый',blue:'Синий',blueStatus:'Синяя кнопка ещё не изготовлена. Изображение показывает визуализацию цвета; наличие и срок изготовления не подтверждены.',customerDetails:'Данные покупателя',customerName:'Твоё имя',customerPhone:'Номер телефона',customerCity:'Город',customerBranch:'Отделение Новой почты',totalLabel:'К оплате',shippingExcluded:'Стоимость доставки не включена.',placeOrder:'Оформить заказ',ordersUnavailable:'Онлайн-заказ пока недоступен. Данные не отправляются.',notSent:'Заказ не отправлен. Онлайн-оформление ещё не подключено.',nameRequired:'Укажи своё имя (не менее 2 символов).',phoneRequired:'Укажи полный номер: +380 и 9 цифр.',cityRequired:'Укажи город (не менее 2 символов).',branchRequired:'Укажи отделение Новой почты.',independentBrand:'KLIK – независимый бренд, не официальный продукт городской администрации.'});
 Object.assign(translations.uk, {
  "how": "Як користуватися",
  "safetyNav": "Безпека",
  "before1": "Втомлюється та болить рука, коли потрібно набрати багато води додому.",
  "before2": "У морозну погоду палець мерзне від контакту з холодною металевою кнопкою.",
  "before3": "Одна рука постійно зайнята.",
  "before4": "Набирання води перетворюється на незручний щоденний обов’язок.",
  "after1": "Більше не потрібно постійно натискати на кнопку.",
  "after2": "У холодну погоду можна тримати руки в кишенях або рукавичках.",
  "after3": "Обидві руки вільні – зручно міняти пляшки та закручувати кришки.",
  "after4": "Набирай воду з комфортом, навіть коли її потрібно багато.",
  "compareEnd": "Маленька кнопка – великий комфорт!",
  "howTitle": "Як користуватися KLIK?",
  "howSub": "Три прості кроки – і твої руки вільні!",
  "step1": "Підготуй тару",
  "step2": "Встанови KLIK",
  "step3": "Набери воду та зніми KLIK",
  "desc1": "Постав бутлі під носики подачі води.",
  "desc2": "Приклади магнітні кнопки KLIK до кнопок подачі води на автоматі. Вода почне набиратися, а твої руки залишаться вільними.",
  "desc3": "Коли бутлі наповняться, зніми магнітні кнопки, щоб зупинити подачу води. Не забудь забрати KLIK із собою!",
  "alt1": "Два порожні бутлі під носиками автомата",
  "alt2": "Дві кнопки KLIK утримують подачу води в обидва бутлі",
  "alt3": "Праву кнопку знято, вода надходить лише в лівий бутель",
  "howEnd": "Без зайвих зусиль. Без втоми. З комфортом!",
  "watch": "Не залишай автомат без нагляду під час набирання води.",
  "visual": "Демонстраційна візуалізація",
  "careTitle": "Дбайливо до автомата",
  "careSub": "Надійне кріплення – дбайливий контакт.",
  "care1": "Магніт KLIK повністю прихований усередині пластикового корпусу. Завдяки цьому кнопка м’яко примагнічується до поверхні автомата, а сам магніт не контактує з металом.",
  "care2": "KLIK лише утримує штатну кнопку подачі води, не потребуючи втручання в конструкцію чи електроніку автомата.",
  "bottom": "Нижня сторона кнопки KLIK",
  "shield": "Захист від подряпин",
  "shieldD": "Пластиковий корпус дбайливо контактує з поверхнею автомата та захищає її від прямого контакту з магнітом.",
  "gear": "Без втручання в конструкцію",
  "gearD": "KLIK лише утримує штатну кнопку подачі води. Не потребує підключення до електроніки чи зміни конструкції автомата.",
  "fix": "Надійне кріплення",
  "fixD": "Вбудований магніт утримує KLIK на металевій поверхні автомата.",
  "ship": "Доставка",
  "pay": "Оплата при отриманні",
  "shipD": "Новою поштою по Україні до відділення або поштомата. Вартість доставки сплачується окремо.",
  "payD": "Оплата при отриманні. Умови оплати уточнюються під час підтвердження замовлення.",
  "made": "Зроблено в Харкові",
  "q1": "Як працює KLIK?",
  "a1": "Вбудований магніт притягує KLIK до металевої поверхні автомата та утримує кнопку подачі води в натиснутому положенні. Більше не потрібно постійно тримати палець на кнопці. Вода набирається, а твої руки вільні!",
  "q2": "З чого складається KLIK?",
  "a2": "KLIK складається з міцного пластикового корпусу та вбудованого феритового магніту. Корпус має зручну ручку для встановлення та зняття кнопки з автомата. Магніт повністю прихований усередині корпусу. Жодної електроніки, батарейок чи складних механізмів – усе максимально просто!",
  "q3": "Чи безпечна кнопка KLIK для людини?",
  "a3": "KLIK виготовлено з якісного пластику без неприємного запаху. Магніт повністю прихований усередині корпусу, а сама кнопка не контактує з питною водою. KLIK призначено для комфортного повсякденного використання.\n\nОсобам з імплантованими медичними пристроями необхідно враховувати рекомендації виробника таких пристроїв щодо контакту з магнітами.",
  "q4": "Чи може KLIK пошкодити автомат?",
  "a4": "KLIK не потребує втручання в конструкцію автомата. Магніт повністю прихований усередині пластикового корпусу, завдяки чому він не контактує безпосередньо з металевою поверхнею. Конструкція KLIK розроблена для дбайливого використання автомата.",
  "q5": "Для яких автоматів підходить KLIK?",
  "a5": "KLIK розроблено спеціально для міських автоматів безкоштовної видачі питної води, встановлених у Харкові за ініціативою міського голови Ігоря Терехова.",
  "q6": "Навіщо купувати дві кнопки KLIK?",
  "a6": "Якщо ти набираєш багато води додому, дві кнопки дозволять одночасно наповнювати дві ємності на автоматі з двома кранами. Це зручно та допомагає заощадити час.",
  "q7": "Чи можна обрати колір KLIK?",
  "a7": "Так! Ти можеш обрати жовтий або синій колір за наявності. При замовленні двох кнопок можна обрати колір кожної окремо.",
  "q8": "Чи можна залишати автомат без нагляду під час набирання води?",
  "a8": "Ні. Залишайся поруч з автоматом та контролюй наповнення ємностей. Коли вода набралася, просто зніми KLIK та забери його із собою.",
  "effort": "Без зайвих зусиль",
  "storeSub": "Обирай свій комплект KLIK!",
  "region": "Доставка по Україні",
  "regionD": "Обирай доступне відділення або поштомат Нової пошти у своєму населеному пункті.",
  "modalPay": "Оплата при отриманні. Для поштомата спосіб оплати уточнюється під час підтвердження.",
  "shippingExcluded": "Вартість доставки сплачується окремо.",
  "customerName": "Ім’я та прізвище",
  "nameRequired": "Укажи ім’я та прізвище.",
  "cityName": "Харків",
  "faqSub": "Усе, що ти хотів знати про KLIK",
  "footerBrand": "KLIK – магнітна кнопка для води",
  "location": "Харків, Україна",
  "privacy": "Політика конфіденційності",
  "offer": "Публічна оферта",
  "returns": "Повернення товару та коштів",
  "rights": "© 2026 KLIK. Усі права захищено.",
  "independentBrand": "KLIK є незалежним проєктом і не є офіційним представником Харківської міської ради.",
  "legalNav": "Юридична інформація",
  "agreeStart": "Я ознайомився(-лася) з умовами",
  "agreeOffer": "публічної оферти",
  "agreePrivacy": "політикою конфіденційності",
  "agreeAnd": "та",
  "agreeReturns": "умовами повернення товару",
  "agreeRequired": "Підтвердь ознайомлення з умовами.",
  "close": "Закрити",
  "draft": "Попередня редакція",
  "q9": "Як здійснюється доставка та оплата?",
  "a9": "Доставка Новою поштою по Україні до доступного відділення або поштомата. Оплата при отриманні; спосіб оплати уточнюється під час підтвердження. Доставка сплачується окремо.",
  "q10": "Як оформити замовлення?",
  "a10": "Обери потрібний комплект у розділі «Вартість та замовлення», натисни «Замовити», обери колір кнопок та заповни контактні дані."
});
 Object.assign(translations.ru, {
  "how": "Как пользоваться",
  "safetyNav": "Безопасность",
  "before1": "Рука устаёт и болит, когда нужно набрать много воды домой.",
  "before2": "В мороз палец мёрзнет от контакта с холодной металлической кнопкой.",
  "before3": "Одна рука постоянно занята.",
  "before4": "Набирать воду каждый день становится неудобно.",
  "after1": "Больше не нужно постоянно нажимать на кнопку.",
  "after2": "В холодную погоду можно держать руки в карманах или варежках.",
  "after3": "Обе руки свободны – удобно менять бутылки и закручивать крышки.",
  "after4": "Набирай воду с комфортом, даже когда её нужно много.",
  "compareEnd": "Маленькая кнопка – большой комфорт!",
  "howTitle": "Как пользоваться KLIK?",
  "howSub": "Три простых шага – и твои руки свободны!",
  "step1": "Подготовь тару",
  "step2": "Установи KLIK",
  "step3": "Набери воду и сними KLIK",
  "desc1": "Поставь бутыли под носики подачи воды.",
  "desc2": "Приложи магнитные кнопки KLIK к кнопкам подачи воды на автомате. Вода начнёт набираться, а твои руки останутся свободными.",
  "desc3": "Когда бутыли наполнятся, сними магнитные кнопки, чтобы остановить подачу воды. Не забудь забрать KLIK с собой!",
  "alt1": "Две пустые бутыли под носиками автомата",
  "alt2": "Две кнопки KLIK удерживают подачу воды в обе бутыли",
  "alt3": "Правая кнопка снята, вода поступает только в левую бутыль",
  "howEnd": "Без лишних усилий. Без усталости. С комфортом!",
  "watch": "Не оставляй автомат без присмотра, пока набирается вода.",
  "visual": "Демонстрационная визуализация",
  "careTitle": "Бережно к автомату",
  "careSub": "Надёжное крепление – бережный контакт.",
  "care1": "Магнит KLIK полностью скрыт внутри пластикового корпуса. Кнопка мягко примагничивается к поверхности автомата, а сам магнит не касается металла.",
  "care2": "KLIK удерживает штатную кнопку подачи воды. Изменять конструкцию или электронику автомата не требуется.",
  "bottom": "Нижняя сторона кнопки KLIK",
  "shield": "Защита от царапин",
  "shieldD": "Пластиковый корпус бережно прилегает к поверхности автомата и защищает её от прямого контакта с магнитом.",
  "gear": "Без вмешательства в конструкцию",
  "gearD": "KLIK лишь удерживает штатную кнопку подачи воды. Подключение к электронике или изменение конструкции автомата не требуется.",
  "fix": "Надёжное крепление",
  "fixD": "Встроенный магнит удерживает KLIK на металлической поверхности автомата.",
  "ship": "Доставка",
  "pay": "Оплата при получении",
  "shipD": "Новой почтой по Украине в отделение или почтомат. Доставка оплачивается отдельно.",
  "payD": "Оплата при получении. Условия оплаты уточняются при подтверждении заказа.",
  "made": "Сделано в Харькове",
  "q1": "Как работает KLIK?",
  "a1": "Встроенный магнит притягивает KLIK к металлической поверхности автомата и удерживает кнопку подачи воды нажатой. Больше не нужно держать палец на кнопке. Вода набирается, а твои руки свободны!",
  "q2": "Из чего состоит KLIK?",
  "a2": "KLIK состоит из прочного пластикового корпуса и встроенного ферритового магнита. За удобную ручку кнопку легко установить на автомат и снять. Магнит полностью скрыт внутри корпуса. Никакой электроники, батареек или сложных механизмов – всё максимально просто!",
  "q3": "Безопасна ли кнопка KLIK для человека?",
  "a3": "KLIK изготовлена из качественного пластика без неприятного запаха. Магнит полностью скрыт внутри корпуса, а сама кнопка не соприкасается с питьевой водой. KLIK предназначена для комфортного повседневного использования.\n\nЛюдям с имплантированными медицинскими устройствами следует учитывать рекомендации производителя этих устройств относительно контакта с магнитами.",
  "q4": "Может ли KLIK повредить автомат?",
  "a4": "Для использования KLIK не нужно вмешиваться в конструкцию автомата. Магнит полностью скрыт внутри пластикового корпуса и не касается металлической поверхности. Конструкция KLIK разработана для бережного использования автомата.",
  "q5": "Для каких автоматов подходит KLIK?",
  "a5": "KLIK разработана специально для городских автоматов бесплатной выдачи питьевой воды, установленных в Харькове по инициативе городского головы Игоря Терехова.",
  "q6": "Зачем покупать две кнопки KLIK?",
  "a6": "Если ты набираешь много воды домой, две кнопки позволят одновременно наполнять две ёмкости на автомате с двумя кранами. Это удобно и помогает экономить время.",
  "q7": "Можно ли выбрать цвет KLIK?",
  "a7": "Да! Ты можешь выбрать жёлтый или синий цвет при наличии. При заказе двух кнопок можно выбрать цвет каждой отдельно.",
  "q8": "Можно ли оставлять автомат без присмотра во время набора воды?",
  "a8": "Нет. Оставайся рядом с автоматом и следи за наполнением ёмкостей. Когда вода наберётся, сними KLIK и забери её с собой.",
  "effort": "Без лишних усилий",
  "storeSub": "Выбирай свой комплект KLIK!",
  "region": "Доставка по Украине",
  "regionD": "Выбирай доступное отделение или почтомат Новой почты в своём населённом пункте.",
  "modalPay": "Оплата при получении. Для почтомата способ оплаты уточняется при подтверждении.",
  "shippingExcluded": "Стоимость доставки оплачивается отдельно.",
  "customerName": "Имя и фамилия",
  "nameRequired": "Укажи имя и фамилию.",
  "cityName": "Харьков",
  "faqSub": "Всё, что ты хотел узнать о KLIK",
  "footerBrand": "KLIK – магнитная кнопка для воды",
  "location": "Харьков, Украина",
  "privacy": "Политика конфиденциальности",
  "offer": "Публичная оферта",
  "returns": "Возврат товара и денежных средств",
  "rights": "© 2026 KLIK. Все права защищены.",
  "independentBrand": "KLIK – независимый проект и не является официальным представителем Харьковского городского совета.",
  "legalNav": "Правовая информация",
  "agreeStart": "Я ознакомился(-лась) с условиями",
  "agreeOffer": "публичной оферты",
  "agreePrivacy": "политикой конфиденциальности",
  "agreeAnd": "и",
  "agreeReturns": "условиями возврата товара",
  "agreeRequired": "Подтверди ознакомление с условиями.",
  "close": "Закрыть",
  "draft": "Предварительная редакция",
  "q9": "Как происходит доставка и оплата?",
  "a9": "Доставка Новой почтой по Украине в доступное отделение или почтомат. Оплата при получении; способ оплаты уточняется при подтверждении. Доставка оплачивается отдельно.",
  "q10": "Как оформить заказ?",
  "a10": "Выбери нужный комплект в разделе «Стоимость и заказ», нажми «Заказать», выбери цвет кнопок и заполни контактные данные."
});
 const legalDialog = document.getElementById('legal-dialog');
 const orderDialog = document.getElementById('order-dialog');
 const legalScroll = legalDialog.querySelector('.legal-scroll');
 const legalTitle = document.getElementById('legal-title');
 const legalParties = {seller: '', controller: ''};
 let currentDocument = null;
 let legalOpener = null;

 function renderLegal() {
   if (!currentDocument) return;
   legalScroll.querySelectorAll('[data-document]').forEach(article => {
     article.hidden = article.dataset.document !== currentDocument || article.lang !== language;
     if (!article.hidden) legalTitle.textContent = article.dataset.title;
   });
 }
 function syncScrollLock() {
   document.documentElement.classList.toggle('dialog-open', orderDialog.open || legalDialog.open);
 }
 function closeOnBackdrop(element, close) {
   function outside(event) {
     const rect = element.getBoundingClientRect();
     return event.target === element && (event.clientX < rect.left || event.clientX > rect.right ||
       event.clientY < rect.top || event.clientY > rect.bottom);
   }
   let pressed = false;
   element.addEventListener('pointerdown', event => { pressed = outside(event); });
   element.addEventListener('click', event => {
     if (pressed && outside(event)) close();
     pressed = false;
   });
 }
 legalDialog.querySelectorAll('[data-legal-party]').forEach(line => {
   const value = legalParties[line.dataset.legalParty];
   if (value) { line.textContent = line.dataset.prefix + ': ' + value; line.hidden = false; }
 });
 document.querySelectorAll('[data-document-open]').forEach(button => {
   button.addEventListener('click', () => {
     if (legalDialog.open) return;
     currentDocument = button.dataset.documentOpen;
     legalOpener = button;
     renderLegal();
     legalDialog.showModal();
     syncScrollLock();
     legalScroll.scrollTop = 0;
     legalTitle.focus({preventScroll:true});
   });
 });
 legalDialog.querySelectorAll('[data-legal-close]').forEach(button =>
   button.addEventListener('click', () => legalDialog.close()));
 closeOnBackdrop(legalDialog, () => legalDialog.close());
 legalDialog.addEventListener('close', () => {
   if (legalDialog.open) return;
   syncScrollLock();
   currentDocument = null;
   if (legalOpener && legalOpener.isConnected) legalOpener.focus({preventScroll:true});
 });
 let renderOrder=()=>{};
 let language='uk';
 const toggle=document.querySelector('.menu-toggle');
 const nav=document.querySelector('.nav');
 function setMenu(open){nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',translations[language][open?'closeMenu':'menu']);}
 function applyLanguage(value){
  language=Object.hasOwn(translations,value)?value:'uk';
  const dict=translations[language]; document.documentElement.lang=language;
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=dict[el.dataset.i18n];});
  document.querySelectorAll('[data-i18n-alt]').forEach(el=>el.alt=dict[el.dataset.i18nAlt]);
  document.querySelectorAll('[data-i18n-label]').forEach(el=>el.setAttribute('aria-label',dict[el.dataset.i18nLabel]));
  document.querySelectorAll('[data-language]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.language===language)));
  document.getElementById('customer-city').value = dict.cityName;
  renderLegal();
  setMenu(false);
  renderOrder();
 }
 try{language=localStorage.getItem('klik.language')||'uk';}catch(_){}
 applyLanguage(language);
 document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{applyLanguage(button.dataset.language);try{localStorage.setItem('klik.language',language);}catch(_){} }));
 toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){setMenu(false);toggle.focus();}});
 document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))setMenu(false);});
 const mobile=matchMedia('(max-width:800px)'); mobile.addEventListener('change',()=>setMenu(false));
 // Native dialog keeps the background inert; buyer details remain only in this DOM.
 const dialog=document.getElementById('order-dialog');
 if(dialog){
  const form=document.getElementById('order-form');
  const phone=document.getElementById('customer-phone');
  const secondColors=document.getElementById('color-fieldset-2');
  const fields=[['customer-name','nameRequired',value=>value.trim().split(/\s+/u).filter(part=>/\p{L}/u.test(part)).length>=2],['customer-phone','phoneRequired',value=>/^380[1-9]\d{8}$/.test(value.replace(/\D/g,''))],['customer-branch','branchRequired',value=>value.trim().length>0],['order-consent','agreeRequired',(_,field)=>field.checked]];
  let opener=null,validationActive=false;
  const quantity=()=>Number(form.querySelector('[name="quantity"]:checked').value);
  function validateFields(focusFirst=false){
   let firstInvalid=null;
   fields.forEach(([id,key,valid])=>{const input=document.getElementById(id),error=document.getElementById(id+'-error'),invalid=!valid(input.value,input);input.setAttribute('aria-invalid',String(invalid));error.textContent=invalid?translations[language][key]:'';error.hidden=!invalid;if(invalid&&!firstInvalid)firstInvalid=input;});
   if(focusFirst&&firstInvalid)firstInvalid.focus();return !firstInvalid;
  }
  renderOrder=()=>{
   const count=quantity();secondColors.hidden=count===1;
   secondColors.querySelectorAll('input').forEach(input=>{input.disabled=count===1;});
   document.querySelector('.color-fieldsets').classList.toggle('two-colors',count===2);
   document.getElementById('first-color-legend').textContent=translations[language][count===1?'chooseColor':'colorOne'];
   document.getElementById('order-total').textContent=(count===1?199:299)+' '+translations[language].currency;
   const selectedBlue=form.querySelector('[name="color1"]:checked').value==='blue'||count===2&&form.querySelector('[name="color2"]:checked').value==='blue';
   document.getElementById('blue-status').hidden=!selectedBlue;
   if(validationActive)validateFields();
  };
  function finishClose(){if(dialog.open)return;syncScrollLock();if(opener&&opener.isConnected)opener.focus({preventScroll:true});}
  function closeOrder(){if(dialog.open){dialog.close();finishClose();}}
  document.querySelectorAll('[data-order-quantity]').forEach(card=>card.addEventListener('click',()=>{
   opener=card;form.querySelector(`[name="quantity"][value="${card.dataset.orderQuantity}"]`).checked=true;
   renderOrder();document.getElementById('order-submit-status').hidden=true;
   dialog.showModal();syncScrollLock();
   dialog.scrollTop=0;document.getElementById('dialog-title').focus({preventScroll:true});
  }));
  document.querySelector('.dialog-close').addEventListener('click',closeOrder);
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeOrder();});
  dialog.addEventListener('close',finishClose);
  closeOnBackdrop(dialog, closeOrder);
  dialog.addEventListener('keydown',event=>{
   if(event.key!=='Tab')return;
   const focusable=[...dialog.querySelectorAll('button,input')].filter(el=>!el.disabled&&el.getClientRects().length&&(!el.matches('input[type="radio"]')||el.checked));
   const first=focusable[0],last=focusable[focusable.length-1];
   if(event.shiftKey&&(document.activeElement===first||document.activeElement.id==='dialog-title')){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  form.querySelectorAll('input[type="radio"]').forEach(input=>input.addEventListener('change',()=>{renderOrder();document.getElementById('order-submit-status').hidden=true;}));
  function nationalDigits(raw){let digits=raw.replace(/\D/g,'');if(digits.startsWith('00380'))digits=digits.slice(2);if(digits.startsWith('380'))digits=digits.slice(3);if(digits.startsWith('0'))digits=digits.slice(1);return digits.slice(0,9);}
  function formatPhone(digits){let value='+380';if(digits.length)value+=' ('+digits.slice(0,2);if(digits.length>=2)value+=')';if(digits.length>2)value+=' '+digits.slice(2,5);if(digits.length>5)value+='-'+digits.slice(5,7);if(digits.length>7)value+='-'+digits.slice(7,9);return value;}
  phone.addEventListener('focus',()=>{if(!phone.value)phone.value='+380';});
  phone.addEventListener('keydown',event=>{const pos=phone.selectionStart;if(pos===phone.selectionEnd&&((event.key==='Backspace'&&pos<=4)||(event.key==='Delete'&&pos<4))){event.preventDefault();return;}if(event.key==='Backspace'&&pos===phone.selectionEnd&&pos>4&&/\D/.test(phone.value[pos-1])){let start=pos-1;while(start>4&&/\D/.test(phone.value[start-1]))start--;if(start>4)start--;phone.setSelectionRange(start,pos);}});
  phone.addEventListener('blur',()=>{if(phone.value==='+380')phone.value='';});
  phone.addEventListener('input',()=>{
   const raw=phone.value,pos=phone.selectionStart,before=raw.slice(0,pos).replace(/\D/g,'').length,all=raw.replace(/\D/g,'');
   const prefix=all.startsWith('00380')?5:all.startsWith('380')?3:all.startsWith('0')?1:0;
   const nationalBefore=Math.max(0,before-prefix),digits=nationalDigits(raw);phone.value=formatPhone(digits);
   let caret=4,seen=0;for(let i=4;i<phone.value.length&&seen<nationalBefore;i++){caret=i+1;if(/\d/.test(phone.value[i]))seen++;}phone.setSelectionRange(caret,caret);
  });
  form.addEventListener('input',()=>{document.getElementById('order-submit-status').hidden=true;if(validationActive)validateFields();});
  form.addEventListener('submit',event=>{event.preventDefault();validationActive=true;if(!validateFields(true))return;document.getElementById('order-submit-status').hidden=false;document.getElementById('order-submit-status').scrollIntoView({block:'nearest',behavior:'auto'});});
  renderOrder();
 }
 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const problem=document.querySelector('.problem');
  if(problem){const sequence=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){problem.classList.add('is-visible');sequence.disconnect();}},{threshold:.08});problem.classList.add('comparison-motion');sequence.observe(problem);}
 }
})();
