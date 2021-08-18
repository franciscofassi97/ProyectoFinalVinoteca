const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const ventaSchema = mongoose.Schema(
  {
    usuario: {
      type: ObjectId,
      requiered: true,
      ref: "usuarios",
    },
    montoTotal: {
      type: Number,
      requiered: true,
    },
    isPagado: {
      type: Boolean,
      requiered: true,
      default: false,
    },
    isEntregado: {
      type: Boolean,
      requiered: true,
      default: false,
    },
    isCancelada: {
      type: Boolean,
      requiered: true,
      default: false,
    },
    direccionEnvio: {
      ciudad: {
        type: String,
        requiered: true,
      },
      direccion: {
        type: String,
        requiered: true,
      },
      numeroTelefono: {
        type: String,
        requiered: true,
      },
    },
    formaPago: {
      type: String,
      requiered: true,
    },
    items: [
      {
        producto: {
          type: ObjectId,
          requiered: true,
          ref: "productos",
        },
        cantidad: {
          type: Number,
          required: true,
        },
        nombre: {
          type: String,
          requiered: true,
        },
        precio: {
          type: Number,
          requiered: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Venta = mongoose.model("venta", ventaSchema);
module.exports = Venta;
