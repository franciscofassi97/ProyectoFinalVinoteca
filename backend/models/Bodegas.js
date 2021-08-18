const mongoose = require("mongoose");

const bodegaSchema = mongoose.Schema({
  nombreBodega: {
    type: String,
    required: true,
  },
  descripcionBodega: {
    type: String,
    requiered: true,
  },
});

const Bodegas = mongoose.model("bodegas", bodegaSchema);

module.exports = Bodegas;
