const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ===============================
// a) Connect DB (student)
// ===============================
mongoose.connect("mongodb://127.0.0.1:27017/student")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// ===============================
// b) Schema + Collection
// ===============================
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_Marks: Number
});

const Student = mongoose.model("studentmarks", studentSchema);

// ===============================
// c) Insert data
// ===============================
app.get("/insert", async (req, res) => {
    await Student.deleteMany();

    await Student.insertMany([
        { Name: "Amit", Roll_No: 101, WAD_Marks: 25, CC_Marks: 30, DSBDA_Marks: 28, CNS_Marks: 26, AI_Marks: 27 },
        { Name: "Riya", Roll_No: 102, WAD_Marks: 18, CC_Marks: 20, DSBDA_Marks: 22, CNS_Marks: 19, AI_Marks: 21 },
        { Name: "Rahul", Roll_No: 103, WAD_Marks: 30, CC_Marks: 32, DSBDA_Marks: 35, CNS_Marks: 31, AI_Marks: 33 },
        { Name: "Sneha", Roll_No: 104, WAD_Marks: 15, CC_Marks: 18, DSBDA_Marks: 19, CNS_Marks: 17, AI_Marks: 16 },
        { Name: "Karan", Roll_No: 105, WAD_Marks: 28, CC_Marks: 26, DSBDA_Marks: 29, CNS_Marks: 27, AI_Marks: 30 }
    ]);

    res.send("Students Inserted");
});

// ===============================
// d) Count + List all
// ===============================
app.get("/students", async (req, res) => {
    const data = await Student.find();
    const count = await Student.countDocuments();

    res.send({ total: count, students: data });
});

// ===============================
// e) DSBDA > 20
// ===============================
app.get("/dsbda", async (req, res) => {
    const data = await Student.find({ DSBDA_Marks: { $gt: 20 } }, { Name: 1, _id: 0 });
    res.send(data);
});

// ===============================
// f) Update marks by +10
// ===============================
app.get("/update/:name", async (req, res) => {
    await Student.updateOne(
        { Name: req.params.name },
        {
            $inc: {
                WAD_Marks: 10,
                CC_Marks: 10,
                DSBDA_Marks: 10,
                CNS_Marks: 10,
                AI_Marks: 10
            }
        }
    );

    res.send("Marks Updated");
});

// ===============================
// g) >25 in all subjects
// ===============================
app.get("/topper", async (req, res) => {
    const data = await Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_Marks: { $gt: 25 }
    }, { Name: 1, _id: 0 });

    res.send(data);
});

// ===============================
// h) <40 in WAD & CNS
// ===============================
app.get("/fail", async (req, res) => {
    const data = await Student.find({
        WAD_Marks: { $lt: 40 },
        CNS_Marks: { $lt: 40 }
    }, { Name: 1, _id: 0 });

    res.send(data);
});

// ===============================
// i) Delete student
// ===============================
app.get("/delete/:name", async (req, res) => {
    await Student.deleteOne({ Name: req.params.name });
    res.send("Student Deleted");
});

// ===============================
// j) Table format
// ===============================
app.get("/table", async (req, res) => {
    const data = await Student.find();

    let html = `
    <html>
    <head>
        <style>
            table { border-collapse: collapse; margin: auto; width: 80%; }
            th, td { border: 1px solid black; padding: 10px; text-align: center; }
            th { background: #ddd; }
        </style>
    </head>
    <body>
    <h2 style="text-align:center;">Student Marks</h2>
    <table>
        <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>WAD</th>
            <th>DSBDA</th>
            <th>CNS</th>
            <th>CC</th>
            <th>AI</th>
        </tr>
    `;

    data.forEach(s => {
        html += `
        <tr>
            <td>${s.Name}</td>
            <td>${s.Roll_No}</td>
            <td>${s.WAD_Marks}</td>
            <td>${s.DSBDA_Marks}</td>
            <td>${s.CNS_Marks}</td>
            <td>${s.CC_Marks}</td>
            <td>${s.AI_Marks}</td>
        </tr>`;
    });

    html += "</table></body></html>";

    res.send(html);
});

// ===============================
app.listen(3000, () => console.log("Server running on port 3000"));