const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const comentarioSchema = mongoose.Schema(
  {
    comentario: {
      type: String,
      required: true,
    },
    idUsuario: {
      type: ObjectId,
      ref: "usuarios",
      required: true,
    },
    idProducto: {
      type: ObjectId,
      ref: "productos",
      required: true,
    },
  },
  { timestamps: true }
);

const Bodegas = mongoose.model("comentarios", comentarioSchema);

module.exports = Bodegas;
