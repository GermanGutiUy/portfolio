// Declaraciones globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para actualizar la lista de productos en el carrito
function actualizarListaProductos() {
    const listaProductos = document.getElementById("productos-seleccionados");
    if (!listaProductos) return;

    listaProductos.innerHTML = ""; // Limpiamos la lista antes de agregar los productos

    if (carrito.length === 0) {
        let mensajeVacio = document.createElement("li");
        mensajeVacio.textContent = "El carrito está vacío";
        mensajeVacio.classList.add("list-group-item", "text-muted");
        listaProductos.appendChild(mensajeVacio);
        return;
    }

    carrito.forEach(producto => {
        let item = document.createElement("li");
        item.textContent = producto.nombre;
        item.classList.add("list-group-item");
        listaProductos.appendChild(item);
    });
}

// Función para actualizar el carrito en el almacenamiento local y en la vista
function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));

    const listaProductos = document.getElementById("productos-lista");
    if (!listaProductos) return; // Evitar errores si el elemento no existe

    listaProductos.innerHTML = "";

    carrito.forEach(producto => {
        let item = document.createElement("li");
        item.textContent = producto.nombre; // Solo el nombre del servicio
        listaProductos.appendChild(item);
    });

    actualizarListaProductos();
}

// Cargar el archivo JSON con los servicios
fetch('../productos.json')
  .then(response => response.json())
  .then(productos => {
    const container = document.querySelector('#servicios-container'); // Contenedor para los servicios
    
    productos.forEach(producto => {
      const productCard = `
        <div class="col-lg-11 col-xl-9 col-xxl-8">
          <div class="card overflow-hidden shadow rounded-4 border-0 mb-5">
            <div class="card-body p-0">
              <div class="d-flex align-items-center">
                <div class="p-5">
                  <h2 class="fw-bolder">${producto.nombre}</h2>
                  <p>${producto.descripcion}</p>
                  <button class="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder" 
                    data-producto="${producto.nombre}" data-id="${producto.id}">
                    Añadir al Carrito
                  </button>
                </div>
                <img class="img-fluid2" src="${producto.imagen}" alt="Imagen de ${producto.nombre}" />
              </div>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += productCard;
    });

    // Función para agregar productos al carrito
    function manejarProducto(producto) {
        const index = carrito.findIndex(item => item.id === producto.id);
        if (index === -1) {
            carrito.push(producto);
            alert(`✅ El servicio de ${producto.nombre} ha sido añadido al carrito.`);
        } else {
            alert(`✅ El servicio de ${producto.nombre} ya está en el carrito.`);
        }
        actualizarCarrito();
    }

    // Asociar los eventos de los botones de "Añadir al Carrito"
    document.querySelectorAll("button[data-producto]").forEach(boton => {
        boton.addEventListener("click", function () {
            const producto = {
                id: boton.getAttribute("data-id"),
                nombre: boton.getAttribute("data-producto"),
            };
            manejarProducto(producto);
        });
    });

    // Mostrar el carrito en un modal
    const modal = document.getElementById("carrito-modal");
    const btnCarrito = document.getElementById("carrito-btn");
    const closeBtn = document.getElementById("close-btn");
    const btnEmpezar = document.getElementById("btn-empezar");

    if (btnCarrito) {
        btnCarrito.onclick = function() {
            modal.style.display = "block";
            actualizarCarrito();
        };
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        };
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Botón para vaciar el carrito
    const btnVaciar = document.getElementById("vaciar-btn");
    if (btnVaciar) {
        btnVaciar.onclick = function () {
            carrito = []; // Vaciar el array del carrito
            localStorage.removeItem("carrito"); // Eliminarlo del localStorage
            actualizarCarrito(); // Actualizar la vista del carrito
        };
    }

    actualizarCarrito();
});

// Mostrar el listado de productos seleccionados en el formulario al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    actualizarListaProductos();
});

// Al cargar la página de contacto
document.addEventListener("DOMContentLoaded", function () {
    // Recuperar el carrito del localStorage
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length > 0) {
        const listaServicios = document.getElementById("productos-seleccionados");
        if (listaServicios) {
            // Se muestra la lista actualizada
            actualizarListaProductos();
        }
    }
});

// Modal de Contacto Verif y envío de formulario vía EmailJS
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const inputs = contactForm.querySelectorAll('input');
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
        if (productosSeleccionados.children.length === 0) {
            isValid = false;
            alert("⚠️ Debes seleccionar al menos un producto antes de enviar el formulario.");
        }

        if (isValid) {
            alert("✅ Formulario enviado correctamente. Vaciando carrito...");

            // Vaciar el carrito visualmente
            const productosLista = document.getElementById("productos-lista");
            if (productosLista) {
                productosLista.innerHTML = "";
            }

            // Vaciar el carrito en el localStorage y en la variable global
            localStorage.removeItem("carrito");
            carrito = [];

            // Inicializar EmailJS
            emailjs.init("dH_2F8RtZYGMW85JB"); // Reemplaza con tu PUBLIC KEY de EmailJS

            // Obtener valores del formulario
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            // Construir una cadena con los productos seleccionados
            const productosSeleccionadosText = Array.from(productosSeleccionados.children)
                                                .map(li => li.textContent)
                                                .join(", ");

            // Enviar el formulario a través de EmailJS
            emailjs.send("service_ll9rmqj", "template_k2rb9k8", {
                name: name,
                email: email,
                phone: phone,
                productos: productosSeleccionadosText
            })
            .then(function(response) {
                console.log("SUCCESS", response);
                alert("¡Mensaje enviado con éxito!");
                contactForm.reset(); // Limpia el formulario
            }, function(error) {
                console.log("FAILED", error);
                alert("Hubo un error al enviar el mensaje.");
            });

            // Cerrar el modal de contacto, si existe
            const contactoModal = document.getElementById("contacto-modal");
            if (contactoModal) {
                contactoModal.style.display = "none";
            }
            // Finalmente, si deseas seguir con el envío por defecto (por ejemplo, redirigir) puedes hacerlo aquí
            // contactForm.submit();
        } else {
            alert("⚠️ El formulario no se ha enviado correctamente. Por favor, revisa los campos e intenta nuevamente.");
        }
    });
});

// Modal de Contacto (para abrir y cerrar modales)
document.addEventListener("DOMContentLoaded", function () {
    const carritoModal = document.getElementById("carrito-modal");
    const contactoModal = document.getElementById("contacto-modal");
    const empezarBtn = document.getElementById("btn-empezar");
    const closeCarritoBtn = document.getElementById("close-btn");
    const closeContactoBtn = document.getElementById("close-contacto-btn");
    const productosSeleccionados = document.getElementById("productos-seleccionados");
    const productosLista = document.getElementById("productos-lista");

    // Función para verificar si hay productos en el carrito
    function carritoNoEstaVacio() {
        return (productosLista && productosLista.children.length > 0);
    }

    // Función para mostrar los productos en el modal de contacto
    function mostrarProductosSeleccionados() {
        const carritoLocal = JSON.parse(localStorage.getItem("carrito")) || []; // Obtener el carrito desde localStorage
        if (productosSeleccionados) {
            productosSeleccionados.innerHTML = "";
            carritoLocal.forEach(producto => {
                const li = document.createElement("li");
                li.classList.add("list-group-item");
                li.textContent = producto.nombre; // Asume que cada producto tiene un atributo 'nombre'
                productosSeleccionados.appendChild(li);
            });
        }
    }

    // Abre el modal de carrito
    function abrirCarritoModal() {
        if (carritoModal) {
            carritoModal.style.display = "block";
        }
    }

    // Cierra el modal de carrito
    function cerrarCarritoModal() {
        if (carritoModal) {
            carritoModal.style.display = "none";
        }
    }

    // Abre el modal de contacto
    function abrirContactoModal() {
        if (contactoModal) {
            contactoModal.style.display = "block";
        }
    }

    // Cierra el modal de contacto
    function cerrarContactoModal() {
        if (contactoModal) {
            contactoModal.style.display = "none";
        }
    }

    // Mostrar modal de contacto al hacer clic en ¡Empecemos! si el carrito no está vacío
    if (empezarBtn) {
        empezarBtn.addEventListener("click", function () {
            if (!carritoNoEstaVacio()) {
                alert("⚠️ El carrito está vacío. Agrega productos antes de continuar.");
            } else {
                cerrarCarritoModal();
                abrirContactoModal();
                mostrarProductosSeleccionados(); // Mostrar productos cuando se abra el modal de contacto
            }
        });
    }

    // Cerrar el modal de carrito
    if (closeCarritoBtn) {
        closeCarritoBtn.addEventListener("click", cerrarCarritoModal);
    }

    // Cerrar el modal de contacto
    if (closeContactoBtn) {
        closeContactoBtn.addEventListener("click", cerrarContactoModal);
    }

    // Cerrar los modales si se hace clic fuera de ellos
    window.addEventListener("click", function (event) {
        if (event.target === contactoModal) {
            cerrarContactoModal();
        }
        if (event.target === carritoModal) {
            cerrarCarritoModal();
        }
    });
});
