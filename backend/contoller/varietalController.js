const Varietal = require("../models/Varietal");

const crearVarietal = async (req, res) => {
  const varietal = new Varietal({
    nombreVarietal: req.body.nombreVarietal,
    descripcionVarietal: req.body.descripcionVarietal,
  });
  try {
    const newVarietal = await varietal.save();
    res.json({ message: "Se creo el varietal con exito", data: newVarietal });
  } catch (error) {
    return res.status(400).json({
      error: "No es posible crear un varietal nuevo",
      message: `El error es : ${error}`,
    });
  }
};

const getTodosVarietal = async (req, res) => {
  try {
    const varietal = await Varietal.find({});
    res.json(varietal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor" });
  }
};

module.exports = {
  crearVarietal,
  getTodosVarietal,
};
