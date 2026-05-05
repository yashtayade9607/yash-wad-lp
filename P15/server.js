const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express();
const port = 3000; 

app.use(express.static(path.join(__dirname,"public")));

app.get("/api/products",(req,res)=>{
    fs.readFile("products.json","utf-8",(err,data)=>{
        if(err){
            res.status(500).json({"error":err})
        }
        res.status(200).json(JSON.parse(data))
    })
})

app.listen(port, ()=>{
    console.log(`server is running on localhost:${port}`);
})