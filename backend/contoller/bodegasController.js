const Bodegas = require("../models/Bodegas");

const crearBodega = async (req, res) => {
  const bodega = new Bodegas({
    nombreBodega: req.body.nombreBodega,
    descripcionBodega: req.body.descripcionBodega,
  });
  try {
    const newBodega = await bodega.save();
    res.json({ message: "Se creo el tipo con exito", data: newBodega });
  } catch (error) {
    return res.status(400).json({
      error: "No es posible crear un tipo nuevo",
      message: `El error es : ${error}`,
    });
  }
};

const getTodosBodegas = async (req, res) => {
  try {
    const bodega = await Bodegas.find({});
    res.json(bodega);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor" });
  }
};

module.exports = {
  crearBodega,
  getTodosBodegas,
};
