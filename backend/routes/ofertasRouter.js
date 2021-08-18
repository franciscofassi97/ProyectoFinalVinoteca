const express = require("express");
const router = express.Router();

//Controllet
const {
  createOferta,
  eliminarOferta,
  getOfertas,
  getPrecioOferta,
  getTodasLasOfertas,
} = require("../contoller/ofertasController");

router.post("/crear", createOferta);

router.delete("/:id", eliminarOferta);

router.get("/:idProducto", getPrecioOferta);

router.get("/gestion/lista", getTodasLasOfertas);

router.get("/", getOfertas);

module.exports = router;
