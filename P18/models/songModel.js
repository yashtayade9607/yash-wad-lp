const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    Songname: {
        type: String,
        required: true
    },
    Film: String,
    Music_director: String,
    Singer: String,
    Actor: String,
    Actress: String
})

const Song = mongoose.model("song_details", songSchema)
module.exports = Song;