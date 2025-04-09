// Inicializar EmailJS
emailjs.init("dH_2F8RtZYGMW85JB"); // Reemplaza con tu PUBLIC KEY de EmailJS

// Función para manejar el envío del formulario
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  // Obtener los valores del formulario
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  // Obtener la lista de productos seleccionados
  const productosSeleccionados = [];
  document.querySelectorAll("#productos-seleccionados li").forEach(function(item) {
    productosSeleccionados.push(item.textContent);
  });

  // Enviar el formulario a través de EmailJS
  emailjs.send("service_ll9rmqj", "template_k2rb9k8", {
    name: name,
    email: email,
    phone: phone,
    productos: productosSeleccionados
  })
  .then(function(response) {
    console.log("SUCCESS", response);
    alert("¡Mensaje enviado con éxito!");
    document.getElementById("contactForm").reset(); // Limpia el formulario
  }, function(error) {
    console.log("FAILED", error);
    alert("Hubo un error al enviar el mensaje.");
  });
});
