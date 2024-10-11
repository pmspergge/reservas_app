//tiene la función de pedirle los datos a servicios.js
import { servicioReservas } from "./servicios.js";

    servicioReservas.listarReservas().then((data) => {
    data.forEach(({id, nombreCliente, cantidadDePersonas, idMesa, fecha, turno}) => {
    let parrafo = document.querySelector("#listado")
    parrafo.innerHTML += id +"," + nombreCliente + "," +  cantidadDePersonas + "," +  idMesa + "," +  fecha + "," + turno + "<br>"
});
}).catch((error) => alert("Error en la operación"));