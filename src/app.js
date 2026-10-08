import { measurementReady, confirmEnquiry } from './privacy.js';
const toggle=document.querySelector('.menu-toggle');
const panel=document.querySelector('#menu-panel');
const header=document.querySelector('.site-header');
function setMenu(open){panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?toggle.dataset.close:toggle.dataset.open);document.body.classList.toggle('menu-open',open);document.querySelector('main').inert=open;document.querySelector('footer').inert=open;if(open)panel.querySelector('a')?.focus();else toggle.focus();}
toggle?.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
document.addEventListener('keydown',e=>{if(toggle?.getAttribute('aria-expanded')!=='true')return;if(e.key==='Escape'){setMenu(false);return;}if(e.key==='Tab'){const items=[toggle,...panel.querySelectorAll('a,button')];const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
panel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{setMenu(false);}));
const scrolled=()=>header?.classList.toggle('is-scrolled',window.scrollY>32);window.addEventListener('scroll',scrolled,{passive:true});scrolled();
const form=document.querySelector('#enquiry-form');
if(form){
 const en=form.dataset.lang==='en';const t=(es,english)=>en?english:es;const button=form.querySelector('button[type=submit]');const status=form.querySelector('.form-status');measurementReady.finally(()=>{button.disabled=false;});
 let submitting=false;
 const errorText={privacy:t('Lee y marca la información de privacidad.','Please read and acknowledge the privacy information.'),name:t('Introduce tu nombre.','Please enter your name.'),email:t('Introduce un correo electrónico válido.','Please enter a valid email address.'),area:t('Selecciona el motivo de tu consulta.','Please choose the subject of your enquiry.'),message:t('Describe brevemente qué necesitas.','Please briefly describe what you need.')};
 const message=(text,error=false)=>{status.textContent=text;status.classList.toggle('is-error',error);status.focus();};
 form.addEventListener('input',event=>{const field=event.target;if(field.name){field.removeAttribute('aria-invalid');const error=document.getElementById('error-'+field.name);if(error)error.textContent='';}});
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(submitting)return;let firstInvalid=null;
  for(const field of form.querySelectorAll('input:not([type=hidden]):not([name=_gotcha]),textarea,select')){const valid=field.checkValidity()&&(!field.required||field.value.trim().length>0);field.setAttribute('aria-invalid',String(!valid));document.getElementById('error-'+field.name).textContent=valid?'':errorText[field.name]||t('Reduce el texto de este campo para continuar.','Please shorten this field to continue.');if(!valid&&!firstInvalid)firstInvalid=field;}
  if(firstInvalid){status.textContent=t('Revisa los campos señalados antes de enviar.','Please check the highlighted fields before sending.');status.classList.add('is-error');firstInvalid.focus();return;}
  const bodyData=new FormData(form);if(bodyData.get('_gotcha'))return;
  const data=Object.fromEntries(bodyData);
  if(form.dataset.mode==='email'){
   const body=[t('Consulta a Solera Estates','Enquiry to Solera Estates'),'',[t('Nombre','Name'),data.name].join(': '),['Email',data.email].join(': '),[t('Teléfono','Phone'),data.phone].join(': '),[t('Área','Subject'),data.area].join(': '),[t('Ubicación','Location'),data.location].join(': '),[t('Momento','Timing'),data.timing].join(': '),'',data.message].join('\n');
   const mailto='mailto:info@soleraestates.eu?subject='+encodeURIComponent('Solera Estates — '+data.area)+'&body='+encodeURIComponent(body);
   if(mailto.length>7000){message(t('El mensaje es demasiado largo para abrirlo en la aplicación de correo. Copia tu consulta y envíala directamente a info@soleraestates.eu.','The message is too long to open in your email application. Copy your enquiry and email it directly to info@soleraestates.eu.'),true);return;}
   window.location.href=mailto;message(t('Revisa y envía la consulta desde tu aplicación de correo. Si no se ha abierto, escribe directamente a info@soleraestates.eu. El sitio no ha enviado el mensaje.','Review and send your enquiry from your email application. If it did not open, email info@soleraestates.eu directly. The website has not sent the message.'));return;
  }
  const original=button.textContent;submitting=true;button.disabled=true;button.textContent=t('Enviando consulta…','Sending your enquiry…');form.setAttribute('aria-busy','true');
  try{
   const response=await fetch(form.action,{method:'POST',headers:{Accept:'application/json'},body:bodyData,signal:AbortSignal.timeout(30000)});
   const result=await response.json().catch(()=>null);
   if(!response.ok||!result||result.ok===false||result.error||result.errors?.length){message(t('No hemos podido enviar tu consulta. Conserva el mensaje e inténtalo de nuevo.','We could not send your enquiry. Keep a copy of your message and try again.'),true);return;}
   await confirmEnquiry(form.id);
   try{sessionStorage.setItem('solera-enquiry-confirmed',String(Date.now()));}catch{message(t('Hemos recibido tu consulta. Revisaremos la información para valorar el siguiente paso.','We have received your enquiry. We will review the information to consider the next step.'));form.reset();return;}
   window.location.assign(en?'/en/thank-you/':'/gracias/');
  }catch{message(t('No hemos podido confirmar el envío. Comprueba tu conexión y evita reenviar varias veces seguidas.','We could not confirm submission. Check your connection and avoid sending repeatedly.'),true);}
  finally{submitting=false;button.disabled=false;button.textContent=original;form.removeAttribute('aria-busy');}
 });
}
const receipt=document.querySelector('#confirmed-receipt');
if(receipt){let confirmed=false;try{const when=Number(sessionStorage.getItem('solera-enquiry-confirmed'));confirmed=when>0&&Date.now()-when<300000;sessionStorage.removeItem('solera-enquiry-confirmed');}catch{}if(confirmed){document.querySelector('.receipt-unconfirmed').replaceWith(receipt.content.cloneNode(true));}}
