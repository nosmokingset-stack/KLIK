/* KLIK public delivery directory. No customer data is cached or transmitted here. */
(function(){
 'use strict';
 window.createKlikDirectorySearch=function({root,request,endpoint,onSelection}){
  const city=root.querySelector('#customer-city'),branch=root.querySelector('#customer-branch');
  const cityBox=root.querySelector('#city-options'),branchBox=root.querySelector('#branch-options');
  const cityStatus=root.querySelector('#city-status'),branchStatus=root.querySelector('#branch-status');
  const ru=()=>document.documentElement.lang==='ru',say=(uk,rus)=>ru()?rus:uk;
  const statusTranslations=[
   ['Не вдалося оновити довідник. Обери місто знову або повтори пошук.','Не удалось обновить справочник. Выбери город снова или повтори поиск.'],
   ['Не вдалося завантажити. Повтори пошук.','Не удалось загрузить. Повтори поиск.'],
   ['Обери населений пункт зі списку.','Выбери населённый пункт из списка.'],['Обери відділення або поштомат зі списку.','Выбери отделение или почтомат из списка.'],
   ['Не знайдено. Спробуй номер або адресу.','Не найдено. Попробуй номер или адрес.'],['Не знайдено. Уточни назву.','Не найдено. Уточни название.'],
   ['Введи щонайменше 3 символи','Введи не менее 3 символов'],['Пошук інших точок триває…','Поиск других пунктов продолжается…'],
   ['Шукаємо інші точки…','Ищем другие пункты…'],['Список доповнюється','Список дополняется'],['Знайдено: ','Найдено: '],['Не знайдено','Не найдено'],['Шукаємо…','Ищем…']
  ].sort((a,b)=>Math.max(...b.map(x=>x.length))-Math.max(...a.map(x=>x.length)));
  const localizeStatus=message=>{let text=message;for(const [uk,rus] of statusTranslations)text=text.replaceAll(ru()?uk:rus,ru()?rus:uk);return text;};
  const normalize=s=>String(s||'').normalize('NFC').trim().replace(/\s+/g,' ').toLowerCase();
  const fold=s=>normalize(s).replace(/отделени[ея]/g,'відділення').replace(/почтомат|постамат/g,'поштомат').replace(/(?:улица|вулиця|\bул\.|вул\.)/g,' ').replace(/ская\b/g,'ська').replace(/[іїы]/g,'и').replace(/[єё]/g,'е').replace(/[ь'’ʼ]/g,'').replace(/\s+/g,' ');
  const cacheKey='klik.np.public.v2:'+endpoint.split('/s/').pop().split('/')[0].slice(-16),ttl=180000,maxEntries=70;
  const cache=new Map(),pending=new Map(),snapshots=new Map();let persistTimer;
  try{const saved=JSON.parse(localStorage.getItem(cacheKey)||'[]');if(Array.isArray(saved))for(const [key,entry] of saved){if(entry&&Date.now()-entry.at<ttl&&entry.value?.ok===true)cache.set(key,entry);}}catch(_){}
  function keyFor(action,payload){return action+':'+JSON.stringify(Object.entries(payload).sort(([a],[b])=>a.localeCompare(b)));}
  function cached(action,payload){const key=keyFor(action,payload),item=cache.get(key);if(!item)return null;if(Date.now()-item.at>=ttl){cache.delete(key);return null;}return item.value;}
  function remember(key,value){
   cache.delete(key);cache.set(key,{at:Date.now(),value});while(cache.size>maxEntries)cache.delete(cache.keys().next().value);
   clearTimeout(persistTimer);persistTimer=setTimeout(()=>{try{localStorage.setItem(cacheKey,JSON.stringify([...cache]));}catch(_){}},80);
  }
  function lookup(action,payload,refresh=false){
   const key=keyFor(action,payload),hit=!refresh&&cached(action,payload);if(hit)return Promise.resolve(hit);
   if(pending.has(key))return pending.get(key);
   const task=request(action,payload).then(value=>{remember(key,value);return value;}).finally(()=>pending.delete(key));pending.set(key,task);return task;
  }
  let selectedCity=null,selectedBranch=null,cityItems=[],branchItems=[],lastCityQuery='';
  let cityRevision=0,pointRevision=0,cityTimer,pointTimer,cityBusy=false,cityPending=null,pointBusy=false,pointPending=null,pointSearch=false;
  let cityState='idle',pointState='idle';
  const notify=()=>onSelection({city:selectedCity,branch:selectedBranch});
  const pointLabel=item=>ru()&&item.nameRu?item.nameRu:item.name;
  const validCity=item=>item&&typeof item.label==='string'&&/^[0-9a-f-]{36}$/i.test(item.ref);
  const validPoint=item=>item&&typeof item.name==='string'&&/^[0-9a-f-]{36}$/i.test(item.ref)&&['branch','locker'].includes(item.kind);
  function view(input,box,status,kind){
   let rows=[],active=-1,selected=null,empty='',dismissed=false;const control=input.closest('.directory-control');
   function close(dismiss=false){if(dismiss)dismissed=true;box.hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');control.classList.remove('is-open');active=-1;}
   function size(){
    if(box.hidden)return;const dialog=input.closest('dialog'),bounds=dialog.getBoundingClientRect(),field=input.getBoundingClientRect();
    const header=dialog.querySelector('.dialog-header');if(field.top<bounds.top+(header?.offsetHeight||0)||field.top>bounds.bottom){close(true);return;}
    let available=Math.min(innerHeight,bounds.bottom)-field.bottom-12;
    if(available<125){dialog.scrollTop+=125-available;available=Math.min(innerHeight,dialog.getBoundingClientRect().bottom)-input.getBoundingClientRect().bottom-12;}
    box.style.maxHeight=Math.max(72,Math.min(250,available))+'px';
   }
   function mark(){
    [...box.querySelectorAll('[role="option"]')].forEach((node,index)=>{node.classList.toggle('is-active',index===active);node.setAttribute('aria-selected',String(rows[index]?.ref===selected));});
    if(active>=0){const option=box.querySelectorAll('[role="option"]')[active];input.setAttribute('aria-activedescendant',option.id);option.scrollIntoView({block:'nearest'});}else input.removeAttribute('aria-activedescendant');
   }
   function show(items,selection,message=''){
    if(dismissed)return;
    rows=items;selected=selection;empty=message;active=-1;input.removeAttribute('aria-activedescendant');box.replaceChildren();
    rows.forEach((item,index)=>{
     const option=document.createElement('div');option.id=kind+'-suggestion-'+index;option.className='directory-option';option.setAttribute('role','option');option.setAttribute('aria-selected',String(item.ref===selected));
     const title=document.createElement('strong'),meta=document.createElement('span');
     if(kind==='city'){const parts=item.label.split(',');title.textContent=parts.shift();meta.textContent=parts.join(',').trim();}
     else{title.textContent=pointLabel(item);meta.textContent=(ru()&&item.addressRu?item.addressRu:item.address)||'';}
     option.append(title);if(meta.textContent)option.append(document.createTextNode(' '),meta);
     option.addEventListener('pointerdown',event=>event.preventDefault());option.addEventListener('click',()=>choose(kind,item));box.append(option);
    });
    if(!rows.length){const messageNode=document.createElement('div');messageNode.className='directory-empty';messageNode.textContent=empty;box.append(messageNode);}
    box.hidden=false;input.setAttribute('aria-expanded','true');control.classList.add('is-open');size();
   }
   input.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&!box.hidden){event.preventDefault();event.stopPropagation();close(true);return;}
    if(event.key==='Tab'){close(true);return;}
    if(box.hidden||!rows.length)return;
    if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();active=active<0?(event.key==='ArrowDown'?0:rows.length-1):(active+(event.key==='ArrowDown'?1:-1)+rows.length)%rows.length;mark();}
    else if(event.key==='Enter'&&active>=0){event.preventDefault();choose(kind,rows[active]);}
   });
   input.addEventListener('focus',()=>{dismissed=false;});input.addEventListener('input',()=>{dismissed=false;});
   input.addEventListener('blur',()=>queueMicrotask(()=>{if(!control.contains(document.activeElement))close(true);}));
   return {show,close,size,status,isOpen:()=>!box.hidden,refresh(){if(!box.hidden)show(rows,selected,localizeStatus(empty));}};
  }
  const cityView=view(city,cityBox,cityStatus,'city'),pointView=view(branch,branchBox,branchStatus,'point');
  function loading(view,kind){
   const revision=kind==='city'?cityRevision:pointRevision;
   setTimeout(()=>{if(revision!==(kind==='city'?cityRevision:pointRevision))return;if((kind==='city'?cityState:pointState)!=='loading')return;if(document.activeElement===(kind==='city'?city:branch))view.show([],null,say('Шукаємо…','Ищем…'));},180);
  }
  function clearBranch(){selectedBranch=null;branch.value='';branch.disabled=!selectedCity;branchItems=[];pointRevision++;clearTimeout(pointTimer);pointPending=null;pointState='idle';branchStatus.textContent='';pointView.close();notify();}
  function acceptFeatures(result){if(result.features?.pointSearch===true)pointSearch=true;}
  function showCities(items){cityItems=items.filter(validCity);cityState='ready';cityStatus.textContent=cityItems.length?say('Знайдено: ','Найдено: ')+cityItems.length:say('Не знайдено','Не найдено');if(document.activeElement===city)cityView.show(cityItems,selectedCity?.ref,say('Не знайдено. Уточни назву.','Не найдено. Уточни название.'));}
  function scheduleCities(){
   const q=normalize(city.value),revision=++cityRevision;clearTimeout(cityTimer);cityPending=null;
   if(selectedCity&&city.value===selectedCity.label)return;
   selectedCity=null;clearBranch();cityView.close();cityItems=[];lastCityQuery=q;notify();
   if(q.length<3){cityState='idle';cityStatus.textContent=say('Введи щонайменше 3 символи','Введи не менее 3 символов');return;}
   const hit=cached('cities',{q});if(hit){acceptFeatures(hit);showCities(hit.items||[]);return;}
   cityState='loading';cityStatus.textContent='';loading(cityView,'city');
   cityTimer=setTimeout(()=>{cityPending={q,revision};drainCities();},150);
  }
  async function drainCities(){
   if(cityBusy)return;cityBusy=true;
   try{while(cityPending){const job=cityPending;cityPending=null;if(job.revision!==cityRevision)continue;
    try{const result=await lookup('cities',{q:job.q});acceptFeatures(result);if(job.revision===cityRevision&&!selectedCity)showCities(result.items||[]);}
    catch(_){if(job.revision===cityRevision){cityState='error';cityStatus.textContent=say('Не вдалося завантажити. Повтори пошук.','Не удалось загрузить. Повтори поиск.');cityView.close();}}
   }}finally{cityBusy=false;}
  }
  function filterPoints(items,q){
   const query=fold(q),tokens=query.split(' ').filter(Boolean),number=query.match(/^\s*(?:№\s*)?(\d+)\s*$/)?.[1];
   return items.filter(item=>{const text=fold([item.name,item.address,item.nameRu,item.addressRu,item.number].join(' '));return tokens.every(token=>text.includes(token));})
    .sort((a,b)=>{if(number){const score=item=>String(item.number)===number?0:String(item.number).startsWith(number)?1:2;return score(a)-score(b)||Number(a.number)-Number(b.number);}return Number(a.number)-Number(b.number);}).slice(0,30);
  }
  function renderPoints(job,items,complete){
   if(job.revision!==pointRevision||job.city.ref!==selectedCity?.ref)return;
   branchItems=filterPoints(items,job.q);pointState=complete?'ready':'partial';
   branchStatus.textContent=branchItems.length?say('Знайдено: ','Найдено: ')+branchItems.length+(complete?'':say(' · Список доповнюється',' · Список дополняется')):complete?say('Не знайдено','Не найдено'):say('Пошук інших точок триває…','Поиск других пунктов продолжается…');
   if(document.activeElement===branch)pointView.show(branchItems,selectedBranch?.ref,complete?say('Не знайдено. Спробуй номер або адресу.','Не найдено. Попробуй номер или адрес.'):say('Шукаємо інші точки…','Ищем другие пункты…'));
  }
  function snapshot(ref){let entry=snapshots.get(ref);if(!entry||Date.now()-entry.at>=ttl){entry={at:Date.now(),items:new Map(),page:1,complete:false};snapshots.set(ref,entry);while(snapshots.size>4)snapshots.delete(snapshots.keys().next().value);}return entry;}
  function queuePoints(q,revision=++pointRevision){
   if(!selectedCity)return;const job={q:normalize(q),revision,city:selectedCity};
   const hit=pointSearch&&cached('pointsSearch',{city:selectedCity.ref,q:job.q}),entry=snapshot(selectedCity.ref);
   if(hit)renderPoints(job,(hit.items||[]).filter(validPoint),true);else if(entry.items.size)renderPoints(job,[...entry.items.values()],entry.complete);
   pointPending=job;drainPoints();
  }
  async function drainPoints(){
   if(pointBusy)return;pointBusy=true;
   try{while(pointPending){const job=pointPending;pointPending=null;if(job.revision!==pointRevision||job.city.ref!==selectedCity?.ref)continue;
    try{
     if(pointSearch){const hit=cached('pointsSearch',{city:job.city.ref,q:job.q});if(hit)renderPoints(job,(hit.items||[]).filter(validPoint),true);else{pointState='loading';loading(pointView,'point');const result=await lookup('pointsSearch',{city:job.city.ref,q:job.q});renderPoints(job,(result.items||[]).filter(validPoint),true);}}
     else{
      const entry=snapshot(job.city.ref);if(entry.items.size||entry.complete)renderPoints(job,[...entry.items.values()],entry.complete);else{pointState='loading';loading(pointView,'point');}
      while(!entry.complete&&entry.page<=200&&job.revision===pointRevision&&job.city.ref===selectedCity?.ref&&!selectedBranch&&!pointPending){
       const result=await lookup('points',{city:job.city.ref,page:entry.page});for(const item of result.items||[])if(validPoint(item))entry.items.set(item.ref,item);
       entry.page++;entry.complete=!result.more;renderPoints(job,[...entry.items.values()],entry.complete);
      }
      if(entry.page>200&&!entry.complete)throw Error('incomplete');
     }
    }catch(error){
     if(job.revision!==pointRevision)continue;
     // CacheService may evict a city registration early. Renew it once, never loop.
     if(!job.renewed&&['directory_unavailable','city_expired'].includes(error.code)){
      try{const result=await lookup('cities',{q:lastCityQuery||normalize(job.city.label.split(',')[0].replace(/^м\.\s*/,''))},true);acceptFeatures(result);const renewed=(result.items||[]).find(item=>item.ref===job.city.ref);
       if(renewed&&job.revision===pointRevision){selectedCity=renewed;city.value=renewed.label;notify();pointPending={...job,city:renewed,renewed:true};continue;}
      }catch(_){}
     }
     if(job.revision!==pointRevision)continue;
     pointState='error';branchStatus.textContent=say('Не вдалося оновити довідник. Обери місто знову або повтори пошук.','Не удалось обновить справочник. Выбери город снова или повтори поиск.');if(!branchItems.length)pointView.close();
    }
   }}finally{pointBusy=false;}
  }
  function schedulePoints(){
   const revision=++pointRevision;clearTimeout(pointTimer);pointPending=null;
   if(selectedBranch&&branch.value===pointLabel(selectedBranch))return;
   selectedBranch=null;notify();if(!selectedCity){pointView.close();return;}
   const q=normalize(branch.value),entry=snapshot(selectedCity.ref);
   if(entry.items.size)renderPoints({q,revision,city:selectedCity},[...entry.items.values()],entry.complete);
   const hit=pointSearch&&cached('pointsSearch',{city:selectedCity.ref,q});if(hit){renderPoints({q,revision,city:selectedCity},(hit.items||[]).filter(validPoint),true);return;}
   pointTimer=setTimeout(()=>queuePoints(q,revision),100);
  }
  function choose(kind,item){
   if(kind==='city'){
    cityRevision++;clearTimeout(cityTimer);cityPending=null;selectedCity=item;city.value=item.label;cityView.close();cityStatus.textContent='';clearBranch();refreshLabels();notify();branch.focus({preventScroll:true});
   }else{pointRevision++;clearTimeout(pointTimer);pointPending=null;selectedBranch=item;branch.value=pointLabel(item);pointView.close();branchStatus.textContent='';notify();}
   root.dispatchEvent(new Event('change',{bubbles:true}));
  }
  city.addEventListener('input',scheduleCities);branch.addEventListener('input',schedulePoints);
  city.addEventListener('focus',()=>{if(cityItems.length)cityView.show(cityItems,selectedCity?.ref);else if(!selectedCity&&normalize(city.value).length>=3)scheduleCities();});
  branch.addEventListener('focus',()=>{if(!selectedCity)return;if(branchItems.length)pointView.show(branchItems,selectedBranch?.ref);if(!selectedBranch)queuePoints(branch.value);});
  document.addEventListener('pointerdown',event=>{if(!event.target.closest('.directory-control')){cityView.close(true);pointView.close(true);}});
  root.closest('dialog')?.addEventListener('close',()=>{cityView.close();pointView.close();pointRevision++;pointPending=null;clearTimeout(pointTimer);});
  root.closest('dialog')?.addEventListener('scroll',()=>{cityView.size();pointView.size();},{passive:true});
  window.addEventListener('resize',()=>{cityView.size();pointView.size();},{passive:true});
  function refreshLabels(){
   city.placeholder=say('Почни вводити, наприклад, Харків','Начни вводить, например, Харьков');
   branch.placeholder=selectedCity?say('Номер, адреса або поштомат','Номер, адрес или почтомат'):say('Спочатку обери населений пункт','Сначала выбери населённый пункт');
   if(selectedBranch)branch.value=pointLabel(selectedBranch);
   cityStatus.textContent=localizeStatus(cityStatus.textContent);branchStatus.textContent=localizeStatus(branchStatus.textContent);
   cityView.refresh();pointView.refresh();
  }
  new MutationObserver(refreshLabels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  branch.disabled=true;refreshLabels();
  return {reset(){const ref=selectedCity?.ref;if(ref){snapshots.delete(ref);for(const [key,entry] of cache)if(key.includes(ref)||key.startsWith('cities:')&&entry.value.items?.some(item=>item.ref===ref))cache.delete(key);try{localStorage.setItem(cacheKey,JSON.stringify([...cache]));}catch(_){}}cityRevision++;clearTimeout(cityTimer);cityPending=null;selectedCity=null;cityItems=[];city.value='';cityView.close();cityStatus.textContent='';clearBranch();refreshLabels();notify();},refreshLabels};
 };
})();
