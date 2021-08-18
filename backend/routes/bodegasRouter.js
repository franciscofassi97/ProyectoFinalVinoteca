const express = require("express");
const router = express.Router();

//Controller
const {
  crearBodega,
  getTodosBodegas,
} = require("../contoller/bodegasController");

router.get("/", getTodosBodegas);

router.post("/crear", crearBodega);

module.exports = router;
