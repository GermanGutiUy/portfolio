emailjs.init("dH_2F8RtZYGMW85JB"); // Reemplaza con tu PUBLIC KEY de EmailJS

// Cuando se envíe el formulario
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  // Enviar el formulario a través de EmailJS
  emailjs.sendForm("service_ll9rmqj", "template_rg7hz3i", this)
    .then(function(response) {
      console.log("SUCCESS", response);
      alert("¡Mensaje enviado con éxito!");
      document.getElementById("contactForm").reset(); // Limpia el formulario
    }, function(error) {
      console.log("FAILED", error);
      alert("Hubo un error al enviar el mensaje.");
    });
});
