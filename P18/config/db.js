const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/music").then(() => {
    console.log('database connected')
}).catch((error) => {
    console.log('database connection failed')
    console.log("error : ", error)
})
