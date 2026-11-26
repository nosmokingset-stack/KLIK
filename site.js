/* KLIK v1.2 — centralized translations; client-only order dialog. */
(() => {
 'use strict';
 const translations = {
  uk:{product:'Магнітна кнопка для води',benefits:'Переваги',how:'Як користуватись',priceNav:'Ціна',faqNav:'FAQ',contacts:'Контакти',slogan:'Один клік – вільні руки!',easy:'Зручно та просто',time:'Економія часу',magnet:'Надійний магніт',order:'Замовити',one:'Одна кнопка',two:'Дві кнопки',saving:'Економія 99 грн',currency:'грн',problem:'Знайома ситуація?',solution:'KLIK – просте рішення',howTitle:'Як користуватися',benefitsTitle:'Переваги KLIK',construction:'Як влаштована кнопка',colors:'Обери свій колір',orderTitle:'Вартість та замовлення',delivery:'Доставка та оплата',faqTitle:'Часті запитання',skip:'До основного вмісту',menu:'Відкрити меню',closeMenu:'Закрити меню',nav:'Основна навігація',language:'Мова сайту',next:'До наступного розділу',home:'KLIK — на початок',heroAlt:'Жовта магнітна кнопка KLIK та цифрова візуалізація синьої кнопки з декоративними бризками води',singleAlt:'Одна жовта магнітна кнопка KLIK',pairAlt:'Жовта кнопка KLIK та візуалізація синьої',footer:'Магнітна кнопка для води',prices:'Варіанти комплекту'},
  ru:{product:'Магнитная кнопка для воды',benefits:'Преимущества',how:'Как пользоваться',priceNav:'Цена',faqNav:'FAQ',contacts:'Контакты',slogan:'Один клик – свободные руки!',easy:'Удобно и просто',time:'Экономия времени',magnet:'Надёжный магнит',order:'Заказать',one:'Одна кнопка',two:'Две кнопки',saving:'Экономия 99 грн',currency:'грн',problem:'Знакомая ситуация?',solution:'KLIK – простое решение',howTitle:'Как пользоваться',benefitsTitle:'Преимущества KLIK',construction:'Как устроена кнопка',colors:'Выбери свой цвет',orderTitle:'Стоимость и заказ',delivery:'Доставка и оплата',faqTitle:'Частые вопросы',skip:'К основному содержимому',menu:'Открыть меню',closeMenu:'Закрыть меню',nav:'Основная навигация',language:'Язык сайта',next:'К следующему разделу',home:'KLIK — в начало',heroAlt:'Жёлтая магнитная кнопка KLIK и цифровая визуализация синей кнопки с декоративными брызгами воды',singleAlt:'Одна жёлтая магнитная кнопка KLIK',pairAlt:'Жёлтая кнопка KLIK и визуализация синей',footer:'Магнитная кнопка для воды',prices:'Варианты комплекта'}
 };
 Object.assign(translations.uk,{difference:'Відчуй різницю з KLIK!',before:'До KLIK',after:'З KLIK',beforeDescription:'Доводиться постійно утримувати кнопку',afterDescription:'Вода набирається, а твої руки вільні',beforeAlt:'Демонстраційна візуалізація: людина утримує пальцем кнопку подачі води',afterAlt:'Демонстраційна візуалізація: жовта кнопка KLIK на автоматі, вода надходить у пляшку без руки',comparisonNote:'Демонстраційна цифрова візуалізація, а не фотографія випробувань. Сумісність із конкретним автоматом потребує перевірки.'});
 Object.assign(translations.ru,{difference:'Почувствуй разницу с KLIK!',before:'До KLIK',after:'С KLIK',beforeDescription:'Приходится постоянно удерживать кнопку',afterDescription:'Вода набирается, а твои руки свободны',beforeAlt:'Демонстрационная визуализация: человек удерживает пальцем кнопку подачи воды',afterAlt:'Демонстрационная визуализация: жёлтая кнопка KLIK на автомате, вода поступает в бутылку без руки',comparisonNote:'Демонстрационная цифровая визуализация, а не фотография испытаний. Совместимость с конкретным автоматом требует проверки.'});
 Object.assign(translations.uk,{kioskAlt:'Харківський кіоск «Питна вода для харків’ян»',selectPackage:'Обрати комплект',dialogTitle:'Замовлення KLIK',closeDialog:'Закрити вікно',choosePackage:'Обери свій комплект',chooseColor:'Обери колір',colorOne:'Колір кнопки №1',colorTwo:'Колір кнопки №2',yellow:'Жовтий',blue:'Синій',blueStatus:'Синя кнопка ще не виготовлена. Зображення показує візуалізацію кольору; наявність і термін виготовлення не підтверджені.',customerDetails:'Дані покупця',customerName:'Твоє ім’я',customerPhone:'Номер телефону',customerCity:'Місто',customerBranch:'Відділення Нової пошти',totalLabel:'До сплати',shippingExcluded:'Вартість доставки не включена.',placeOrder:'Оформити замовлення',ordersUnavailable:'Онлайн-замовлення поки недоступне. Дані не надсилаються.',notSent:'Замовлення не надіслано. Онлайн-оформлення ще не підключене.',nameRequired:'Укажи своє ім’я (щонайменше 2 символи).',phoneRequired:'Укажи повний номер: +380 та 9 цифр.',cityRequired:'Укажи місто (щонайменше 2 символи).',branchRequired:'Укажи відділення Нової пошти.',independentBrand:'KLIK — незалежний бренд, не офіційний продукт міської адміністрації.'});
 Object.assign(translations.ru,{kioskAlt:'Харьковский киоск «Питна вода для харків’ян»',selectPackage:'Выбрать комплект',dialogTitle:'Заказ KLIK',closeDialog:'Закрыть окно',choosePackage:'Выбери свой комплект',chooseColor:'Выбери цвет',colorOne:'Цвет кнопки №1',colorTwo:'Цвет кнопки №2',yellow:'Жёлтый',blue:'Синий',blueStatus:'Синяя кнопка ещё не изготовлена. Изображение показывает визуализацию цвета; наличие и срок изготовления не подтверждены.',customerDetails:'Данные покупателя',customerName:'Твоё имя',customerPhone:'Номер телефона',customerCity:'Город',customerBranch:'Отделение Новой почты',totalLabel:'К оплате',shippingExcluded:'Стоимость доставки не включена.',placeOrder:'Оформить заказ',ordersUnavailable:'Онлайн-заказ пока недоступен. Данные не отправляются.',notSent:'Заказ не отправлен. Онлайн-оформление ещё не подключено.',nameRequired:'Укажи своё имя (не менее 2 символов).',phoneRequired:'Укажи полный номер: +380 и 9 цифр.',cityRequired:'Укажи город (не менее 2 символов).',branchRequired:'Укажи отделение Новой почты.',independentBrand:'KLIK — независимый бренд, не официальный продукт городской администрации.'});
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
  const fields=[['customer-name','nameRequired',value=>value.trim().length>=2],['customer-phone','phoneRequired',value=>/^380[1-9]\d{8}$/.test(value.replace(/\D/g,''))],['customer-city','cityRequired',value=>value.trim().length>=2],['customer-branch','branchRequired',value=>value.trim().length>0]];
  let opener=null,validationActive=false;
  const quantity=()=>Number(form.querySelector('[name="quantity"]:checked').value);
  function validateFields(focusFirst=false){
   let firstInvalid=null;
   fields.forEach(([id,key,valid])=>{const input=document.getElementById(id),error=document.getElementById(id+'-error'),invalid=!valid(input.value);input.setAttribute('aria-invalid',String(invalid));error.textContent=invalid?translations[language][key]:'';error.hidden=!invalid;if(invalid&&!firstInvalid)firstInvalid=input;});
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
  function finishClose(){if(dialog.open)return;document.documentElement.classList.remove('dialog-open');if(opener&&opener.isConnected)opener.focus({preventScroll:true});}
  function closeOrder(){if(dialog.open){dialog.close();finishClose();}}
  document.querySelectorAll('[data-order-quantity]').forEach(card=>card.addEventListener('click',()=>{
   opener=card;form.querySelector(`[name="quantity"][value="${card.dataset.orderQuantity}"]`).checked=true;
   renderOrder();document.getElementById('order-submit-status').hidden=true;
   dialog.showModal();document.documentElement.classList.add('dialog-open');
   dialog.scrollTop=0;document.getElementById('dialog-title').focus({preventScroll:true});
  }));
  document.querySelector('.dialog-close').addEventListener('click',closeOrder);
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeOrder();});
  dialog.addEventListener('close',finishClose);
  const outside=event=>{const rect=dialog.getBoundingClientRect();return event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom;};
  let backdropPressed=false;
  dialog.addEventListener('pointerdown',event=>{backdropPressed=event.target===dialog&&outside(event);});
  dialog.addEventListener('click',event=>{if(backdropPressed&&event.target===dialog&&outside(event))closeOrder();backdropPressed=false;});
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
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('waiting');observer.unobserve(entry.target);}}),{threshold:.1});
  document.querySelectorAll('.placeholder').forEach(el=>{el.classList.add('js-reveal','waiting');observer.observe(el);});
  const problem=document.querySelector('.problem');
  if(problem){const sequence=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){problem.classList.add('is-visible');sequence.disconnect();}},{threshold:.08});problem.classList.add('comparison-motion');sequence.observe(problem);}
 }
})();
