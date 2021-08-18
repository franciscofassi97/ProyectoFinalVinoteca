const express = require("express");

const router = express.Router();

//Controller
const {
  crearComentario,
  getComentariosByIdProductos,
  actualizarComentario,
  getComentarioById,
  getTodosComentarios,
  eliminarComentario,
} = require("../contoller/comentariosController");

router.post("/crear", crearComentario);

router.get("/:id", getComentariosByIdProductos);

router.put("/:id", actualizarComentario);

router.get("/comentario/:id", getComentarioById);

router.get("/", getTodosComentarios);

router.delete("/:id", eliminarComentario);

module.exports = router;
