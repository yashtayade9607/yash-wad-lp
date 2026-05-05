// Design a backend system to manage books in an online bookstore.
// Perform the following tasks using Node.js, Express.js, and MongoDB.
// The following operations should be performed in Node.js and Express.js only:
// • Add a new book (title, author, price, genre)
// • Retrieve a list of all books
// • Update book details
// • Delete a book from the collection


const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/EmployeeDB').then(() => console.log("mongodb connected successfully")).catch((error) => console.log("failed to connect mongodb", error))

// schemas
// (title, author, price, genre)
let bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    genre: String
})

let Bookstore = mongoose.model("bookstore", bookSchema)

const app = express()
app.use(express.json())

// • Add a new book (title, author, price, genre)
app.post("/create", async (req, res) => {
    try {
        let book = await Bookstore.create(req.body)
        res.status(201).json(book)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// • Retrieve a list of all books
app.get("/books", async (req, res) => {
    try {
        let books = await Bookstore.find()

        if (books.length === 0) {
            return res.status(404).send("No books found")
        }

        res.json(books)
    } catch (err) {
        res.status(500).send("Server error")
    }
})

// • Update book details
app.put("/update/:id", async (req, res) => {
    try {
        let updated = await Bookstore.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        )

        if (!updated) {
            return res.status(404).send("Book not found")
        }

        res.json(updated)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// • Delete a book from the collection
app.delete("/delete/:id", async (req, res) => {
    try {
        let deleted = await Bookstore.findByIdAndDelete(req.params.id)

        if (!deleted) {
            return res.status(404).send("Book not found")
        }

        res.json({ message: "Deleted successfully", data: deleted })
    } catch (err) {
        res.status(500).send("Server error")
    }
})

app.listen(3000, () => console.log("Server started on port 3000"))