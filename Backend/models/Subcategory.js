const { Schema, model } = require("mongoose"); 

const schemaSubcategory = Schema({
    name: {
        type:String,
        require:true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model( "Subcategory", schemaSubcategory );