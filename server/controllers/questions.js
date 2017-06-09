const Question = require(`../models/question`)

var create = ((req,res) => {
  console.log(req.body.options[0])
  if(req.body.options.length !== 5) {
    res.send({errors: {options: {message: `There should be 5 options for each question.`}}})
  }
  else {
      let newQuestion = new Question ({
        title: req.body.title,
        content: req.body.content,
        options: req.body.options
      })
      newQuestion.save((err, createdQuestion) => {
        res.send(err ? err : createdQuestion)
      })
    }
})

var showAll = ((req,res) => {
  Question.find((err, questions) => {
    res.send(err ? err : questions)
  })
})

var showOne = ((req,res) => {
  Question.findById(req.params.id, (err, question) => {
    res.send(err ? err : question)
  })
})

var update = ((req,res) => {
  Question.findById(req.params.id, (err, question) => {
    if(err) res.send(err)
    else {
      question.title = req.body.title || question.title
      question.content = req.body.content || question.content
      if(req.body.options.length > 0) {
        if(req.body.options.length !== 5) {
          res.send({errors: {options: {message: `There should be 5 options for each question.`}}})
        }
        else {
          question.options = req.body.options
          question.save((err, updatedQuestion) => {
            res.send(err ? err : updatedQuestion)
          })
        }
      }
      else {
        question.options = question.options
        question.save((err, updatedQuestion) => {
          res.send(err ? err : updatedQuestion)
        })
      }
    }
  })
})

var destroy = ((req,res) => {
  Question.findByIdAndRemove(req.params.id, (err, question) => {
    res.send(err ? err : question)
  })
})

module.exports = {
  create,
  showAll,
  showOne,
  update,
  destroy
}
