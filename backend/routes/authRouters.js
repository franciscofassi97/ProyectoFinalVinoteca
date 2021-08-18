const express = require('express');
const router = express.Router();

const {protegido} = require('../Middleware/auth');

const { registrar, 
    iniciarSesion, 
    getUsuarioById,
    actualizarUsuario,
    olvidarContrasena, 
    cambiarContraseña 
} = require('../contoller/authController');


router.post("/registrar", registrar)

// router.route("/iniciar").post(iniciarSesion);

router.post("/iniciar", iniciarSesion)

router.get('/:id', getUsuarioById)

router.put('/actualizar/:id',protegido, actualizarUsuario)

// router.route("/olvidarContrasena").post(olvidarContrasena);

// router.route("/cambiarContrasena/:resetToken").put(cambiarContraseña);

module.exports = router;

