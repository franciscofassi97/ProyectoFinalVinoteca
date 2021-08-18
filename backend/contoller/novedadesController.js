const Novedades = require("../models/Novedades");

//Manejo de imagenes
const cloudinary = require("../utils/cloudinary");

const createNovedad = async (req, res) => {
  try {
    const resultadoCouldinary = await cloudinary.uploader.upload(req.file.path);

    const novedad = new Novedades({
      descripcion: req.body.descripcion,
      imagenUrl: resultadoCouldinary.secure_url,
      cloudinaryId: resultadoCouldinary.public_id,
    });

    const newNovedad = await novedad.save();

    res.json({ message: "Se creo una novedad con exito", data: newNovedad });
  } catch (error) {
    return res.status(400).json({
      error: "No es posible crear una novedad nueva",
      message: `El error es : ${error}`,
    });
  }
};
const eliminarNovedad = async (req, res) => {
  try {
    let novedad = await Novedades.findById(req.params.id);

    const elimarImagen = await cloudinary.uploader.destroy(
      novedad.cloudinaryId
    );

    const eliminarNovedad = await novedad.remove();
    res.json({
      message: "Se elimino la novedad con exito",
      data: eliminarNovedad,
    });
  } catch (error) {
    return res.status(400).json({
      error: "No es posible Elimar La novedad",
      message: `El error es : ${error}`,
    });
  }
};

const getTodosNovedades = async (req, res) => {
  try {
    const novedades = await Novedades.find({});
    res.json(novedades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor" });
  }
};

module.exports = {
  createNovedad,
  eliminarNovedad,
  getTodosNovedades,
};
