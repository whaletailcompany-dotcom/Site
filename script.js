document.getElementById("year").textContent = new Date().getFullYear();

function handleFormSubmit(e) {
  e.preventDefault();

  const prenom = document.getElementById("firstName").value.trim();
  const nom = document.getElementById("lastName").value.trim();
  const tel = document.getElementById("phone").value.trim();
  const service = document.getElementById("serviceType").value;
  const details = document.getElementById("details").value.trim();

  const to = "whaletailcompany@gmail.com";
  const sujet = `Demande de service - ${prenom} ${nom}`;
  const body = `Prénom: ${prenom}%0D%0ANom: ${nom}%0D%0ATéléphone: ${tel}%0D%0AService: ${service}%0D%0ADétails: ${details}`;

  const mailto = `mailto:${to}?subject=${encodeURIComponent(sujet)}&body=${body}`;
  const confirm = document.getElementById("sentConfirm");
  confirm.style.display = "block";
  confirm.textContent = "Préparation du message...";

  setTimeout(() => {
    window.location.href = mailto;
    confirm.textContent = "✓ Message prêt à être envoyé";
  }, 800);

  return false;
}
