const Ofertas = require("../models/Oferta");
const Productos = require("../models/Productos");
const mongoose = require("mongoose");

const createOferta = async (req, res) => {
  try {
    const oferta = new Ofertas({
      producto: req.body.producto,
      descuento: req.body.descuento,
      precioDescuento: req.body.precioDescuento,
      fechaFin: new Date(req.body.fechaFin),
    });
    const newOferta = await oferta.save();
    let productoEnOferta = await Productos.findById(oferta.producto.idProducto);

    if (productoEnOferta) {
      productoEnOferta.isOferta = true;
      const upDateProductoOferta = await productoEnOferta.save();
    }

    res.json({
      message: "Se creo la oferta con exito",
      data: newOferta,
      productoEnOferta,
    });
  } catch (error) {
    return res.status(400).json({
      error: "No es posible crear la oferta",
      message: `El error es : ${error}`,
    });
  }
};

const eliminarOferta = async (req, res) => {
  try {
    let ofertaEliminar = await Ofertas.findById(req.params.id);

    let productoActulizarOferta = await Productos.findById(
      ofertaEliminar.producto.idProducto
    );

    const elminarOferta = await ofertaEliminar.remove();

    if (productoActulizarOferta) {
      productoActulizarOferta.isOferta = false;
      const upDateProductoOferta = await productoActulizarOferta.save();
    }
    res.json({
      message: "Se oferta con exito",
      data: ofertaEliminar,
    });
  } catch (error) {
    return res.status(400).json({
      error: "No es posible eliminar oferta",
      message: `El error es : ${error}`,
    });
  }
};

const getOfertas = async (req, res) => {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  try {
    const ofertas = await Ofertas.aggregate([
      { $match: { fechaFin: { $gte: hoy } } },
      {
        $lookup: {
          from: "productos",
          localField: "producto.idProducto",
          foreignField: "_id",
          as: "Producto",
        },
      },
      { $unwind: "$Producto" },
      {
        $project: {
          _id: 0,

          _id: "$Producto._id",
          nombre: "$Producto.nombre",
          stock: "$Producto.stock",
          precio: "$Producto.precio",
          contendioNeto: "$Producto.contendioNeto",
          descripcion: "$Producto.descripcion",
          imagenUrl: "$Producto.imagenUrl",
          precioDescuento: 1,
          isOferta: "$Producto.isOferta",
          idVarietal: "$Producto.varietal",
          idTipoVino: "$Producto.tipoVino",
          idBodega: "$Producto.bodega",
        },
      },
      {
        $lookup: {
          from: "varietals",
          localField: "idVarietal",
          foreignField: "_id",
          as: "Varietal",
        },
      },
      { $unwind: "$Varietal" },
      {
        $lookup: {
          from: "tipovinos",
          localField: "idTipoVino",
          foreignField: "_id",
          as: "TipoVino",
        },
      },
      { $unwind: "$TipoVino" },
      {
        $lookup: {
          from: "bodegas",
          localField: "idBodega",
          foreignField: "_id",
          as: "Bodega",
        },
      },
      { $unwind: "$Bodega" },
      {
        $project: {
          _id: 1,
          nombre: 1,
          idVarietal: 1,
          idTipoVino: 1,
          idBodega: 1,
          nombreTipo: "$TipoVino.nombreTipo",
          nombreVarietal: "$Varietal.nombreVarietal",
          nombreBodega: "$Bodega.nombreBodega",
          stock: 1,
          precio: 1,
          contendioNeto: 1,
          descripcion: 1,
          imagenUrl: 1,
          isOferta: 1,
          precioDescuento: 1,
        },
      },
    ]);
    res.json(ofertas);
  } catch (error) {
    return res.status(400).json({
      error: "No se puede listar las ofertas",
      message: `El error es : ${error}`,
    });
  }
};

const getPrecioOferta = async (req, res) => {
  const idProducto = mongoose.Types.ObjectId(req.params.idProducto);

  try {
    const ofertasByIdProducto = await Ofertas.aggregate([
      { $match: { "producto.idProducto": idProducto } },
      {
        $project: {
          _id: 1,
          precioDescuento: 1,
          idProducto: "$producto.idProducto",
        },
      },
    ]);

    const precioOferta = {
      _id: ofertasByIdProducto[0]._id,
      precioDescuento: ofertasByIdProducto[0].precioDescuento,
      idProducto: ofertasByIdProducto[0].idProducto,
    };
    res.json(precioOferta);
  } catch (error) {
    return res.status(400).json({
      error: "No se puede listar las ofertas",
      message: `El error es : ${error}`,
    });
  }
};

const getTodasLasOfertas = async (req, res) => {
  try {
    const ofertas = await Ofertas.aggregate([
      {
        $lookup: {
          from: "productos",
          localField: "producto.idProducto",
          foreignField: "_id",
          as: "Producto",
        },
      },
      { $unwind: "$Producto" },
      {
        $project: {
          _id: 1,
          _idProducto: "$Producto._id",
          nombre: "$Producto.nombre",
          stock: "$Producto.stock",
          precio: "$Producto.precio",
          contendioNeto: "$Producto.contendioNeto",
          descripcion: "$Producto.descripcion",
          imagenUrl: "$Producto.imagenUrl",
          precioDescuento: 1,
          isOferta: "$Producto.isOferta",
          idVarietal: "$Producto.varietal",
          idTipoVino: "$Producto.tipoVino",
          idBodega: "$Producto.bodega",
          fechaFin: 1,
        },
      },
      {
        $lookup: {
          from: "varietals",
          localField: "idVarietal",
          foreignField: "_id",
          as: "Varietal",
        },
      },
      { $unwind: "$Varietal" },
      {
        $lookup: {
          from: "tipovinos",
          localField: "idTipoVino",
          foreignField: "_id",
          as: "TipoVino",
        },
      },
      { $unwind: "$TipoVino" },
      {
        $lookup: {
          from: "bodegas",
          localField: "idBodega",
          foreignField: "_id",
          as: "Bodega",
        },
      },
      { $unwind: "$Bodega" },
      {
        $project: {
          _id: 1,
          _idProducto: 1,
          nombre: 1,
          idVarietal: 1,
          idTipoVino: 1,
          idBodega: 1,
          nombreTipo: "$TipoVino.nombreTipo",
          nombreVarietal: "$Varietal.nombreVarietal",
          nombreBodega: "$Bodega.nombreBodega",
          stock: 1,
          precio: 1,
          contendioNeto: 1,
          descripcion: 1,
          imagenUrl: 1,
          isOferta: 1,
          precioDescuento: 1,
          anio: { $year: "$fechaFin" },
          mes: { $month: "$fechaFin" },
          dia: { $dayOfMonth: "$fechaFin" },
        },
      },
    ]);

    res.json(ofertas);
  } catch (error) {
    return res.status(400).json({
      error: "No se puede listar las ofertas",
      message: `El error es : ${error}`,
    });
  }
};
module.exports = {
  createOferta,
  eliminarOferta,
  getOfertas,
  getPrecioOferta,
  getTodasLasOfertas,
};
