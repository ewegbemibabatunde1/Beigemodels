(function(){
  'use strict';
  const number=(window.BEIGE_CONFIG&&window.BEIGE_CONFIG.whatsappNumber||'').replace(/\D/g,'');
  document.querySelectorAll('[data-model-booking]').forEach(link=>{
    const model=link.getAttribute('data-model-booking')||'a model';
    if(number){
      const message='Hello Beige Model Management, I would like to enquire about booking '+model+' for an upcoming project. Please share availability and next steps.';
      link.href='https://wa.me/'+number+'?text='+encodeURIComponent(message);
      link.target='_blank';link.rel='noopener noreferrer';
    }else{
      link.addEventListener('click',event=>{event.preventDefault();alert('WhatsApp booking is not configured yet. Add the verified agency number in js/site-config.js.');});
    }
  });
})();
