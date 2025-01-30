const Movement = require("../models/Movement");
const validator = require("validator");

const moviments = async (req, res) => {
    
    try {
        const moviments = await Movement.find();

        if(!moviments || moviments.lenght === 0){
            return res.staus(404).json({
                status: "error",
                mensaje: "No se han encontrado movimientos"
            });
        }
        return res.status(200).json({
            status:"success",
            movement: moviments
        })
    } catch (error) {
        return res.status(500).json({
            status:"error",
            message: "Error al obtener los movimientos",
            error: error.messaje
        })
    }
}

module.exports = {
    moviments
}