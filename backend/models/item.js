const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    sellPrice: {
        type: Number,
        required: true,
    },
    category : {
        type: String,
        default: "General"
    },
    addedAt:{
        type: String,
        default: Date.now
    }
});
module.exports = mongoose.model("Item", itemSchema)