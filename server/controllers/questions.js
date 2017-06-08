const User = require(`../models/user`)
const bcrypt = require(`bcrypt`)
const saltRounds = 10
const jwt = require(`jsonwebtoken`)

var create = ((req,res) => {
  if(req.body.password.length !== 0) {
    if(req.body.password.length < 8) {
      res.send({errors: {password: {message: `Password length should not be less than 8 characters`}}})
    }
    else {
      let newUser = new User ({
        name: req.body.name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        email: req.body.email,
        phone: req.body.phone
      })
      newUser.save((err, createdUser) => {
        res.send(err ? err : createdUser)
      })
    }
  }
  else {
    res.send({errors: {password: {message: `Password should not be empty`}}})
  }
})

var showAll = ((req,res) => {
  User.find((err, users) => {
    res.send(err ? err : users)
  })
})

var showOne = ((req,res) => {
  User.findById(req.params.id, (err, user) => {
    res.send(err ? err : user)
  })
})

var update = ((req,res) => {
  User.findById(req.params.id, (err, user) => {
    if(err) res.send(err)
    else {
      user.name = req.body.name || user.name
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.phone = req.body.phone || user.phone
      if(req.body.password.length > 0) {
        if(req.body.password.length < 8) {
          res.send({errors: {password: {message: `Password length should not be less than 8 characters`}}})
        }
        else {
          user.password = bcrypt.hashSync(req.body.password,saltRounds)
          user.save((err, updatedUser) => {
            res.send(err ? err : updatedUser)
          })
        }
      }
      else {
        user.password = user.password
        user.save((err, updatedUser) => {
          res.send(err ? err : updatedUser)
        })
      }
    }
  })
})

var destroy = ((req,res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    res.send(err ? err : user)
  })
})

module.exports = {
  create,
  showAll,
  showOne,
  update,
  destroy
}
