import fs from 'fs';
import path from 'path';
import { Reserva } from '../models/claseReserva.js';


/*const mesa1 = new Mesa (1, 2);
console.log(mesa1)

const mesas = []
mesas.push(new Mesa(1,2))
mesas.push(new Mesa(2,4))
mesas.push(new Mesa(3,6))
mesas.push(new Mesa(4,8))

mesas.forEach(mesa =>{console.log(mesa.id + "," + mesa.cantidadDePersonas)})

const reservas = []*/
// reservas.push(new Reserva("NIDIA",2,1,"14 de octubre","noche"))
// reservas.push(new Reserva("Jose",4,2,"3demayo","mediodía"))

// reservas.forEach(reserva => {console.log("nombre cliente: "+reserva.nombreCliente + " cantidad de personas:" 
//+ reserva.cantidadDePersonas + " número de mesa: "+   reserva.idMesa + " fecha: "+  reserva.fecha )})


// Definir la ruta del archivo JSON
const __filename = new URL(import.meta.url).pathname; // Obtiene la ruta del archivo actual
const __dirname = path.dirname(__filename); // Obtiene el directorio del archivo actual
const dataPath = 'C:\\Users\\molivieri_ceibustech\\Desktop\\Varios 3\\backend\\reservas_app\\data\\db.json';

// Verifica la ruta antes de intentar leer el archivo
console.log('Ruta del archivo de datos:', dataPath);

// Leer el archivo JSON
const leerReservas = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo el archivo:', error);
        return [];
    }
};

// Guardar en el archivo JSON
const guardarReservas = (reservas) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(reservas, null, 2), 'utf-8'); // Escribe el array de reservas en el archivo
    } catch (error) {
        console.error('Error guardando el archivo:', error); // Maneja el error si ocurre
    }
};

// Función para crear una reserva
const crearReserva = (nombreCliente, cantidadDePersonas, idMesa, fecha, turno) => {
    console.log('Ruta del archivo de datos:', dataPath);
    const reservas = leerReservas(); // Lee las reservas actuales
    const nuevaReserva = new Reserva(nombreCliente, cantidadDePersonas, idMesa, fecha, turno); // Crea una nueva reserva
    reservas.push(nuevaReserva); // Agrega la nueva reserva al array
    guardarReservas(reservas); // Guarda el array actualizado en el archivo JSON
    return nuevaReserva; // Retorna la nueva reserva
};


// Función para listar reservas
const listarReservas = () => {
    return leerReservas();
};

// Función para obtener una reserva por ID
const obtenerReservaPorId = (id) => {
    const reservas = leerReservas();  // Lee las reservas del archivo JSON
    return reservas.find(reserva => reserva.id === id);  // Busca por id (string)
};

// Función para actualizar una reserva
const actualizarReserva = (id, datosActualizados) => {
    const reservas = leerReservas();  // Lee las reservas actuales del archivo JSON
    const index = reservas.findIndex(reserva => reserva.id === id);  // Busca por id (string)
    if (index !== -1) {
        reservas[index] = { ...reservas[index], ...datosActualizados };  // Actualiza los datos
        guardarReservas(reservas);  // Guarda las reservas actualizadas
        return reservas[index];  // Retorna la reserva actualizada
    }
    return null;  // Indica que no se encontró la reserva
};


const eliminarReserva = (id) => {
    const reservas = leerReservas();  // Carga todas las reservas
    const nuevasReservas = reservas.filter(reserva => reserva.id !== id);  // Compara como string
    if (reservas.length !== nuevasReservas.length) {
        guardarReservas(nuevasReservas);  // Guarda la lista actualizada
        return true;  // Se eliminó
    }
    return false;  // No se encontró
};

export const servicioReservas = {
    crearReserva,
    listarReservas,
    obtenerReservaPorId,
    actualizarReserva,
    eliminarReserva,
};
