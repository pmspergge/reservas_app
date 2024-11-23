const express = require('express');
const router = express.Router();
const path = require("path");
//

const verifyToken = require('../middleware/usuarioMiddleware');
// // Protected route
// router.get('/principal', verifyToken, (req, res) => {
//     res.sendFile(path.join(path.resolve(), "views", "index.html"));
// });

// //

// Ruta ir a index

  router.get("/principal", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views", "index.html"));
  });

  router.get("/usuarios", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views", "usuarios.html"));
  });

module.exports = router;