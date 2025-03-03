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
                <img class="img-fluid" src="${producto.imagen}" alt="Imagen de ${producto.nombre}" />
              </div>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += productCard;
    });

    // Obtener el carrito desde localStorage
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

    // Asegurar que la lista de productos aparezca correctamente al abrir el modal
    document.getElementById("btn-empezar").addEventListener("click", function () {
        actualizarListaProductos(); // Actualiza la lista de productos antes de mostrar el modal
    });

    // Función para actualizar el carrito en el almacenamiento local y en la vista
    function actualizarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));

        const listaProductos = document.getElementById("productos-lista");
        if (!listaProductos) return; // Evitar errores si el elemento no existe
        
        listaProductos.innerHTML = ""; // Limpiar la lista antes de agregar los productos

        carrito.forEach(producto => {
            let item = document.createElement("li");
            item.textContent = producto.nombre; // Solo el nombre del servicio
            listaProductos.appendChild(item);
        });

        // También actualizamos la vista de productos seleccionados en el formulario
        actualizarListaProductos();
    }

    // Función para agregar productos al carrito
    function manejarProducto(producto) {
        // Evitar duplicados
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

    // Actualizar carrito al cargar la página
    actualizarCarrito();
});

// Mostrar el listado de productos seleccionados en el formulario al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarListaProductos();
});

// Al cargar la página de contacto
document.addEventListener("DOMContentLoaded", function () {
    // Recuperar el carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        const listaServicios = document.getElementById("productos-seleccionados");
        if (!listaServicios) return;

        carrito.forEach(producto => {
            let item = document.createElement("li");
            item.textContent = producto.nombre;
            item.classList.add("list-group-item");
            listaServicios.appendChild(item);
        });
    }
});

// Modal de Contacto Verif
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario para validar primero

    const form = event.target;
    const inputs = form.querySelectorAll('input');
    const productosSeleccionados = document.getElementById("productos-seleccionados");

    let isValid = true;

    // Validar los campos del formulario (nombre, email, teléfono)
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
            input.classList.add('is-invalid'); // Agregar la clase para mostrar el error
        } else {
            input.classList.remove('is-invalid'); // Remover la clase si es válido
        }
    });

    // Verificar si hay productos seleccionados
    if (productosSeleccionados.children.length === 0) {
        isValid = false;
        alert("⚠️ Debes seleccionar al menos un producto antes de enviar el formulario.");
    }

    // Si todo es válido, enviar el formulario
    if (isValid) {
        form.submit();
    }
});
// Modal de Contacto
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario para validar primero

    const form = event.target;
    const inputs = form.querySelectorAll('input');
    const productosSeleccionados = document.getElementById("productos-seleccionados");

    let isValid = true;

    // Validar los campos del formulario (nombre, email, teléfono)
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
            input.classList.add('is-invalid'); // Agregar la clase para mostrar el error
        } else {
            input.classList.remove('is-invalid'); // Remover la clase si es válido
        }
    });

    // Validar que el email tenga el formato correcto (ya está parcialmente validado por HTML, pero vamos a agregar más control)
    const email = document.getElementById("email").value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        document.getElementById("email").classList.add('is-invalid');
    }

    // Verificar si hay productos seleccionados
    if (productosSeleccionados.children.length === 0) {
        isValid = false;
        alert("⚠️ Debes seleccionar al menos un producto antes de enviar el formulario.");
    }

    // Si todo es válido, enviar el formulario y vaciar el carrito
    if (isValid) {
        form.submit();
        vaciarCarrito(); // Llamar a la función para vaciar el carrito
    }
});

// Vaciar carrito después de enviar el formulario
function vaciarCarrito() {
    alert("✅ Formulario enviado correctamente. Vaciando carrito...");

    // Vaciar visualmente el carrito
    const productosLista = document.getElementById("productos-lista");
    productosLista.innerHTML = ""; 

    // Vaciar el carrito en el localStorage
    localStorage.removeItem("carrito");

    // También vaciar el carrito en la variable global
    let carrito = [];
}
// Modal de Contacto