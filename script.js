// script.js

// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Utility to URL-encode body
function encodeBody(obj) {
  return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
}

// Handle lead form submit: prepare mailto and open
function handleFormSubmit(e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const serviceType = document.getElementById('serviceType').value;
  const details = document.getElementById('details').value.trim();

  // Prepare email
  const to = 'whaletailcompany@gmail.com';
  const subject = `Demande de service - ${firstName} ${lastName} - ${serviceType}`;
  const bodyLines = [
    `Prénom: ${firstName}`,
    `Nom: ${lastName}`,
    `Téléphone: ${phone}`,
    `Service souhaité: ${serviceType}`,
    `Détails: ${details}`
  ];
  const body = bodyLines.join('\n');

  const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Show confirmation UI
  const sent = document.getElementById('sentConfirm');
  sent.style.display = 'block';
  sent.setAttribute('aria-hidden','false');
  sent.textContent = '✓ Préparation du message...';

  // Small delay so user sees confirmation, then open mailto
  setTimeout(()=> {
    window.location.href = mailto;
    sent.textContent = '✓ Client email ouvert';
  }, 600);

  return false;
}

// Optional: enhance service cards to show small toast when clicked
document.querySelectorAll('.service-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    const svc = card.getAttribute('data-service') || 'Service';
    // small visual feedback
    card.style.transform = 'translateY(-6px) scale(1.01)';
    setTimeout(()=>{ card.style.transform = ''; }, 360);
    // optionally focus contact form and preselect service
    const sel = document.getElementById('serviceType');
    if(sel) sel.value = svc;
    // scroll to contact
    document.getElementById('contact').scrollIntoView({behavior:'smooth'});
  });
});

// Ensure clicking mail or whatsapp uses safe external links (already in HTML target attr)
