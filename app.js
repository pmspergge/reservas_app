import express from "express";
import mongoose from "mongoose";
import rutasReservas from "./routes/rutasReservas.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const app = express();
const PORT = 3000;

// Conectar a MongoDB utilizando la URI del archivo .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a la base de datos MongoDB"))
  .catch((error) => console.error("Error conectando a MongoDB:", error));

// Middleware para parsear JSON
app.use(express.json());

app.use("/public", express.static(path.join(path.resolve(), "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "views", "index.html"));
});

app.use(rutasReservas);

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
