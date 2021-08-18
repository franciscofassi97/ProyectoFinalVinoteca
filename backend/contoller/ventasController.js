const Venta = require("../models/Ventas");
const mongoose = require("mongoose");

const crearVenta = async (req, res) => {
  const venta = new Venta({
    usuario: req.body.usuario,
    montoTotal: req.body.montoTotal,
    items: req.body.items,
    direccionEnvio: req.body.direccionEnvio,
    formaPago: req.body.formaPago,
  });

  const ventaCreada = await venta.save();
  res
    .status(201)
    .send({ meesage: "nueva venta realizada", venta: ventaCreada });
};

const getTodosVentas = async (req, res) => {
  try {
    const venta = await Venta.find({ isCancelada: false });
    res.json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor" });
  }
};

const getCantidadComprasPorUsuario = async (req, res) => {
  try {
    const usuarioCantidadCompras = await Venta.aggregate([
      { $match: { isCancelada: false } },
      {
        $lookup: {
          from: "usuarios",
          localField: "usuario",
          foreignField: "_id",
          as: "NombreUsuario",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$NombreUsuario", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          _id: 1,
          nombre: 1,
          cantidad: 1,
          usuario: 1,
        },
      },
      {
        $group: {
          _id: { idUsuario: "$usuario", nombre: "$nombre" },
          cantidad: { $sum: 1 },
        },
      },
      {
        $sort: { nombre: -1 },
      },
    ]);

    res.json(usuarioCantidadCompras);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "fallos en el servidor", error });
  }
};

const getDetalleVentasUsuario = async (req, res) => {
  try {
    const idUsuario = mongoose.Types.ObjectId(req.params.id);
    const detalle = await Venta.aggregate([
      { $match: { usuario: idUsuario } },
      { $match: { isCancelada: false } },
      {
        $project: {
          _id: 1,
          isPagado: 1,
          isEntregado: 1,
          montoTotal: 1,
          formaPago: 1,
          direccion: "$direccionEnvio.direccion",
          isCancelada: 1,
          fechaCompra: {
            $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
          },
        },
      },
      { $sort: { fechaCompra: -1 } },
    ]);

    res.json(detalle);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "fallos en el servidor", error });
  }
};

const getVentaById = async (req, res) => {
  try {
    idVenta = mongoose.Types.ObjectId(req.params.id);
    const venta = await Venta.aggregate([
      { $match: { _id: idVenta } },
      {
        $project: {
          _id: 1,
          isPagado: 1,
          isEntregado: 1,
          isCancelada: 1,
          montoTotal: 1,
          items: 1,
          direccionEnvio: 1,
          formaPago: 1,
          fechaCompra: {
            $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
          },
          fechaPago: {
            $dateToString: { format: "%d-%m-%Y", date: "$updatedAt" },
          },
        },
      },
    ]);
    const ventaById = {
      _id: venta[0]._id,
      isPagado: venta[0].isPagado,
      isEntregado: venta[0].isEntregado,
      isCancelada: venta[0].isCancelada,
      montoTotal: venta[0].montoTotal,
      items: venta[0].items,
      direccionEnvio: venta[0].direccionEnvio,
      formaPago: venta[0].formaPago,
      fechaCompra: venta[0].fechaCompra,
      fechaPago: venta[0].fechaPago,
    };

    res.json(ventaById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor" });
  }
};
const isPagado = async (req, res, next) => {
  try {
    let venta = await Venta.findById(req.params.id);

    if (venta) {
      venta.isPagado = true;
      const updatedOrder = await venta.save();
      res.json({ message: "Pagado", data: updatedOrder });
    }
  } catch (error) {
    res.status(400).json({
      error: "No es posible Actulizar el producto",
      message: `El error es : ${error}`,
    });

    next();
  }
};

const isEntregado = async (req, res, next) => {
  try {
    let venta = await Venta.findById(req.params.id);

    if (venta) {
      venta.isEntregado = true;
      const updatedOrder = await venta.save();
      res.json({ message: "Entregado", data: updatedOrder });
    }
  } catch (error) {
    res.status(400).json({
      error: "No es posible Actulizar el producto",
      message: `El error es : ${error}`,
    });

    next();
  }
};

const isEntregadoAndIsPagado = async (req, res, next) => {
  try {
    let venta = await Venta.findById(req.params.id);

    if (venta) {
      venta.isEntregado = true;
      venta.isPagado = true;
      const updatedOrder = await venta.save();
      res.json({ message: "Pagado y entregado", data: updatedOrder });
    }
  } catch (error) {
    res.status(400).json({
      error: "No es posible Actulizar el producto",
      message: `El error es : ${error}`,
    });

    next();
  }
};

const isCancelada = async (req, res, next) => {
  try {
    let venta = await Venta.findById(req.params.id);

    if (venta) {
      venta.isCancelada = true;
      const updatedOrder = await venta.save();
      res.json({
        message: "Se cancelo la venta con exito",
        data: updatedOrder,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "No es posible Actulizar el producto",
      message: `El error es : ${error}`,
    });

    next();
  }
};
const getVentasPorDia = async (req, res) => {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  const anio = hoy.getFullYear();
  const mes = hoy.getMonth() + 1;
  const dia = hoy.getDate();

  try {
    idVenta = mongoose.Types.ObjectId(req.params.id);
    const venta = await Venta.aggregate([
      {
        $lookup: {
          from: "usuarios",
          localField: "usuario",
          foreignField: "_id",
          as: "email",
        },
      },
      { $unwind: "$email" },
      {
        $project: {
          _id: 1,
          direccion: "$direccionEnvio.direccion",
          anio: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
          email: "$email.email",
          montoTotal: 1,
        },
      },
      {
        $match: { day: dia, anio: anio, month: mes },
      },
    ]);

    res.json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor" });
  }
};

module.exports = {
  crearVenta,
  getTodosVentas,
  getCantidadComprasPorUsuario,
  getDetalleVentasUsuario,
  getVentaById,
  isPagado,
  isEntregado,
  isEntregadoAndIsPagado,
  getVentasPorDia,
  isCancelada,
};
