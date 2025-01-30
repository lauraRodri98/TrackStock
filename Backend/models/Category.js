const { Schema, model } = require("mongoose");

const CategotySchema = Schema({
    name:{
        type: String, 
        required: true
    },
    description:{
        type: String,
        required: false
    },
    imagen: {
        type: String,
        default: "baloncesto.png"
    }
})

module.exports = model("Category", CategotySchema)