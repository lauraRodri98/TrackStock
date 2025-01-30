const { Schema, model } = require("mongoose");

const SupplierSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true  
    },

});

module.exports = model("Supplier", SupplierSchema);
