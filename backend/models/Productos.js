const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productosSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    contendioNeto: {
      type: Number,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    imagenUrl: {
      type: String,
    },
    cloudinaryId: {
      type: String,
      // required: true,
    },
    tipoVino: {
      type: ObjectId,
      ref: "tipoVino",
      required: true,
    },
    varietal: {
      type: ObjectId,
      ref: "varietal",
      required: true,
    },
    bodega: {
      type: ObjectId,
      ref: "bodegas",
      required: true,
    },
    isOferta: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Productos = mongoose.model("productos", productosSchema);

module.exports = Productos;
