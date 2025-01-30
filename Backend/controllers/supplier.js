const Suplier = require("../models/Supplier");
const validator = require("validator");

const supplier = async(req, res) => {
    try {
        const supplier = await Suplier.find();
        if(!supplier && supplier.length() === 0){
            res.status(402).json({
                status: "error",
                mensaje: "No hay proveedores registrados"
            })
        }
        res.status(200).json({
            status: 'success',
            supplier: supplier
        })
    } catch (error) {
        console.error("No se ha podido conectar a la API");
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener los proveedores",
            error: error.message
        });
    }
}

module.exports = {
    supplier
}