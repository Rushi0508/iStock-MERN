require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const app = express();
const cookieParser = require("cookie-parser");

// Setting Up connection
mongoose.set('strictQuery', false);
const dbURL = process.env.DB_URL || "mongodb://localhost:27017/iStockDB"

mongoose.connect(dbURL, {useNewUrlParser: true}).then(()=>{
    console.log("Mongo Connected");
}).catch(err=>{
    console.log("OH error");
    console.log(err);
});
app.use(cookieParser());
app.use(cors(
    {
        origin: ["https://i-stock-mernstack.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true,
    }
));
app.get("/", (req,res)=>{
    res.send("Working");
})
app.use(express.json())
// Routes
const authRoutes = require("./routes/auth")
const itemRoutes = require("./routes/item")
const entryRoutes = require("./routes/entry")
app.use("/api/auth", authRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/entry", entryRoutes);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log("Listening on ", {port});
})