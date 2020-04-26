const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl : {
        type : String,
        required : true
    },
    uniqueName : {
        type : String,
        required : true
    },
    dateCreated : {
        type : Date,
        default : Date.now
    }
})

const URL = mongoose.model('URL', urlSchema)

module.exports = URL