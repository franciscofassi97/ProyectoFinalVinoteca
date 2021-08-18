const express = require("express");
const router = express.Router();

//Controller
const {
  crearVarietal,
  getTodosVarietal,
} = require("../contoller/varietalController");

router.get("/", getTodosVarietal);

router.post("/crear", crearVarietal);

module.exports = router;
