require("dotenv").config();
const express = require("express");
const { conexionDB } = require("./config/db");
const mercadopago = require("mercadopago");
conexionDB();
const cors = require("cors");

//Routes
const productosRutes = require("./routes/productosRoutes");
const tipoVino = require("./routes/tipoVinoRouter");
const auth = require("./routes/authRouters");
const ventas = require("./routes/ventasRouter");
const varietal = require("./routes/varietalRouter");
const bodegas = require("./routes/bodegasRouter");
const comentarios = require("./routes/comentariosRouter");
const reportes = require("./routes/reportesRouter");
const ofertas = require("./routes/ofertasRouter");
const novedades = require("./routes/novedadesRouter");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//Productos //Tipo de vino
app.use("/api/productos", productosRutes);
app.use("/api/tipoVino", tipoVino);
app.use("/api/varietal", varietal);
app.use("/api/bodegas", bodegas);
app.use("/api/ofertas", ofertas);
app.use("/api/novedades", novedades);

//Usuarios
app.use("/api/auth", auth);

//Venta
app.use("/api/ventas", ventas);

//Comentarios
app.use("/api/comentarios", comentarios);

//Reportes
app.use("/api/reportes", reportes);

//Manejo imagenes
app.use("/public", express.static(`${__dirname}/storage/img`));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server corriendo en el puerto: ${PORT}`));
