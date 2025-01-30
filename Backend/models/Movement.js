const { Schema, model } = require("mongoose");

const MovementScema = Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    },
    type: {
        type: String,
        enum: ['entrada', 'salida', 'devolucion'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        required: false
    }
})

module.exports = model("Movement", MovementScema )