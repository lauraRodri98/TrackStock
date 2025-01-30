const Product = require("../models/Product");
const validator = require("validator");

const create = async (req, res) => {
    let parametros = req.body;
    console.log(parametros)
    console.log(parametros.name)
    console.log(parametros.description)

    if (parametros.subCategory === "") {
        delete parametros.subCategory; // Elimina el campo subCategory si es una cadena vacía
    }

    // Verifica si los parámetros existen
    if (!parametros.name || !parametros.description) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos obligatorios: 'name' o 'description'"
        });
    }

    // Validar los datos
    try {
        let validar_nombre = !validator.isEmpty(parametros.name);
        let validar_descripcion = !validator.isEmpty(parametros.description);

        if (!validar_nombre || !validar_descripcion) {
            throw new Error("Faltan datos obligatorios");
        }

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: error.message
        });
    }
    const newProductData = { ...parametros };
    if (!newProductData.subCategory) {
        delete newProductData.subCategory; // Elimina subCategory si no está presente
    }

    const newProduct = new Product(parametros);

    try {
        const productoGuardado = await newProduct.save();
        console.log(productoGuardado)

        return res.status(200).json({
            status: "success",
            products: productoGuardado,
            mensaje: "Guardado con éxito"
        });
    } catch (error) {
        console.error("Error al guardar el producto:", error); 
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha guardado el producto",
            error: error.message
        });
    }
}

const product = async (req, res) => {
    try {
        // Usamos await para esperar el resultado de la consulta
        const products = await Product.find({});

        console.log(products);

        // Si no hay productos, responde con un mensaje de error
        if (!products || products.length === 0) {
            return res.status(400).json({
                status: "error",
                mensaje: "No se han encontrado productos"
            });
        }

        // Si se encuentran productos, devolverlos con una respuesta exitosa
        return res.status(200).json({
            status: "success",
            productos: products  
        });
    } catch (error) {
        console.error("Error al obtener los productos:", error);

        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener los productos",
            error: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const encontrarProducto = await Product.findOneAndDelete({_id: id})

        if(!encontrarProducto){
            return res.status(404).json({
                status:"Error",
                mensaje: "No se ha encontrado el producto"
            })
        }

        res.status(200).json({
            status :"success",
            mensaje: "Producto eliminado con éxito",
            product: encontrarProducto
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "Error",
            mensaje: "Error al eliminar el producto"
        })
    }
}

const update = async (req, res) => {
    try {
        const parametros = req.body;
        console.log(parametros);

        // Eliminar el campo subCategory si es una cadena vacía
        if (parametros.subCategory === "") {
            delete parametros.subCategory;
        }

        // Validar los campos
        let validar_nombre = !validator.isEmpty(String(parametros.name || ""));
        let validar_descripcion = !validator.isEmpty(String(parametros.description || ""));
        let validar_quantity = !validator.isEmpty(String(parametros.quantity || ""));
        let validar_price = !validator.isEmpty(String(parametros.price || ""));
        let validar_category = !validator.isEmpty(String(parametros.category || ""));
        let validar_supplier = !validator.isEmpty(String(parametros.supplier || ""));
        let validar_id_producto = !validator.isEmpty(String(parametros.id_producto || ""));

        console.log(
            "Nombre: " + validar_nombre +
            ", Descripción: " + validar_descripcion +
            ", Cantidad: " + validar_quantity +
            ", Precio: " + validar_price +
            ", Categoría: " + validar_category +
            ", Proveedor: " + validar_supplier +
            ", ID Producto: " + validar_id_producto
        );

        // Actualizar los datos
        const productUpdate = await Product.findOneAndUpdate(
            { id_producto: parametros.id_producto },
            parametros,
            { new: true }
        );

        res.status(200).json({
            mensaje: "Producto actualizado",
            status: "success",
            product: productUpdate
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Error",
            mensaje: "Error al actualizar el producto"
        });
    }
};



module.exports = {
    product,
    deleteProduct,
    create,
    update
};