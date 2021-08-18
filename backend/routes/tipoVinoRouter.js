const express = require("express");
const router = express.Router();

//Controller
const {
  crearTipoVIno,
  getTodosTiposVinos,
} = require("../contoller/tipoVinoController");

router.get("/", getTodosTiposVinos);

router.post("/crear", crearTipoVIno);

module.exports = router;