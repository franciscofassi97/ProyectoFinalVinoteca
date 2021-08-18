const Usuario = require("../models/Usuarios");

const registrar = async (req, res, next) => {
  const { nombre, email, contrasena, isAdmin } = req.body;

  try {
    let usuario = await Usuario.findOne({ email: req.body.email });
    if (usuario) {
      return res.status(500).json({ error: "el correo ya existe" });
    }
    usuario = new Usuario({
      nombre,
      email,
      contrasena,
      isAdmin,
    });

    await usuario.save();
    res.send(enviarToken(usuario, 201, res));
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const iniciarSesion = async (req, res, next) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    res.status(400).json({
      success: flase,
      error: "Por favor ingrese correo y constrasena",
    });
  }
  try {
    // let usuario = await Usuario.findOne({ email: req.body.email})
    // if(!usuario){
    //     return res.status(500).json({error: "Correo o contraseña invalido"})
    // }

    const usuario = await Usuario.findOne({ email }).select("+contrasena");

    if (!usuario) {
      return next(
        res.status(401).json({
          success: false,
          error: "Correo o contraseña incorrectos",
        })
      );
    }

    const isMatch = await usuario.matchContrasena(contrasena);

    if (!isMatch) {
      return next(
        res.status(401).json({
          success: false,
          error: "Correo o contraseña incorrectos",
        })
      );
    }

    enviarToken(usuario, 200, res);
  } catch (error) {
    next(error);
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor" });
  }
};

const actualizarUsuario = async (req, res, next) => {
  const { nombre, email, direccion, telefono } = req.body;
  // variable let no esta en uso  de momento
  let updateUsuario = {
    nombre: req.body.nombre,
    email: req.body.email,
  };
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(usuario);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.olvidarContrasena = (req, res, next) => {
  res.send("Olvide mi contraseña");
};

exports.cambiarContraseña = (req, res, next) => {
  res.send("Cambiar contraseña");
};

const enviarToken = (usuario, statusCode, res) => {
  const token = usuario.getSignedToken();

  const usuarioData = {
    id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    isAdmin: usuario.isAdmin,
  };
  res
    .status(statusCode)
    .send({ status: "success", token, usuario: usuarioData });
};

module.exports = {
  registrar,
  iniciarSesion,
  getUsuarioById,
  actualizarUsuario,
};
