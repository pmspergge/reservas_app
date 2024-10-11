import express from 'express';
import rutasReservas from './routes/rutasReservas.js'; 

const app = express();
const PORT = 3000;

app.use(express.json()); // Para manejar cuerpos JSON

// Usa las rutas que has definido en rutasReservas
app.use(rutasReservas);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
