const mongoose = require("mongoose");

const NovedadesSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
  },
  imagenUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
    // required: true,
  },
});

const Novedades = mongoose.model("novedades", NovedadesSchema);

module.exports = Novedades;
