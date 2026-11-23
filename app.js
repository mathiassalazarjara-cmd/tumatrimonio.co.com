(function(){
  var WA='573004427428';
  var $=function(s){return document.querySelector(s)};
  var store={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
  $('#yr').textContent=new Date().getFullYear();

  // Splash de entrada
  var sp=$('#splash'),done=false;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function start(){
    if(done)return;done=true;
    sp.classList.add('out');document.body.classList.remove('lock');
    setTimeout(function(){document.body.classList.add('ready')},350);
    setTimeout(function(){sp.classList.add('gone')},1400);
  }
  if(reduce){sp.classList.add('gone');document.body.classList.remove('lock');document.body.classList.add('ready')}
  else{sp.addEventListener('click',start);setTimeout(start,2600)}

  // Corazones flotantes
  var hz=$('#hearts');
  if(hz&&!reduce){for(var i=0;i<14;i++){var s=document.createElement('span');var z=10+Math.random()*18;
    s.innerHTML='<svg width="'+z+'" height="'+z+'"><use href="#i-heart"/></svg>';
    s.style.left=(Math.random()*100)+'%';s.style.animationDuration=(10+Math.random()*12)+'s';s.style.animationDelay=(-Math.random()*20)+'s';hz.appendChild(s)}}

  // Slideshow del hero
  var imgs=document.querySelectorAll('#slides img'),dots=document.querySelectorAll('#dots i'),cur=0;
  setTimeout(function(){setInterval(function(){imgs[cur].classList.remove('on');dots[cur].classList.remove('on');cur=(cur+1)%imgs.length;imgs[cur].classList.add('on');dots[cur].classList.add('on')},5500)},2600);

  // Nav
  var nav=$('#nav');
  var onScroll=function(){nav.classList.toggle('solid',window.scrollY>40)};
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  var mob=$('#mobile');
  $('#burger').onclick=function(){mob.classList.add('open');mob.setAttribute('aria-hidden','false')};
  var closeM=function(){mob.classList.remove('open');mob.setAttribute('aria-hidden','true')};
  $('#close').onclick=closeM;
  mob.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeM)});

  // Reveal
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
  // Retraso escalonado de palabras del titular
  document.querySelectorAll('.hero .w>span').forEach(function(s,i){s.style.transitionDelay=(.08+i*.09)+'s'});

  // Categorías / buscador -> WhatsApp
  var names={recepcion:'lugar de recepción',ceremonia:'ceremonia',bizcocho:'bizcocho',etiqueta:'etiqueta (vestidos y trajes)',belleza:'belleza',iluminacion:'iluminación',centros:'centros de mesa',recordatorios:'recordatorios'};
  var openWA=function(t){window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(t),'_blank','noopener')};
  document.querySelectorAll('[data-cat]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();openWA('Hola, busco empresas recomendadas de '+names[a.dataset.cat]+' en Medellín.')})});
  $('#search').addEventListener('submit',function(e){e.preventDefault();openWA('Hola, busco proveedores de '+names[$('#s-cat').value]+' en '+$('#s-city').value+'.')});

  // Registro -> WhatsApp
  $('#regForm').addEventListener('submit',function(e){
    e.preventDefault();var f=e.target,ok=true;
    ['nombre','celular'].forEach(function(n){var el=f[n];var bad=!el.value.trim();el.style.borderColor=bad?'#ff6161':'';if(bad)ok=false});
    if(!ok){f.querySelector('[style*="ff6161"]').focus();return}
    var msg='Hola, quiero registrarme en tu Matrimonio y recibir el enlace del cursillo prematrimonial y mis cheques regalo.\n\n'+
      'Nombre: '+f.nombre.value+' '+f.apellido.value+'\nCelular: '+f.celular.value+(f.email.value?'\nEmail: '+f.email.value:'')+
      (f.fecha.value?'\nFecha de la boda: '+f.fecha.value:'')+'\nCiudad: '+f.ciudad.value;
    if(f.fecha.value){store.set('tm_date',f.fecha.value);$('#wdate').value=f.fecha.value;plan()}
    openWA(msg);$('#formView').style.display='none';$('#okView').classList.add('show');
  });

  // Planeador
  var STAGES=[
    {min:300,t:'12 meses o más',items:['Definir presupuesto y estilo de boda','Elegir la fecha y la parroquia','Hacer la lista preliminar de invitados','Reservar el lugar de recepción','Registrarte en el Club de Novias']},
    {min:180,t:'De 10 a 6 meses',items:['Contratar fotografía y video','Elegir el vestido de novia','Reservar música y DJ','Definir decoración y centros de mesa','Planear la luna de miel']},
    {min:90,t:'De 6 a 3 meses',items:['Inscribirse al cursillo prematrimonial','Enviar las invitaciones','Prueba de bizcocho y menú','Traje del novio y de los pajes','Elegir recordatorios']},
    {min:30,t:'De 3 meses a 1 mes',items:['Reunir los documentos para la parroquia','Prueba de maquillaje y peinado','Confirmar asistencia de invitados','Organizar las mesas','Comprar los anillos']},
    {min:0,t:'Último mes',items:['Confirmar a todos los proveedores','Última prueba del vestido','Preparar pagos finales','Ensayo de la ceremonia','¡Descansar y disfrutar!']}
  ];
  var list=$('#tasklist'),timer=null;
  function stageFor(days){for(var i=0;i<STAGES.length;i++){if(days>=STAGES[i].min)return i}return STAGES.length-1}
  function render(idx){
    var st=STAGES[idx],dn=JSON.parse(store.get('tm_done_'+idx)||'[]');
    $('#stage-t').textContent=st.t;$('#stage-s').textContent='Etapa '+(idx+1)+' de '+STAGES.length;
    list.innerHTML='';
    st.items.forEach(function(it,i){
      var li=document.createElement('li');li.innerHTML='<label><input type="checkbox"><span></span></label>';
      li.querySelector('span').textContent=it;var cb=li.querySelector('input');cb.checked=dn.indexOf(i)>-1;
      cb.onchange=function(){var d=JSON.parse(store.get('tm_done_'+idx)||'[]');if(cb.checked)d.push(i);else d=d.filter(function(x){return x!==i});store.set('tm_done_'+idx,JSON.stringify(d));prog(idx)};
      list.appendChild(li)});
    prog(idx);
  }
  function prog(idx){var n=list.querySelectorAll('input:checked').length;$('#prog').style.width=(n/STAGES[idx].items.length*100)+'%'}
  function plan(){
    var v=$('#wdate').value;clearInterval(timer);
    if(!v){render(0);return}
    var target=new Date(v+'T16:00:00');
    var tick=function(){
      var ms=target-new Date();if(ms<0)ms=0;
      var d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4),s=Math.floor(ms%6e4/1e3);
      $('#cd-d').textContent=d;$('#cd-h').textContent=String(h).padStart(2,'0');$('#cd-m').textContent=String(m).padStart(2,'0');$('#cd-s').textContent=String(s).padStart(2,'0');
      return d};
    render(stageFor(tick()));timer=setInterval(tick,1000);
  }
  var saved=store.get('tm_date');if(saved)$('#wdate').value=saved;
  $('#wdate').addEventListener('change',function(){store.set('tm_date',this.value);plan()});
  plan();
})();
