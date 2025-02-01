document.addEventListener("DOMContentLoaded", function() {
  let serviciosSeleccionados = []; // Array para almacenar los servicios seleccionados

  // Función que maneja agregar o eliminar servicios
  function manejarServicio(servicio) {
      console.log(`Se hizo clic en el servicio: ${servicio}`); // Verificar si la función se llama correctamente
      const index = serviciosSeleccionados.indexOf(servicio);
      
      if (index === -1) {
          // Si el servicio no está en el array, lo agrega
          serviciosSeleccionados.push(servicio);
          alert("El servicio de " + servicio + " ha sido agregado.");
      } else {
          // Si el servicio ya está, lo elimina
          serviciosSeleccionados.splice(index, 1);
          alert("El servicio de " + servicio + " ha sido eliminado.");
      }

      // Mostrar los servicios seleccionados en consola
      console.log("Servicios seleccionados: ", serviciosSeleccionados);

      // Usamos un prompt para que el usuario ingrese su nombre
      let nombreUsuario = prompt("¡Gracias por elegir el servicio de " + servicio + "! ¿Cuál es tu nombre?");
      
      // Condicional para verificar que el nombre no esté vacío
      if (nombreUsuario) {
          // Usamos confirm para preguntar si desea continuar con el servicio
          let confirmar = confirm("¿Estás seguro de que quieres contratar el servicio de " + servicio + "?");
          
          // Si el usuario confirma
          if (confirmar) {
              console.log("El usuario " + nombreUsuario + " ha contratado el servicio de " + servicio);
              alert("¡Gracias, " + nombreUsuario + "! Has contratado el servicio de " + servicio + ". Te contactaremos pronto.");
          } else {
              console.log("El usuario " + nombreUsuario + " decidió no contratar el servicio de " + servicio);
              alert("¡Hasta luego, " + nombreUsuario + "! Esperamos verte pronto.");
          }
      } else {
          alert("Por favor, ingresa tu nombre para continuar.");
      }
  }

  // Asignar los eventos de clic a los botones
  document.getElementById("btnDesarrolloWeb").addEventListener("click", function() {
      manejarServicio("Desarrollo Web");
  });
  
  document.getElementById("btnAnalisisDatos").addEventListener("click", function() {
      manejarServicio("Análisis de Datos");
  });

  document.getElementById("btnAutomatizacion").addEventListener("click", function() {
      manejarServicio("Automatización de Procesos");
  });

  document.getElementById("btnPowerBi").addEventListener("click", function() {
      manejarServicio("Desarrollo Power Bi");
  });
});
