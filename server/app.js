const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var cors = require('cors')

const app = express()

app.use(cors())

const db_config = {
  //development: 'mongodb://localhost/hacktivfeud',
  development: 'mongodb://ingelieur:tsubasa@ds117592.mlab.com:17592/hacktiv-feud',
  test: 'mongodb://localhost/hacktivfeud-test'
}

const curr_env = app.settings.env
mongoose.connect(db_config[curr_env])

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const index = require('./routes/index')
const users = require('./routes/users')
const questions = require('./routes/questions')

app.use('/', index)
app.use('/api/users', users)
app.use('/api/questions', questions)

app.listen(3000)

module.exports = app
