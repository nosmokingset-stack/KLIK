/* KLIK v1.1 — centralized translations; no order submission. */
(() => {
 'use strict';
 const translations = {
  uk:{product:'Магнітна кнопка для води',benefits:'Переваги',how:'Як користуватись',priceNav:'Ціна',faqNav:'FAQ',contacts:'Контакти',slogan:'Один клік – вільні руки!',easy:'Зручно та просто',time:'Економія часу',magnet:'Надійний магніт',order:'Замовити',one:'Одна кнопка',two:'Дві кнопки',saving:'Економія 99 грн',currency:'грн',note:'Синій колір — візуалізація. Відтінок готового виробу може відрізнятися.',problem:'Знайома ситуація?',solution:'KLIK – просте рішення',howTitle:'Як користуватися',benefitsTitle:'Переваги KLIK',construction:'Як влаштована кнопка',colors:'Обери свій колір',orderTitle:'Вартість та замовлення',delivery:'Доставка та оплата',faqTitle:'Часті запитання',skip:'До основного вмісту',menu:'Відкрити меню',closeMenu:'Закрити меню',nav:'Основна навігація',language:'Мова сайту',next:'До наступного розділу',home:'KLIK — на початок',heroAlt:'Жовта магнітна кнопка KLIK та цифрова візуалізація синьої кнопки з декоративними бризками води',singleAlt:'Одна жовта магнітна кнопка KLIK',pairAlt:'Жовта кнопка KLIK та візуалізація синьої',footer:'Магнітна кнопка для води',prices:'Варіанти комплекту'},
  ru:{product:'Магнитная кнопка для воды',benefits:'Преимущества',how:'Как пользоваться',priceNav:'Цена',faqNav:'FAQ',contacts:'Контакты',slogan:'Один клик – свободные руки!',easy:'Удобно и просто',time:'Экономия времени',magnet:'Надёжный магнит',order:'Заказать',one:'Одна кнопка',two:'Две кнопки',saving:'Экономия 99 грн',currency:'грн',note:'Синий цвет — визуализация. Оттенок готового изделия может отличаться.',problem:'Знакомая ситуация?',solution:'KLIK – простое решение',howTitle:'Как пользоваться',benefitsTitle:'Преимущества KLIK',construction:'Как устроена кнопка',colors:'Выбери свой цвет',orderTitle:'Стоимость и заказ',delivery:'Доставка и оплата',faqTitle:'Частые вопросы',skip:'К основному содержимому',menu:'Открыть меню',closeMenu:'Закрыть меню',nav:'Основная навигация',language:'Язык сайта',next:'К следующему разделу',home:'KLIK — в начало',heroAlt:'Жёлтая магнитная кнопка KLIK и цифровая визуализация синей кнопки с декоративными брызгами воды',singleAlt:'Одна жёлтая магнитная кнопка KLIK',pairAlt:'Жёлтая кнопка KLIK и визуализация синей',footer:'Магнитная кнопка для воды',prices:'Варианты комплекта'}
 };
 Object.assign(translations.uk,{difference:'Відчуй різницю з KLIK!',before:'До KLIK',after:'З KLIK',beforeDescription:'Доводиться постійно утримувати кнопку',afterDescription:'Вода набирається, а твої руки вільні',beforeAlt:'Демонстраційна візуалізація: людина утримує пальцем кнопку подачі води',afterAlt:'Демонстраційна візуалізація: жовта кнопка KLIK на автоматі, вода надходить у пляшку без руки',comparisonNote:'Демонстраційна цифрова візуалізація, а не фотографія випробувань. Сумісність із конкретним автоматом потребує перевірки.'});
 Object.assign(translations.ru,{difference:'Почувствуй разницу с KLIK!',before:'До KLIK',after:'С KLIK',beforeDescription:'Приходится постоянно удерживать кнопку',afterDescription:'Вода набирается, а твои руки свободны',beforeAlt:'Демонстрационная визуализация: человек удерживает пальцем кнопку подачи воды',afterAlt:'Демонстрационная визуализация: жёлтая кнопка KLIK на автомате, вода поступает в бутылку без руки',comparisonNote:'Демонстрационная цифровая визуализация, а не фотография испытаний. Совместимость с конкретным автоматом требует проверки.'});
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
 }
 try{language=localStorage.getItem('klik.language')||'uk';}catch(_){}
 applyLanguage(language);
 document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{applyLanguage(button.dataset.language);try{localStorage.setItem('klik.language',language);}catch(_){} }));
 toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){setMenu(false);toggle.focus();}});
 document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))setMenu(false);});
 const mobile=matchMedia('(max-width:800px)'); mobile.addEventListener('change',()=>setMenu(false));
 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('waiting');observer.unobserve(entry.target);}}),{threshold:.1});
  document.querySelectorAll('.placeholder').forEach(el=>{el.classList.add('js-reveal','waiting');observer.observe(el);});
  const problem=document.querySelector('.problem');
  if(problem){const sequence=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){problem.classList.add('is-visible');sequence.disconnect();}},{threshold:.08});problem.classList.add('comparison-motion');sequence.observe(problem);}
 }
})();
