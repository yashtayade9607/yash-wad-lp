// Create a backend application for managing employee records.
// Perform the following tasks using Node.js, Express.js, and MongoDB.
// The following operations should be performed in Node.js and Express.js
// only:
// • Add a new employee (name, department, designation, salary, joining date)
// • View all employee records
// • Update an existing employee’s details
// • Delete an employee record


const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/EmployeeDB').then(() => console.log("mongodb connected successfully")).catch((error) => console.log("failed to connect mongodb", error))

// schemas

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: String,
    designation: String,
    salary: {
        type: Number,
        required: true
    },
    joiningDate: {
        type: Date,
        default: Date.now
    }
});

let Employee = mongoose.model("employee",employeeSchema);


const app = express();

app.use(express.json())

app.get("/", (req,res) => {
    res.send("Hello from Employee Management")
})


// • Add a new employee (name, department, designation, salary, joining date)
app.post("/add", async (req, res) => {
  try {
    let { name, department, designation, salary, joiningDate } = req.body;

    let emp = new Employee({
      name,
      department,
      designation,
      salary,
      joiningDate
    });

    await emp.save();

    //or
    // const emp = await Employee.create(req.body)

    res.send("Employee Added");
  } catch (e) {
    res.status(500).send("Error");
  }
});

// • View all employee records
app.get("/view",async (req,res) =>{
    let emps = await Employee.find();
    res.json(emps)
})

// • Update an existing employee’s details
app.put("/update/:id", async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).send("Employee not found");

    res.json(updated);
  } catch (e) {
    res.status(500).send("Error updating employee");
  }
});

// • Delete an employee record
app.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).send("Employee not found");

    res.send("Employee deleted");
  } catch (e) {
    res.status(500).send("Error deleting employee");
  }
});

app.listen(3000,()=>console.log("Server started on port 3000"))