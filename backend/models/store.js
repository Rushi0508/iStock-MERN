const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    entries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Entry'
        }
    ],
    createdAt: {
        type: String,
        default: Date.now
    }
});

  
module.exports = mongoose.model("Store", storeSchema)