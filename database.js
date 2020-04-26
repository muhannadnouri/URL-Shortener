const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/url'

const connect = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('database connection successful ✅'))
        .catch(error => console.log(error))

    mongoose.connection.on('error', error => {
        console.log('database connection failed \n', error.message)
    })
}

module.exports = {
    connect
}