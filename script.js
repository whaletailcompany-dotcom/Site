// Simple interactive behaviors: popups, form mailto, PayPal, dots menu
document.addEventListener('DOMContentLoaded', function(){
  // elements
  const aboutBtn = document.getElementById('aboutBtn');
  const aboutPopup = document.getElementById('aboutPopup');
  const dotsBtn = document.getElementById('dotsBtn');
  const dotsMenu = document.getElementById('dotsMenu');
  const orderBtn = document.getElementById('orderBtn');
  const ipBtn = document.getElementById('ipBtn');
  const ipPopup = document.getElementById('ipPopup');
  const orderForm = document.getElementById('orderForm');
  const paypalBtn = document.getElementById('paypalBtn');

  // toggle helper
  function show(el){ if(!el) return; el.style.display = 'flex'; el.setAttribute('aria-hidden','false'); }
  function hide(el){ if(!el) return; el.style.display = 'none'; el.setAttribute('aria-hidden','true'); }

  // ABOUT
  aboutBtn.addEventListener('click', function(){ 
    if(aboutPopup.style.display === 'flex') hide(aboutPopup);
    else show(aboutPopup);
  });

  // DOTS MENU
  dotsBtn.addEventListener('click', function(){
    if(dotsMenu.style.display === 'block') hide(dotsMenu);
    else { dotsMenu.style.display = 'block'; dotsMenu.style.right = '18px'; }
  });

  // ORDER button opens contact area (scroll / open modal)
  orderBtn.addEventListener('click', function(){
    document.getElementById('contact').scrollIntoView({behavior:'smooth', block:'center'});
  });

  // IP popup
  ipBtn.addEventListener('click', function(){ show(ipPopup); });
  // close buttons inside modals
  document.querySelectorAll('[data-close]').forEach(btn=>{
    btn.addEventListener('click', function(e){
      const target = btn.getAttribute('data-close');
      const el = document.getElementById(target);
      hide(el);
    });
  });

  // Close clicking outside modals
  ['aboutPopup','ipPopup'].forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('click', function(e){
      if(e.target === el) hide(el);
    });
  });

  // Order form submit -> mailto
  if(orderForm){
    orderForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const budget = document.getElementById('budget').value.trim();
      const details = document.getElementById('details').value.trim();

      const subject = encodeURIComponent(`Demande de service - ${name}`);
      const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\nBudget: ${budget}\n\nDétails:\n${details}`);
      const mail = `mailto:whaletailcompany@gmail.com?subject=${subject}&body=${body}`;

      // open mail client
      window.location.href = mail;
    });
  }

  // PayPal quick link (placeholder)
  if(paypalBtn){
    paypalBtn.addEventListener('click', function(){
      // Remplacez par votre lien PayPal.me réel
      window.open('https://paypal.me/yourpaypal', '_blank');
    });
  }

  // make videos autoplay on mobile (attempt)
  document.querySelectorAll('video').forEach(v=>{
    v.setAttribute('playsinline','');
    v.muted = true;
    v.loop = true;
    try{ v.play(); }catch(e){}
  });

  // Simple click outside for dots menu
  document.addEventListener('click', function(e){
    const path = e.composedPath ? e.composedPath() : (e.path || []);
    if(!path.includes(dotsBtn) && !path.includes(dotsMenu)){
      hide(dotsMenu);
    }
    if(!path.includes(aboutBtn) && !path.includes(aboutPopup)){
      hide(aboutPopup);
    }
  });
});
