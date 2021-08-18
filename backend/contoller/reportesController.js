const Ventas = require("../models/Ventas");
const mongoose = require("mongoose");

const ingresosBrutosPorMes = async (req, res) => {
  //   const tiempoTranscurrido = Date.now();
  //   const hoy = new Date(tiempoTranscurrido);

  //   const anio = hoy.getFullYear();

  aniosElegido = parseInt(req.params.anio);

  try {
    const ventas = await Ventas.aggregate([
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            mes: {
              $month: "$createdAt",
            },
          },
          ventas: {
            $push: {
              total: "$montoTotal",
            },
          },
        },
      },
      {
        $project: {
          _id: 0, // <- nos deshacemos del campo _id
          year: "$_id.year", // <- creamos el campo year
          mes: "$_id.mes", //    y el campo mes
          total: {
            // <- campo que almacenará el total del proceso de reducción
            $reduce: {
              input: "$ventas", // <- array de entrada
              initialValue: 0, // <- valor inicial para acumular la reducción
              in: {
                $sum: [
                  "$$value", // <- se refiere al valor inicial que se irá acumulando
                  "$$this.total", // <- campo que se sumará en cada iteración
                ],
              },
            },
          },
        },
      },
      { $match: { year: aniosElegido } },
      //   {
      //     $group: {
      //       _id: "$year",
      //       ventas: {
      //         $push: {
      //           mes: "$mes",
      //           total: "$total",
      //         },
      //       },
      //     },
      //   },
      { $sort: { mes: 1 } },
    ]);
    res.json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor", error });
  }
};

const tipoDeVinoMasVendido = async (req, res) => {
  primerDiaDelAño = new Date(new Date().getFullYear(), 0, 1);
  ultimoDiaDelAño = new Date(new Date().getFullYear(), 11, 31);
  // $date": {$gte: ISODate("2013-01-01T00:00:00.0Z"), $lt: ISODate("2013-02-01T00:00:00.0Z")}}
  try {
    const ventas = await Ventas.aggregate([
      {
        $match: {
          createdAt: { $gte: primerDiaDelAño, $lt: ultimoDiaDelAño },
        },
      },
      { $unwind: "$items" },
      {
        $group: {
          _id: { idProducto: "$items.producto" },
          cantidad: { $sum: "$items.cantidad" },
        },
      },
      {
        $project: {
          _id: 0,
          idProducto: "$_id.idProducto",
          cantidad: 1,
        },
      },
      {
        $lookup: {
          from: "productos",
          localField: "idProducto",
          foreignField: "_id",
          as: "Producto",
        },
      },
      {
        $project: {
          cantidad: 1,
          idProducto: 1,
          idVarietal: "$Producto.varietal",
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
      {
        $project: {
          cantidad: 1,
          idVarietal: 1,
          nombreVarietal: "$Varietal.nombreVarietal",
        },
      },
      {
        $group: {
          _id: { idVarietal: "$idVarietal", nombreVarietal: "$nombreVarietal" },
          cantidad: { $sum: "$cantidad" },
        },
      },
      {
        $project: {
          _id: 0,
          cantidad: 1,
          nombreVarietal: "$_id.nombreVarietal",
        },
      },
      { $unwind: "$nombreVarietal" },
    ]);

    res.json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor", error });
  }
};

const cantidadDeProductoVendidosPorMes = async (req, res) => {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  const anio = hoy.getFullYear();

  try {
    const ventas = await Ventas.aggregate([
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            mes: {
              $month: "$createdAt",
            },
          },
          cantiad: {
            $push: {
              total: { $sum: "$items.cantidad" },
            },
          },
        },
      },
      { $match: { "_id.year": anio } },
      {
        $project: {
          _id: 0, // <- nos deshacemos del campo _id
          year: "$_id.year", // <- creamos el campo year
          mes: "$_id.mes", //    y el campo mes
          totalCantidad: {
            // <- campo que almacenará el total del proceso de reducción
            $reduce: {
              input: "$cantiad", // <- array de entrada
              initialValue: 0, // <- valor inicial para acumular la reducción
              in: {
                $sum: [
                  "$$value", // <- se refiere al valor inicial que se irá acumulando
                  "$$this.total", // <- campo que se sumará en cada iteración
                ],
              },
            },
          },
        },
      },

      // //   {
      // //     $group: {
      // //       _id: "$year",
      // //       ventas: {
      // //         $push: {
      // //           mes: "$mes",
      // //           total: "$total",
      // //         },
      // //       },
      // //     },
      // //   },
      { $sort: { mes: 1 } },
    ]);
    res.json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor", error });
  }
};

const comportamientoVarietal = async (req, res) => {
  //   const tiempoTranscurrido = Date.now();
  //   const hoy = new Date(tiempoTranscurrido);

  //   const anio = hoy.getFullYear();

  const idVarietalParams = mongoose.Types.ObjectId(req.params.idVarietalParams);

  primerDiaDelAño = new Date(new Date().getFullYear(), 0, 1);
  ultimoDiaDelAño = new Date(new Date().getFullYear(), 11, 31);

  try {
    const compoVarietal = await Ventas.aggregate([
      {
        $match: { createdAt: { $gte: primerDiaDelAño, $lt: ultimoDiaDelAño } },
      },
      { $unwind: "$items" },
      {
        $group: {
          _id: {
            idProducto: "$items.producto",
            year: { $year: "$createdAt" },
            mes: {
              $month: "$createdAt",
            },
          },
          cantidad: { $sum: "$items.cantidad" },
        },
      },
      {
        $project: {
          _id: 0,
          idProducto: "$_id.idProducto",
          mes: "$_id.mes",
          cantidad: 1,
        },
      },
      {
        $lookup: {
          from: "productos",
          localField: "idProducto",
          foreignField: "_id",
          as: "Producto",
        },
      },
      {
        $project: {
          cantidad: 1,
          idProducto: 1,
          idVarietal: "$Producto.varietal",
          mes: 1,
        },
      },
      { $match: { idVarietal: idVarietalParams } },
      {
        $lookup: {
          from: "varietals",
          localField: "idVarietal",
          foreignField: "_id",
          as: "Varietal",
        },
      },

      {
        $project: {
          cantidad: 1,
          idVarietal: 1,
          nombreVarietal: "$Varietal.nombreVarietal",
          mes: 1,
        },
      },
      {
        $group: {
          _id: {
            idVarietal: "$idVarietal",
            nombreVarietal: "$nombreVarietal",
            mes: "$mes",
          },
          cantidad: { $sum: "$cantidad" },
        },
      },
      {
        $project: {
          _id: 0,

          cantidad: 1,
          nombreVarietal: "$_id.nombreVarietal",
          mes: "$_id.mes",
        },
      },
      { $unwind: "$nombreVarietal" },
      { $sort: { mes: 1 } },
    ]);

    res.json(compoVarietal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "fallo en el servidor", error });
  }
};

module.exports = {
  ingresosBrutosPorMes,
  tipoDeVinoMasVendido,
  cantidadDeProductoVendidosPorMes,
  comportamientoVarietal,
};
