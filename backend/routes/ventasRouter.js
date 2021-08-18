const express = require("express");
const router = express.Router();

//Protediga
const { protegido } = require("../Middleware/auth");
//Controller

const {
  getTodosVentas,
  crearVenta,
  getCantidadComprasPorUsuario,
  getDetalleVentasUsuario,
  getVentaById,
  isPagado,
  isEntregado,
  isCancelada,
  isEntregadoAndIsPagado,
  getVentasPorDia,
} = require("../contoller/ventasController");

router.post("/venta", protegido, crearVenta);

router.get("/gestion", getTodosVentas);

router.get("/canditadComprasUsuario", getCantidadComprasPorUsuario);

router.get("/detalleVentas/:id", getDetalleVentasUsuario);

router.get("/vermas/:id", getVentaById);

router.put("/pago/:id", isPagado);

router.put("/delivery/:id", isEntregado);

router.put("/cancelar/:id", isCancelada);

router.put("/delivery/pagado/:id", isEntregadoAndIsPagado);

router.get("/ventas/por/dia", getVentasPorDia);

module.exports = router;
