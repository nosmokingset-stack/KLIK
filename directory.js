(function(){
 'use strict';
 const root=document.getElementById('order-form');if(!root)return;
 const city=root.querySelector('#customer-city'),branch=root.querySelector('#customer-branch');
 const cities=root.querySelector('#city-options'),branches=root.querySelector('#branch-options');
 const cs=root.querySelector('#city-status'),bs=root.querySelector('#branch-status');
 const endpoint='https://script.google.com/macros/s/AKfycbxw9BRSOcWBCcMWZgxC0WvS_FIbUoFaGKjDMXQ971svfk0EAoim5iAPPVi2M1sR_VR1/exec';
 let selectedCity=null,selectedBranch=null,cityItems=[],branchItems=[],cityTimer,cityRevision=0,branchRevision=0;
 const ru=()=>document.documentElement.lang==='ru';
 const say=(uk,rus)=>ru()?rus:uk;
 let config=null,requestId=null,inFlight=false,requestNonce='',resultFrame=null;
 function send(action,payload={}){
  if(!['cities','points','config'].includes(action))return Promise.reject(Error('invalid'));
  const callback='klikDirectory_'+crypto.randomUUID().replaceAll('-','');
  const url=new URL(endpoint);url.searchParams.set('action',action);url.searchParams.set('callback',callback);
  for(const [key,value] of Object.entries(payload))url.searchParams.set(key,String(value));
  return new Promise((resolve,reject)=>{
   const script=document.createElement('script');
   const cleanup=()=>{clearTimeout(timeout);delete window[callback];script.remove();};
   const timeout=setTimeout(()=>{cleanup();reject(Error('timeout'));},20000);
   window[callback]=result=>{cleanup();if(result&&result.ok)resolve(result);else reject(Error('unavailable'));};
   script.onerror=()=>{cleanup();reject(Error('offline'));};
   script.src=url.href;document.head.append(script);
  });
 }
 function options(list,items,format){list.replaceChildren(...items.map(item=>{const o=document.createElement('option');o.value=format(item);return o;}));}
 function clearBranch(){selectedBranch=null;branch.value='';branchItems=[];branches.replaceChildren();bs.textContent='';branchRevision++;}
 city.addEventListener('input',()=>{
  const hit=cityItems.filter(c=>c.label===city.value);
  if(hit.length===1){if(!selectedCity||selectedCity.ref!==hit[0].ref){selectedCity=hit[0];clearBranch();loadPoints(hit[0]);}return;}
  selectedCity=null;clearBranch();const q=city.value.trim(),rev=++cityRevision;clearTimeout(cityTimer);
  cities.replaceChildren();cityItems=[];
  if(q.length<3){cs.textContent='';return;}
  cs.textContent=say('Завантаження…','Загрузка…');
  cityTimer=setTimeout(async()=>{try{const r=await send('cities',{q});if(rev!==cityRevision)return;cityItems=r.items;options(cities,cityItems,x=>x.label);cs.textContent=cityItems.length?'':say('Не знайдено','Не найдено');}catch(_){if(rev===cityRevision)cs.textContent=say('Не вдалося завантажити. Спробуй ще раз.','Не удалось загрузить. Попробуй ещё раз.');}},450);
 });
 async function loadPoints(item){
  const rev=++branchRevision;bs.textContent=say('Завантаження…','Загрузка…');
  try{
   let page=1,more=true,all=[];
   while(more&&page<=30){const r=await send('points',{city:item.ref,page});if(rev!==branchRevision)return;all=all.concat(r.items);more=r.more;page++;}
   if(more)throw Error('incomplete');
   branchItems=all;options(branches,all,x=>x.name);bs.textContent=all.length?'':say('Не знайдено','Не найдено');
  }catch(_){if(rev===branchRevision)bs.textContent=say('Не вдалося завантажити. Обери населений пункт знову.','Не удалось загрузить. Выбери населённый пункт снова.');}
 }
 branch.addEventListener('input',()=>{const hits=branchItems.filter(x=>x.name===branch.value);selectedBranch=hits.length===1?hits[0]:null;});
 async function loadConfig(){
  try{
   const c=await send('config');
   if(!Number.isSafeInteger(c.one)||!Number.isSafeInteger(c.two)||c.one<=0||c.two<=0||typeof c.legal!=='string')throw Error('config');
   config=window.klikPublicConfig=c;
   root.querySelector('#order-service-note').hidden=c.enabled;
   root.querySelectorAll('[name=color1][value=blue],[name=color2][value=blue]').forEach(input=>{input.disabled=!c.blue;});
   root.querySelectorAll('.package-option').forEach((el,i)=>{el.querySelector('.package-price').firstChild.textContent=(i?c.two:c.one)+' ';});
   document.querySelectorAll('.price-card .price').forEach((el,i)=>{el.firstChild.textContent=(i?c.two:c.one)+' ';});
   const saving=2*c.one-c.two;
   document.querySelectorAll('[data-i18n=saving]').forEach(el=>{el.hidden=saving<=0;if(saving>0)el.textContent=(ru()?'Экономия ':'Економія ')+saving+' грн';});
   const count=Number(root.querySelector('[name=quantity]:checked').value);
   root.querySelector('#order-total').textContent=(count===1?c.one:c.two)+' грн';
  }catch(_){config=null;window.klikPublicConfig=null;}
 }
 loadConfig();
 document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{if(config)loadConfig();}));
 root.addEventListener('input',()=>{if(!inFlight)requestId=null;});
 root.addEventListener('change',()=>{if(!inFlight)requestId=null;});
 root.addEventListener('submit',event=>{
  event.preventDefault();event.stopImmediatePropagation();
  if(inFlight)return;
  if(!selectedCity||!selectedBranch){
   if(!selectedCity){cs.textContent=say('Обери населений пункт зі списку.','Выбери населённый пункт из списка.');city.focus();}
   else {bs.textContent=say('Обери відділення або поштомат зі списку.','Выбери отделение или почтомат из списка.');branch.focus();}
   return;
  }
  const status=root.querySelector('#order-submit-status'),button=root.querySelector('.order-submit');
  const show=message=>{status.hidden=false;status.textContent=message;status.scrollIntoView({block:'nearest'});};
  if(!config){show(say('Сервіс замовлень недоступний. Спробуй пізніше.','Сервис заказов недоступен. Попробуй позже.'));return;}
  if(!config.enabled){show(say('Прийом замовлень тимчасово вимкнено.','Приём заказов временно отключён.'));return;}
  const name=root.querySelector('#customer-name').value.trim(),phone=root.querySelector('#customer-phone').value.replace(/\D/g,'');
  if(name.split(/\s+/u).filter(x=>/\p{L}/u.test(x)).length<2){root.querySelector('#customer-name').focus();show(say('Укажи ім’я та прізвище.','Укажи имя и фамилию.'));return;}
  if(!/^380[1-9]\d{8}$/.test(phone)){root.querySelector('#customer-phone').focus();show(say('Укажи повний номер телефону.','Укажи полный номер телефона.'));return;}
  if(!root.querySelector('#order-consent').checked){root.querySelector('#order-consent').focus();show(say('Підтвердь ознайомлення з умовами.','Подтверди согласие с условиями.'));return;}
  const quantity=Number(root.querySelector('[name=quantity]:checked').value),colors=[root.querySelector('[name=color1]:checked').value];
  if(quantity===2)colors.push(root.querySelector('[name=color2]:checked').value);
  if(colors.some(c=>!config[c])){show(say('Обраний колір тимчасово недоступний.','Выбранный цвет временно недоступен.'));return;}
  if(!['https://klickkhua.blogspot.com','https://klik.kh.ua'].includes(location.origin)){show(say('Оформлення доступне лише на сайті KLIK.','Оформление доступно только на сайте KLIK.'));return;}
  requestId=requestId||crypto.randomUUID();requestNonce=crypto.randomUUID().replaceAll('-','');
  const order={name,phone,quantity,colors,settlementRef:selectedCity.ref,settlementName:selectedCity.label,pointRef:selectedBranch.ref,
   consent:true,legalVersion:config.legal,language:document.documentElement.lang,requestId,confirmedPrice:quantity===1?config.one:config.two};
  inFlight=true;button.disabled=true;show(say('Надсилаємо замовлення…','Отправляем заказ…'));
  resultFrame=document.createElement('iframe');resultFrame.hidden=true;resultFrame.name='klik-order-'+requestNonce;document.body.append(resultFrame);
  const post=document.createElement('form');post.method='post';post.action=endpoint;post.target=resultFrame.name;post.hidden=true;
  for(const [key,value] of Object.entries({origin:location.origin,nonce:requestNonce,order:JSON.stringify(order)})){
   const input=document.createElement('input');input.name=key;input.value=value;post.append(input);
  }
  document.body.append(post);post.submit();post.remove();
  const timer=setTimeout(()=>{window.removeEventListener('message',response);if(inFlight){inFlight=false;button.disabled=false;show(say('Відповідь не отримано. Спробуй ще раз: поля форми збережено.','Ответ не получен. Попробуй ещё раз: поля формы сохранены.'));}},35000);
  function response(e){
   if(!inFlight||!resultFrame||!/^https:\/\/[a-z0-9-]+\.googleusercontent\.com$/i.test(e.origin))return;
   function contains(win,target,depth){
    if(win===target)return true;if(depth>=5)return false;
    try{for(let i=0;i<Math.min(win.length,10);i++)if(contains(win[i],target,depth+1))return true;}catch(_){}
    return false;
   }
   if(!contains(resultFrame.contentWindow,e.source,0))return;
   if(!e.data||e.data.channel!=='klik-order-v1'||e.data.nonce!==requestNonce)return;
   clearTimeout(timer);window.removeEventListener('message',response);inFlight=false;button.disabled=false;
   const r=e.data.result||{};
   if(r.ok&&/^KLIK\d{6,}$/.test(r.number)){
    status.hidden=false;status.classList.add('order-success');status.replaceChildren();
    const title=document.createElement('strong');title.textContent=say('Дякуємо за замовлення!','Спасибо за заказ!');
    const details=document.createElement('p');
    const names=order.colors.map(c=>c==='yellow'?say('жовтий','жёлтый'):say('синій','синий')).join(', ');
    const pack=order.quantity===1?say('Одна кнопка','Одна кнопка'):say('Дві кнопки','Две кнопки');
    details.textContent=r.number+' · '+pack+' · '+names+' · '+order.confirmedPrice+' грн · '+selectedBranch.name;
    const contact=document.createElement('p');contact.textContent=say('Найближчим часом ми зв’яжемося з тобою для підтвердження.','В ближайшее время мы свяжемся с тобой для подтверждения.');
    const close=document.createElement('button');close.type='button';close.className='button';close.textContent=say('Закрити','Закрыть');close.addEventListener('click',()=>root.closest('dialog').close());
    status.append(title,details,contact,close);status.scrollIntoView({block:'nearest'});button.disabled=true;
   }else if(r.error==='price_changed'){
    loadConfig();requestId=null;show(say('Ціна змінилася. Перевір нову суму та підтвердь замовлення ще раз.','Цена изменилась. Проверь новую сумму и подтверди заказ ещё раз.'));
   }else if(r.error==='city_expired'){
    selectedCity=null;selectedBranch=null;cityItems=[];branchItems=[];city.value='';branch.value='';city.focus();
    show(say('Довідник оновився. Обери населений пункт і точку доставки ще раз.','Справочник обновился. Выбери населённый пункт и пункт доставки ещё раз.'));
   }else show(say('Не вдалося оформити замовлення. Дані збережено, спробуй ще раз.','Не удалось оформить заказ. Данные сохранены, попробуй ещё раз.'));
  }
  window.addEventListener('message',response);
 },true);
})();
