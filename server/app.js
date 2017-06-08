const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var cors = require('cors')

const app = express()

const db_config = {
  development: 'mongodb://localhost/hacktivfeud',
  test: 'mongodb://localhost/hacktivfeud-test'
}

const curr_env = app.settings.env
mongoose.connect(db_config[curr_env])

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const users = require('./routes/users')

app.use('/api/users', users)

app.listen(3000)

module.exports = app
