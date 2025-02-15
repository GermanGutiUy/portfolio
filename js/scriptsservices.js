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