// Controlador que pide los datos al servicio REST

// Función para listar las reservas y mostrarlas en el HTML
export async function listarReservas() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/reservas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al listar las reservas");
    }

    const data = await response.json();
    let parrafo = document.querySelector("#listado");
    parrafo.innerHTML = "";

    if (data.length === 0) {
      parrafo.innerHTML = "No hay reservas disponibles.";
    } else {
      data.forEach(
        ({ _id, nombreCliente, cantidadDePersonas, idMesa, fecha, turno }) => {
          parrafo.innerHTML += `
          <div class="reserva-item">
            <strong>Reserva ID:</strong> ${_id} <br>
            <strong>Nombre del Cliente:</strong> ${nombreCliente} <br>
            <strong>Cantidad de Personas:</strong> ${cantidadDePersonas} <br>
            <strong>Mesa:</strong> ${idMesa} <br>
            <strong>Fecha:</strong> ${new Date(fecha).toLocaleDateString()} <br>
            <strong>Turno:</strong> ${turno} <br><br>
          </div>
        `;
        }
      );
    }
  } catch (error) {
    alert("Error al listar las reservas: " + error.message);
  }
}

export async function crearReserva(
  nombreCliente,
  cantidadDePersonas,
  idMesa,
  fecha,
  turno
) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombreCliente,
        cantidadDePersonas,
        idMesa,
        fecha,
        turno,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al crear la reserva");
    }

    alert("Su reserva se ha realizado exitosamente");
    listarReservas();
  } catch (error) {
    alert("Error al crear la reserva: " + error.message);
  }
}

document
  .querySelector("#btnCrearReserva")
  .addEventListener("click", async () => {
    let nombreCliente = document.querySelector("#nombreCliente").value;
    let cantidadDePersonas = document.querySelector(
      "#cantidadDePersonas"
    ).value;
    let fecha = document.querySelector("#fecha").value;
    let turno = document.querySelector("#turno").value;

    if (!nombreCliente || !cantidadDePersonas || !fecha || !turno) {
      alert("Complete todos los campos requeridos.");
      return;
    }

    await crearReserva(
      nombreCliente,
      cantidadDePersonas,
      "mesa1",
      fecha,
      turno
    );
  });

document.addEventListener("DOMContentLoaded", () => {
  listarReservas();
});

function cerrarSesion() {
  localStorage.removeItem("token");
  window.location.href = "/";
}
document
  .getElementById("btnCerrarSesion")
  .addEventListener("click", cerrarSesion);
