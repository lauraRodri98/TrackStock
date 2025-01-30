const Category = require("../models/Category");
const validator = require("validator");

const categories = async (req, res) => {
    try {
        const categories = await Category.find({});

        if (!categories || categories.length === 0) {
            console.log(categories)
            return res.status(400).json({
                status: "error",
                mensaje: "No se han encontrado categorías"
            });
        }

        return res.status(200).json({
            status: "success",
            category: categories
        });
    } catch (error) {
        console.error("Error al obtener los caegoría:", error);

        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener las categorías",
            error: error.message
        });
    }
};

const newCategory = async (req, res) => {
    try {
        // Crear desestructuración de los datos recibidos
        const { name, imagen } = req.body;
        console.log(name + " " + imagen);

        if (!name || !imagen) {
            return res.status(400).json({ mensaje: "Faltan datos de categoría" });
        }

        // Crear la nueva categoría con el nombre y la imagen
        const newCategory = new Category({
            name,
            imagen
        });

        const newProduct = await newCategory.save();

        res.status(201).json({
            message: "Categoría creada correctamente",
            categoria: newProduct
        });

    } catch (error) {
        console.error("Error al crear nueva Categoría", error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al crear categoría",
            error: error.message
        });
    }
};

//CRear punto de ruptura para actualizar categorias

module.exports = {
    categories,
    newCategory
}