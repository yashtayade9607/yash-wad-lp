const express = require('express')
const cors = require('cors')
const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

let tasks = []
let idCount = 1;

// view tasks
app.get("/tasks",(req,res)=>{
    res.json(tasks)
})

// add tasks
app.post("/tasks",(req, res)=> {
    let task = {
        id : idCount++,
        text: req.body.text,
        completed: false
    }
    tasks.push(task);
    res.json(task);
})

// update tasks
app.put("/update/:id", (req,res)=>{
    let task = tasks.find(e => e.id == req.params.id);

    if(task){
        if(req.body.completed !== undefined){
            task.completed = req.body.completed
        }

        if(req.body.text !== undefined){
            task.text = req.body.text;
        }

        res.json(task)
    }else {
        res.send("task not found")
    }
})

// delete tasks
app.delete("/delete/:id", (req,res) => {
    let deleted = tasks.find(t => t.id == req.params.id);
    tasks = tasks.filter(t => t.id != req.params.id);
    res.json(deleted)
})

app.listen(port,()=>console.log(`server is running on port ${port}`));