
// Cargar el archivo JSON con los servicios
// Cargar el archivo JSON con los servicios
fetch('../productos.json')
  .then(response => {
    console.log('Response:', response);
    return response.json();
  })
  .then(productos => {
    console.log('Productos:', productos);  // Verifica los datos recibidos
    const container = document.querySelector('#servicios-container');  // Cambié 'servicios-container' por '#servicios-container'
    
    productos.forEach(producto => {
      const productCard = `
        <div class="col-lg-11 col-xl-9 col-xxl-8">
          <div class="card overflow-hidden shadow rounded-4 border-0 mb-5">
            <div class="card-body p-0">
              <div class="d-flex align-items-center">
                <div class="p-5">
                  <h2 class="fw-bolder">${producto.nombre}</h2>
                  <p>${producto.descripcion}</p>
                  <button class="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder" data-servicio="${producto.nombre}" id="${producto.id}">¡Empecemos!</button>
                </div>
                <img class="img-fluid" src="${producto.imagen}" alt="Imagen de ${producto.nombre}" />
              </div>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += productCard;
    });
  })
  .catch(error => console.error('Error al cargar los productos:', error));






/*
document.addEventListener("DOMContentLoaded", function () {
    let serviciosSeleccionados = JSON.parse(localStorage.getItem("servicios")) || []; // Cargar desde localStorage

    function actualizarUI() {
        localStorage.setItem("servicios", JSON.stringify(serviciosSeleccionados));
        const listaServicios = document.getElementById("listaServicios");
        if (listaServicios) {
            listaServicios.innerHTML = "";
            serviciosSeleccionados.forEach(servicio => {
                let item = document.createElement("li");
                item.textContent = servicio;
                item.classList.add("list-group-item");
                listaServicios.appendChild(item);
            });
        }
    }

    function manejarServicio(servicio) {
        console.log(`Se hizo clic en el servicio: ${servicio}`);
        const index = serviciosSeleccionados.indexOf(servicio);
        
        if (index === -1) {
            serviciosSeleccionados.push(servicio);
            alert(`✅ El servicio de ${servicio} ha sido agregado.`);
        } else {
            serviciosSeleccionados.splice(index, 1);
            alert(`❌ El servicio de ${servicio} ha sido eliminado.`);
        }
        actualizarUI();
    }

    document.querySelectorAll("button[data-servicio]").forEach(boton => {
        boton.addEventListener("click", function () {
            const servicio = boton.getAttribute("data-servicio");
            manejarServicio(servicio);
        });
    });

    document.getElementById("btnFinalizar").addEventListener("click", function () {
        if (serviciosSeleccionados.length === 0) {
            alert("⚠️ No has seleccionado ningún servicio.");
            return;
        }

        let nombreUsuario = prompt("¡Gracias por elegir nuestros servicios! ¿Cuál es tu nombre?");
        if (!nombreUsuario) {
            alert("Por favor, ingresa tu nombre para continuar.");
            return;
        }

        let confirmar = confirm(`¿Estás seguro de que quieres contratar los servicios seleccionados?\n${serviciosSeleccionados.join(", ")}`);
        if (confirmar) {
            alert(`🎉 ¡Gracias, ${nombreUsuario}! Nos pondremos en contacto contigo pronto.`);
            localStorage.removeItem("servicios");
            serviciosSeleccionados = [];
            actualizarUI();
        } else {
            alert("No hay problema, puedes seguir explorando.");
        }
    });

    actualizarUI();
});
 */