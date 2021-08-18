const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");
//Permiso Autentificacion isAdmin
const { getAcceso } = require("../contoller/acceso");
const { protegido, isAdmin } = require("../Middleware/auth");
//Controller
const {
  createNovedad,
  eliminarNovedad,
  getTodosNovedades,
} = require("../contoller/novedadesController");

router.post("/crear", upload.single("imagenUrl"), createNovedad);

router.delete("/eliminar/:id", eliminarNovedad);

router.get("/", getTodosNovedades);

module.exports = router;
