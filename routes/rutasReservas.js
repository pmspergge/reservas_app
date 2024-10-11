import express from 'express';
import { servicioReservas } from '../Services/servicios.js'; 

const router = express.Router();

// Ruta para listar reservas
router.get('/api/reservas', (req, res) => {
    const reservas = servicioReservas.listarReservas();
    res.json(reservas);
});

// Ruta para crear una nueva reserva
router.post('/api/reservas', (req, res) => {
    const { nombreCliente, cantidadDePersonas, idMesa, fecha, turno } = req.body;
    const nuevaReserva = servicioReservas.crearReserva(nombreCliente, cantidadDePersonas, idMesa, fecha, turno);
    res.status(201).json(nuevaReserva);
});

// Ruta para obtener una reserva por ID
router.get('/api/reservas/:id', (req, res) => {
    const { id } = req.params;
    const reserva = servicioReservas.obtenerReservaPorId(id);
    if (reserva) {
        res.json(reserva);
    } else {
        res.status(404).json({ error: 'Reserva no encontrada' });
    }
});

// Ruta para actualizar una reserva
router.put('/api/reservas/:id', (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    const reservaActualizada = servicioReservas.actualizarReserva(id, datosActualizados);
    if (reservaActualizada) {
        res.json(reservaActualizada);
    } else {
        res.status(404).json({ error: 'Reserva no encontrada' });
    }
});

// Ruta para eliminar una reserva
router.delete('/api/reservas/:id', (req, res) => {
    const { id } = req.params;
    const eliminado = servicioReservas.eliminarReserva(id);
    if (eliminado) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Reserva no encontrada' });
    }
});

export default router;
