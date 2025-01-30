const mongoose = require("mongoose");

const connection = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Inventory")

        console.log("Conectado correctamente a la base de datos de Inventory")
    } catch (error) {
        console.log(error);
        throw new Error("No ha podido conectarse a la base de datos")
    }
}

module.exports = {
    connection
}