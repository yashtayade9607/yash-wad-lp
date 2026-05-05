const express = require('express')
const router = express.Router();
const Song = require('../models/songModel');

router.get("/insert", async (req, res) => {
    await Song.deleteMany();
    let sng = await Song.insertMany([
        { Songname: "Tum Hi Ho", Film: "Aashiqui 2", Music_director: "Mithoon", Singer: "Arijit Singh" },
        { Songname: "Kesariya", Film: "Brahmastra", Music_director: "Pritam", Singer: "Arijit Singh" },
        { Songname: "Malang", Film: "Malang", Music_director: "Ankit Tiwari", Singer: "Ved Sharma" },
        { Songname: "Ghungroo", Film: "War", Music_director: "Vishal-Shekhar", Singer: "Arijit Singh" },
        { Songname: "Kal Ho Na Ho", Film: "Kal Ho Na Ho", Music_director: "Shankar-Ehsaan-Loy", Singer: "Sonu Nigam" }
    ]);
    console.log(sng);
    res.send("Data Inserted")
})


router.get("/songs", async (req, res) => {
    let songs = await Song.find();
    let count = await Song.find().countDocuments();
    res.json({ "songs": songs, "count": count })
})

router.get("/songs/filter", async (req, res) => {
    try {
        const { director, singer } = req.query;

        // validation (important)
        if (!director || !singer) {
            return res.status(400).send("Director and Singer are required");
        }

        const songs = await Song.find({
            Music_director: director,
            Singer: singer
        });

        res.send(songs);
    } catch (e) {
        res.status(500).send("Server Error");
    }
});

// specified music director songs
router.get("/songs/:director", async (req, res) => {
    let director = req.params.director;
    let songs = await Song.find({ Music_director: director })

    res.json(songs)
})

router.delete("/songs/:name", async (req, res) => {
    let name = req.params.name;
    let deletedUsr = await Song.deleteOne({ Songname: name })
    res.json(deletedUsr)
})


// Add new song which is your favourite.
router.post("/add", async (req, res) => {
    let { Songname, Film, Music_director, Singer } = req.body;
    const newSong = new Song({
        Songname,
        Film,
        Music_director,
        Singer
    });

    const savedSong = await newSong.save();

    res.status(201).json(savedSong);
})

// specific song + specific singer
router.get("/singer/filter", async (req, res) => {
    try {
        const { song, singer } = req.query;

        // validation (important)
        if (!song || !singer) {
            return res.status(400).send("Songname and Singer are required");
        }

        const songs = await Song.find({
            Songname: song,
            Singer: singer
        });

        res.send(songs);
    } catch (e) {
        res.status(500).send("Server Error");
    }
});

// Update Actor Actress
router.put("/update/:name", async (req, res) => {
    await Song.updateOne(
        { Songname: req.params.name },
        { $set: req.body }
    );

    res.send("Updated");
});

// Table view
router.get("/table", async (req, res) => {
    const songs = await Song.find();

    let html = `
    <table border="1" cellpadding="10">
        <tr>
            <th>Song</th>
            <th>Film</th>
            <th>Director</th>
            <th>Singer</th>
            <th>Actor</th>
            <th>Actress</th>
        </tr>
    `;

    songs.forEach(s => {
        html += `
        <tr>
            <td>${s.Songname}</td>
            <td>${s.Film}</td>
            <td>${s.Music_director}</td>
            <td>${s.Singer}</td>
            <td>${s.Actor || "-"}</td>
            <td>${s.Actress || "-"}</td>
        </tr>`;
    });

    html += "</table>";

    res.send(html);
});

module.exports = router;