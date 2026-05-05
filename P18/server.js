const express = require('express')
const mongoose = require('mongoose')
require('./config/db')
const songRoutes = require('./routes/songRoutes')
const app = express();
const port = 3000;

app.use(express.json())

// Routes
app.use("/api", songRoutes);

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(port, ()=> console.log(`server is running on port ${port}`))