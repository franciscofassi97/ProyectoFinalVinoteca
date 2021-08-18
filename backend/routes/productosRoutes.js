const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");
//Permiso Autentificacion isAdmin
const { getAcceso } = require("../contoller/acceso");
const { protegido, isAdmin } = require("../Middleware/auth");

//Controller
const {
  createProducto,
  eliminarProducto,
  actualizarProducto,
  getTodosProductos,
  getProductoById,
} = require("../contoller/productosController");

router.get("/:id", getProductoById);

router.put("/actualizar/:id", upload.single("imagenUrl"), actualizarProducto);

router.get("/", getTodosProductos);

router.post("/crear", upload.single("imagenUrl"), createProducto);

router.delete("/eliminar/:id", eliminarProducto);

module.exports = router;
