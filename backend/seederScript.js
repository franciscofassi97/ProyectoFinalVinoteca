require('dotenv').config();

const productosData = require('./data/productos')
const conexionDB = require('./config/db');
const TipoVino = require('./models/TipoVino');

conexionDB();

const importData = async () =>{
    try {
        await TipoVino.deleteMany({});
        await TipoVino.insertMany(productosData);
        console.log("se cargaron los datos correctamente");
        process.exit();
    } catch (error) {
        console.error("Error al importar los datos")
        process.exit(1)
    }
}

importData();