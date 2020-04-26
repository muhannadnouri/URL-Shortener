const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const database = require('./database.js')

const {
    createShortLink,
    openShortLink
} = require('./url.controller.js')

const PORT = process.env.PORT || 3000

const app = express()

database.connect()

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.post('/createShortLink', createShortLink)
app.get('/:uniqueName', openShortLink)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT} ✅`)
})
