const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const ofertaSchema = new mongoose.Schema({
  producto: {
    idProducto: {
      type: ObjectId,
      ref: "productos",
      required: true,
      unique: true,
    },
    precio: {
      type: Number,
      required: true,
    },
  },
  descuento: {
    type: Number,
    // required: true,
  },
  precioDescuento: {
    type: Number,
    // required: true,
  },
  fechaInicio: {
    type: Date,
    default: Date.now(),
  },
  fechaFin: {
    type: Date,
    // required: true,
  },
});

ofertaSchema.pre("save", async function (next) {
  if (this.descuento) {
    let descuento = this.descuento;
    let precioSinDescuento = this.producto.precio;

    let precioDescuento =
      precioSinDescuento - precioSinDescuento * (descuento / 100).toFixed(2);

    this.precioDescuento = precioDescuento;

    next();
  } else if (this.precioDescuento) {
    let precioSinDescuento = this.producto.precio;
    let precioConDescuento = this.precioDescuento;

    let descuento =
      ((precioSinDescuento - precioConDescuento) / precioSinDescuento).toFixed(
        2
      ) * 100;

    this.descuento = descuento;

    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.contrasena = await bcrypt.hash(this.contrasena, salt);
  next();
});

const Ofertas = mongoose.model("ofertas", ofertaSchema);

module.exports = Ofertas;
