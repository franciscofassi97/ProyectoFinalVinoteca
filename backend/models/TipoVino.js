const mongoose = require("mongoose");

const tipoVinoSchema = mongoose.Schema({
  nombreTipo: {
    type: String,
    required: true,
  },
  descripcionTipo: {
    type: String,
    requiered: true,
  },
});

const TipoVino = mongoose.model("tipoVino", tipoVinoSchema);

module.exports = TipoVino;
