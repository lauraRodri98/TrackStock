const Subcategory = require("../models/Subcategory");
const validator = require("validator");

const subcategory = async(req, res) => {
    try {
        const subcategories = await Subcategory.find({});

        if(subcategories){
            return res.status(200).json({
                status: "success",
                subcategory:subcategories
            })
        }
        return res.status(400)
    } catch (error) {
        console.error("No se ha obtenido las subcategorías: ", error);

        res.status(500).json({
            message:"Error al conectar con la API",
            status: "error",
            error: error.message
        })
    }
}

module.exports = {
    subcategory
}