// Cargar el archivo JSON con los productos
fetch('../productos.json')
  .then(response => response.json())
  .then(productos => {
    const container = document.querySelector('#servicios-container'); // Contenedor para los productos
    
    productos.forEach(producto => {
      const productCard = `
        <div class="col-lg-11 col-xl-9 col-xxl-8">
          <div class="card overflow-hidden shadow rounded-4 border-0 mb-5">
            <div class="card-body p-0">
              <div class="d-flex align-items-center">
                <div class="p-5">
                  <h2 class="fw-bolder">${producto.nombre}</h2>
                  <p>${producto.descripcion}</p>
                  <button class="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder" data-producto="${producto.nombre}" data-id="${producto.id}" data-precio="${producto.precio}">Añadir al Carrito</button>
                </div>
                <img class="img-fluid" src="${producto.imagen}" alt="Imagen de ${producto.nombre}" />
              </div>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += productCard;
    });

    // Lógica para manejar el carrito
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function actualizarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));

        const listaProductos = document.getElementById("productos-lista");
        const totalElement = document.getElementById("total");
        listaProductos.innerHTML = "";
        
        let total = 0;

        carrito.forEach(producto => {
            let item = document.createElement("li");
            item.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
            listaProductos.appendChild(item);
            total += producto.precio * producto.cantidad;
        });

        totalElement.innerHTML = `<p>Total: $${total}</p>`;
    }

    // Función para agregar o eliminar productos del carrito
    function manejarProducto(producto) {
        const index = carrito.findIndex(item => item.id === producto.id);

        if (index === -1) {
            producto.cantidad = 1;
            carrito.push(producto);
            alert(`✅ El producto ${producto.nombre} ha sido añadido al carrito.`);
        } else {
            carrito[index].cantidad++;
            alert(`✅ El producto ${producto.nombre} ha sido agregado. Cantidad: ${carrito[index].cantidad}`);
        }

        actualizarCarrito();
    }

    // Asociar los eventos de los botones de "Añadir al Carrito"
    document.querySelectorAll("button[data-producto]").forEach(boton => {
        boton.addEventListener("click", function () {
            const producto = {
                id: boton.getAttribute("data-id"),
                nombre: boton.getAttribute("data-producto"),
                precio: parseFloat(boton.getAttribute("data-precio")),
            };
            manejarProducto(producto);
        });
    });

    // Mostrar el carrito en un modal
    const modal = document.getElementById("carrito-modal");
    const btnCarrito = document.getElementById("carrito-btn");
    const closeBtn = document.getElementById("close-btn");

    btnCarrito.onclick = function() {
        modal.style.display = "block";
        actualizarCarrito();
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Actualizar carrito al cargar la página
    actualizarCarrito();
});
