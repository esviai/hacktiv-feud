const mongoose = require('mongoose')
const Schema = mongoose.Schema

var questionSchema = new Schema ({
  title: {
    type: String,
    required: [true, '{PATH} should not be empty'],
    unique: true
  },
  content: {
    type: String,
    unique: true
  },
  options: {
    type: [String],
    required: [true, '{PATH} should not be empty']
  }
})

var user = mongoose.model('question', userSchema)

module.exports = question
