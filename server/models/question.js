const mongoose = require('mongoose')
const Schema = mongoose.Schema

var questionSchema = new Schema ({
  title: {
    type: String,
  },
  content: {
    type: String,
    required: [true, '{PATH} should not be empty'],
    unique: true
  },
  options: {
    type: [String],
    required: [true, '{PATH} should not be empty']
  }
})

var question = mongoose.model('question', questionSchema)

module.exports = question
