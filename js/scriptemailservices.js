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

  // Verificar que se haya seleccionado al menos un producto
  if (productosSeleccionados.length === 0) {
    alert("⚠️ Debes seleccionar al menos un producto antes de enviar el formulario.");
    return;
  }

  // Enviar el formulario a través de EmailJS
  emailjs.send("service_ll9rmqj", "template_k2rb9k8", {
    name: name,
    email: email,
    phone: phone,
    productos: productosSeleccionados.join(", ") // Unir los productos con una coma
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

// Mostrar los productos seleccionados en el formulario cuando se abra la ventana emergente
document.addEventListener("DOMContentLoaded", function () {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const productosSeleccionados = document.getElementById("productos-seleccionados");
  
  // Limpiar la lista actual de productos seleccionados
  productosSeleccionados.innerHTML = "";

  // Verificar si hay productos seleccionados en el carrito
  if (carrito.length === 0) {
    let mensajeVacio = document.createElement("li");
    mensajeVacio.textContent = "No has seleccionado ningún producto.";
    mensajeVacio.classList.add("list-group-item", "text-muted");
    productosSeleccionados.appendChild(mensajeVacio);
  } else {
    // Mostrar los productos seleccionados en el modal
    carrito.forEach(producto => {
      let item = document.createElement("li");
      item.textContent = producto.nombre;
      item.classList.add("list-group-item");
      productosSeleccionados.appendChild(item);
    });
  }
});

// Modal de Contacto Verificación y Envío del Formulario
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const form = event.target;
  const inputs = form.querySelectorAll('input');
  const productosSeleccionados = document.getElementById("productos-seleccionados");

  let isValid = true;

  // Validar los campos del formulario (nombre, email, teléfono)
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      isValid = false;
      input.classList.add('is-invalid');
    } else {
      input.classList.remove('is-invalid');
    }
  });

  // Verificar si hay productos seleccionados
  if (productosSeleccionados.children.length === 0 || productosSeleccionados.textContent === "No has seleccionado ningún producto.") {
    isValid = false;
    alert("⚠️ Debes seleccionar al menos un producto antes de enviar el formulario.");
  }

  // Si todo es válido, enviar el formulario
  if (isValid) {
    alert("✅ Formulario enviado correctamente. Vaciando carrito...");

    // Vaciar el carrito visualmente
    productosSeleccionados.innerHTML = ""; 

    // Vaciar el carrito en el localStorage
    localStorage.removeItem("carrito");

    // vaciar el carrito en la variable global
    let carrito = [];
    
    // Cierra el modal de contacto
    const contactoModal = document.getElementById("contacto-modal");
    contactoModal.style.display = "none";
    
    form.submit(); // Ahora se envía el formulario
  } else {
    alert("⚠️ El formulario no se ha enviado correctamente. Por favor, revisa los campos e intenta nuevamente.");
  }
});
