const { connection } =require("./database/connetion");
const express = require("express");
const cors = require("cors");
const {insertData} = require("../script.bat")

//Inicializar app
console.log("API para Inventary de node arrancada <3");

//Conectar a la base de datos
connection();

// Crear servidor node
const app = express();
const puerto = 3900;

// configurar cors
app.use(cors());

// Convertit body a objeto js
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// RUTAS
const routes_products = require("./routes/products");
const routes_category = require("./routes/category");
const routes_movement = require("./routes/movement");
const routes_supplier = require("./routes/suplier");
const routes_subcategory = require("./routes/subcategory");

// Cargamos las rutas
app.use("/api", routes_products);
app.use("/api", routes_category);
app.use("/api", routes_movement);
app.use("/api", routes_supplier);
app.use("/api", routes_subcategory);


// req es la peticion que yo hago y res es la respuesta
app.get("/probando", (req, res) => {
    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).send([{
        curso:"APIrest",
        autor:"Victo reobles",
        url:"sdfkjldskfjlsdfk"
    }])
})

insertData();

// Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("servidor corriendo en el puerto " + puerto);
});