const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv")

const userRoute = require("./routes/userRoutes")
const blogRoute = require("./routes/blogRoutes")

dotenv.config()
const PORT = process.env.PORT || 5000;

console.log(PORT)
app.use(express.json());
app.use(cors())


app.use("/api/v1",userRoute)
app.use("/api/v1",blogRoute)

app.listen(PORT,()=>{
    console.log("server started");
    dbConnect();
})
