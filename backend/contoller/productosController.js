const Productos = require("../models/Productos");
const mongoose = require("mongoose");
//Manejo de imagenes
const cloudinary = require("../utils/cloudinary");

const getTodosProductos = async (req, res) => {
  try {
    const productos = await Productos.aggregate([
      { $match: { isOferta: false } },
      {
        $lookup: {
          from: "bodegas",
          localField: "bodega",
          foreignField: "_id",
          as: "Bodega",
        },
      },
      { $unwind: "$Bodega" },
      {
        $lookup: {
          from: "varietals",
          localField: "varietal",
          foreignField: "_id",
          as: "Varietal",
        },
      },
      { $unwind: "$Varietal" },
      {
        $lookup: {
          from: "tipovinos",
          localField: "tipoVino",
          foreignField: "_id",
          as: "TipoVino",
        },
      },
      { $unwind: "$TipoVino" },
      {
        $project: {
          _id: 1,
          nombre: 1,
          nombreTipo: "$TipoVino.nombreTipo",
          nombreVarietal: "$Varietal.nombreVarietal",
          nombreBodega: "$Bodega.nombreBodega",
          stock: 1,
          precio: 1,
          contendioNeto: 1,
          descripcion: 1,
          imagenUrl: 1,
          isOferta: 1,
          ProductoEnOferta: 1,
        },
      },
    ]);
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor", error });
  }
};

const getProductoById = async (req, res) => {
  try {
    idProducto = mongoose.Types.ObjectId(req.params.id);
    const producto = await Productos.aggregate([
      { $match: { _id: idProducto } },
      {
        $lookup: {
          from: "bodegas",
          localField: "bodega",
          foreignField: "_id",
          as: "Bodega",
        },
      },
      { $unwind: "$Bodega" },
      {
        $lookup: {
          from: "varietals",
          localField: "varietal",
          foreignField: "_id",
          as: "Varietal",
        },
      },
      { $unwind: "$Varietal" },
      {
        $lookup: {
          from: "tipovinos",
          localField: "tipoVino",
          foreignField: "_id",
          as: "TipoVino",
        },
      },
      { $unwind: "$TipoVino" },
      {
        $project: {
          _id: 1,
          nombre: 1,
          nombreTipo: "$TipoVino.nombreTipo",
          idTipoVino: "$TipoVino._id",
          nombreVarietal: "$Varietal.nombreVarietal",
          idVarietal: "$Varietal._id",
          nombreBodega: "$Bodega.nombreBodega",
          idBodega: "$Bodega._id",
          stock: 1,
          precio: 1,
          contendioNeto: 1,
          descripcion: 1,
          imagenUrl: 1,
          isOferta: 1,
        },
      },
    ]);

    const producutoById = {
      _id: producto[0]._id,
      nombre: producto[0].nombre,
      nombreTipo: producto[0].nombreTipo,
      idTipoVino: producto[0].idTipoVino,
      nombreVarietal: producto[0].nombreVarietal,
      idVarietal: producto[0].idVarietal,
      nombreBodega: producto[0].nombreBodega,
      idBodega: producto[0].idBodega,
      stock: producto[0].stock,
      precio: producto[0].precio,
      contendioNeto: producto[0].contendioNeto,
      descripcion: producto[0].descripcion,
      imagenUrl: producto[0].imagenUrl,
      isOferta: producto[0].isOferta,
    };

    res.json(producutoById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor" });
  }
};

const createProducto = async (req, res) => {
  try {
    const resultadoCouldinary = await cloudinary.uploader.upload(req.file.path);

    const producto = new Productos({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      stock: req.body.stock,
      contendioNeto: req.body.contendioNeto,
      precio: req.body.precio,
      tipoVino: req.body.tipoVino,
      varietal: req.body.varietal,
      bodega: req.body.bodega,
      imagenUrl: resultadoCouldinary.secure_url,
      cloudinaryId: resultadoCouldinary.public_id,
    });

    const newProducto = await producto.save();

    res.json({ message: "Se creo el producto con exito", data: newProducto });
  } catch (error) {
    return res.status(400).json({
      error: "No es posible crear un prdocuto nuevo",
      message: `El error es : ${error}`,
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    let producto = await Productos.findById(req.params.id);

    const elimarImagen = await cloudinary.uploader.destroy(
      producto.cloudinaryId
    );

    const elimarProducto = await producto.remove();
    res.json({
      message: "Se elimino el producto con exito",
      data: elimarProducto,
    });
  } catch (error) {
    return res.status(400).json({
      error: "No es posible Elimar el producto",
      message: `El error es : ${error}`,
    });
  }
};

const actualizarProducto = async (req, res, next) => {
  try {
    let producto = await Productos.findById(req.params.id);

    let resultadoCouldinary;
    if (req.file) {
      await cloudinary.uploader.destroy(producto.cloudinaryId);
      resultadoCouldinary = await cloudinary.uploader.upload(req.file.path);
    }
    const productoActualizar = {
      nombre: req.body.nombre || producto.nombre,
      descripcion: req.body.descripcion || producto.descripcion,
      stock: req.body.stock || producto.stock,
      contendioNeto: req.body.contendioNeto || producto.contendioNeto,
      precio: req.body.precio || producto.precio,
      tipoVino: req.body.tipoVino || producto.tipoVino,
      varietal: req.body.varietal || producto.varietal,
      bodega: req.body.bodega || producto.bodega,
      imagenUrl: resultadoCouldinary?.secure_url || producto.imagenUrl,
      cloudinaryId: resultadoCouldinary?.public_id || producto.cloudinaryId,
    };
    producto = await Productos.findByIdAndUpdate(
      req.params.id,
      productoActualizar,
      {
        new: true,
      }
    );

    res.json({ message: "Se creo el producto con exito", data: producto });
  } catch (err) {
    res.status(400).json({
      error: "No es posible Actulizar el producto",
      message: `El error es : ${error}`,
    });
    console.log(err);
    next();
  }
};

module.exports = {
  createProducto,
  eliminarProducto,
  actualizarProducto,
  getTodosProductos,
  getProductoById,
};
