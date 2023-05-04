const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
    partyName: {
        type: String,
        default: "-"
    },
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true 
    },
    sellPrice: {
        type: Number,
        required: true 
    },
    operation : {
        type: String
    }},
    {timestamps: true
});

module.exports = mongoose.model("Entry", entrySchema)