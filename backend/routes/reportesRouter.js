const express = require("express");
const router = express.Router();

const {
  ingresosBrutosPorMes,
  tipoDeVinoMasVendido,
  cantidadDeProductoVendidosPorMes,
  comportamientoVarietal,
} = require("../contoller/reportesController");

router.get("/ingreseos/brutos/:anio", ingresosBrutosPorMes);
router.get(
  "/cantidad/productos/vendidos/por/mes",
  cantidadDeProductoVendidosPorMes
);

router.get("/comportamieto/varietal/:idVarietalParams", comportamientoVarietal);

router.get("/tipo/mas/vendido", tipoDeVinoMasVendido);

module.exports = router;
