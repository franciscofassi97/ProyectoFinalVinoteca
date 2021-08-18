require("dotenv").config();
const mongoose = require("mongoose");

const conexionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado con la base de datos");
  } catch (error) {
    console.log("Fallo en la coneccion con MongoDB");
    process.exit(1);
  }
};

module.exports = { conexionDB };
