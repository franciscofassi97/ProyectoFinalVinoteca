const TipoVino = require("../models/TipoVino");

const crearTipoVIno = async (req, res) => {
  const tipoVino = new TipoVino({
    nombreTipo: req.body.nombreTipo,
    descripcionTipo: req.body.descripcionTipo
  });
  try {
    const newTipoVino = await tipoVino.save();
    res.json({ message: "Se creo el tipo con exito", data: newTipoVino });
  } catch (error) {
    return res.status(400).json({
      error: "No es posible crear un tipo nuevo",
      message: `El error es : ${error}`,
    });
  }
};

const getTodosTiposVinos = async (req, res) => {
  try {
    const tipoVino = await TipoVino.find({});
    res.json(tipoVino);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor" });
  }
};

module.exports = {
  crearTipoVIno,
  getTodosTiposVinos,
};
