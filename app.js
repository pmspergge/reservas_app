/*import express from "express";
import mongoose from "mongoose";
import rutasReservas from "./routes/rutasReservas.js";
import dotenv from "dotenv";
import path from "path";*/
const express = require("express");
const mongoose = require("mongoose");
const rutasReservas = require("./routes/rutasReservas.js");
const dotenv = require("dotenv");
const path = require("path");


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
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
      console.log("Servidor corriendo en puerto 3000");
  });
}

//pruebas
app.post('/api/reservas', (req, res) => {
  const {nombreCliente, cantidadDePersonas, fecha, turno} =req.body;
  const _id ="abc"; 
  res.status(201).json({
    nombreCliente,
    cantidadDePersonas,
    fecha,
    turno,
    _id
  })
 });

module.exports = app;
