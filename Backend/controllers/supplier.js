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

const create = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        console.log(`${name}, ${email}, ${phone}, ${address}`)

        if (!name || !email || !phone || !address) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const existingSupplier = await Suplier.findOne({ email });
        if (existingSupplier) {
            return res.status(400).json({ message: "El proveedor con este email ya existe" });
        }

        const newSupplier = new Suplier({ name, email, phone, address });
        await newSupplier.save();

        res.status(201).json({ message: "Proveedor creado con éxito", supplier: newSupplier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el proveedor" });
    }
};

const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedSupplier = await Suplier.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedSupplier) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        res.status(200).json({ message: "Proveedor actualizado con éxito", supplier: updatedSupplier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el proveedor" });
    }
}

const deleteSupplier = async(req, res) => {
    console.log("Ha entrado dentro ")
    try {
        const {id} = req.params;
        console.log(id)
        const eliminarSuplplier = await Suplier.findOneAndDelete({_id:id});

        if(!eliminarSuplplier){
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
    supplier, 
    updateSupplier,
    create,
    deleteSupplier
}