const mongoose = require("mongoose");

const varitalSchema = mongoose.Schema({
  nombreVarietal: {
    type: String,
    required: true,
  },
  descripcionVarietal: {
    type: String,
    requiered: true,
  },
});

const Varietal = mongoose.model("varietal", varitalSchema);

module.exports = Varietal;
