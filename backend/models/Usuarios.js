const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Por favor elija un nombre"],
  },
  email: {
    type: String,
    required: [true, "Por favor ingrese un correo"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Por favor ingrese un correo valido",
    ],
  },
  contrasena: {
    type: String,
    required: [true, "Ingrese una constraseña"],
    select: false, //no devulve la contraseña
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  reiniciarContrasenaToken: String,
  reiniciarContrasenaExpirada: Date,
});

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("contrasena")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.contrasena = await bcrypt.hash(this.contrasena, salt);
  next();
});

usuarioSchema.methods.matchContrasena = async function (contrasena) {
  return await bcrypt.compare(contrasena, this.contrasena);
};

usuarioSchema.methods.getSignedToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      nombre: this.nombre,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

const Usuario = mongoose.model("usuarios", usuarioSchema);

module.exports = Usuario;
