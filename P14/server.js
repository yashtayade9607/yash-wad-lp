const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "public")));

// API endpoint
app.get("/api/users", (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read file" });
        }
        res.json(JSON.parse(data));
    })
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});