const  { Schema, model } = require("mongoose");

const ProductSchema =  Schema({
    name: {
        type: String,
        required: true
    }, 
    id_producto: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }, 
    quantity: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        default: "default.png"
    },
    size:{
        type: String,
        required: false
    },
    color:{
        type: String,
        required: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: false,
        default: null
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    }
});

module.exports = model("Product", ProductSchema);