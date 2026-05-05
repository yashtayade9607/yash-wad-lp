const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express();

const port = 3000;

app.use(express.static("public"));

app.get("/api/employees",(req, res)=>{
    fs.readFile("employees.json", "utf-8", (err, data)=>{
        if(err){
            res.status(500).json({"error":err})
        }
        res.status(200).json(JSON.parse(data))
    })
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})