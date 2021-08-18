const Comentarios = require("../models/Comentarios");
const mongoose = require("mongoose");

const crearComentario = async (req, res) => {
  const comentario = new Comentarios({
    comentario: req.body.comentario,
    idProducto: req.body.idProducto,
    idUsuario: req.body.idUsuario,
  });
  try {
    //Modificar
    const newComentario = await comentario.save();
    res.json({ message: "Se creo el tipo con exito", data: newComentario });
  } catch (error) {
    return res.status(400).json({
      error: "No es posible crear un tipo nuevo",
      message: `El error es : ${error}`,
    });
  }
};

const getComentariosByIdProductos = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);

    const comentarios = await Comentarios.aggregate([
      { $match: { idProducto: id } },
      {
        $lookup: {
          from: "usuarios",
          localField: "idUsuario",
          foreignField: "_id",
          as: "Usuarios",
        },
      },
      { $unwind: "$Usuarios" },
      {
        $lookup: {
          from: "productos",
          localField: "idProducto",
          foreignField: "_id",
          as: "Productos",
        },
      },
      { $unwind: "$Productos" },

      {
        $project: {
          _id: 1,
          comentario: 1,
          usuario: "$Usuarios.email",
          idUsuario: "$Usuarios._id",
          idProducto: "$Productos._id",
          fechaComentario: {
            $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
          },
        },
      },
      { $sort: { fechaComentario: -1 } },
    ]);

    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor" });
  }
};

const actualizarComentario = async (req, res, next) => {
  try {
    let comentario = await Comentarios.findById(req.params.id);

    const comentarioActualizar = {
      comentario: req.body.comentario || comentario.comentario,
      idProducto: comentario.idProducto,
      idUsuario: comentario.idUsuario,
    };
    comentario = await Comentarios.findByIdAndUpdate(
      req.params.id,
      comentarioActualizar,
      {
        new: true,
      }
    );
    res.json({
      message: "Se Actualizo el comentario con exito",
      data: comentario,
    });
  } catch (err) {
    res.status(400).json({
      error: "No es posible Actulizar el comentario",
      message: `El error es : ${error}`,
    });
    console.log(err);
    next();
  }
};
const getComentarioById = async (req, res) => {
  try {
    idComentario = mongoose.Types.ObjectId(req.params.id);

    const comentario = await Comentarios.findById(idComentario);
    res.json(comentario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor" });
  }
};

const getTodosComentarios = async (req, res) => {
  try {
    const comentarios = await Comentarios.aggregate([
      {
        $lookup: {
          from: "usuarios",
          localField: "idUsuario",
          foreignField: "_id",
          as: "Usuarios",
        },
      },
      { $unwind: "$Usuarios" },
      {
        $lookup: {
          from: "productos",
          localField: "idProducto",
          foreignField: "_id",
          as: "Productos",
        },
      },
      { $unwind: "$Productos" },
      {
        $project: {
          _id: 1,
          comentario: 1,
          usuario: "$Usuarios.email",
          idUsuario: "$Usuarios._id",
          idProducto: "$Productos._id",
          fechaComentario: {
            $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
          },
        },
      },
      { $sort: { fechaComentario: -1 } },
    ]);

    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor" });
  }
};

const eliminarComentario = async (req, res) => {
  try {
    let comentario = await Comentarios.findById(req.params.id);

    const elimarComentario = await comentario.remove();
    res.json({
      message: "Se elimino el comentario con exito",
      data: elimarComentario,
    });
  } catch (error) {
    return res.status(400).json({
      error: "No es posible Elimar el comentario",
      message: `El error es : ${error}`,
    });
  }
};

module.exports = {
  crearComentario,
  getComentariosByIdProductos,
  actualizarComentario,
  getComentarioById,
  getTodosComentarios,
  eliminarComentario,
};
