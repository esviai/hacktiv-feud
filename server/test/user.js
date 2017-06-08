const chai = require(`chai`)
const chaiHttp = require(`chai-http`)
const bcrypt = require(`bcrypt`)
const saltRounds = 10
chai.use(chaiHttp);

const expect = chai.expect

const server = require(`../app`)
const User = require (`../models/user`)
//const Question = require (`../models/question`)

describe(`Users`, () => {
  after((done) => {
    User.remove({}, (err) => {
      done()
    })
  })

  var dataId = ""

  describe(`POST /api/users`, () => {
    it(`should successfully create a user`, (done) => {
      chai.request(server)
        .post(`/api/users`)
        .send({
          name: `Shabrina V. Inmas`,
          username: `ingelieur`,
          password: `123456789`,
          email: `shabrina@inmas.com`,
          phone: `081219000000`
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a(`object`)
            expect(res.body).to.have.property(`name`)
            expect(res.body).to.have.property(`username`)
            expect(res.body).to.have.property(`email`)
            expect(res.body).to.have.property(`password`)
            expect(res.body).to.have.property(`phone`)
            expect(res.body.name).to.equal(`Shabrina V. Inmas`)
            expect(res.body.username).to.equal(`ingelieur`)
            expect(bcrypt.compareSync(`123456789`, res.body.password)).to.be.true
            expect(res.body.email).to.equal(`shabrina@inmas.com`)
            expect(res.body.phone).to.equal(`081219000000`)
            done()
          }
        })
    })

    it(`should give warning that username should be unique`, (done) => {
      chai.request(server)
        .post(`/api/users`)
        .send({
          name: `Shabrina V. Inmas`,
          username: `ingelieur`,
          password: `123456789`,
          email: `shabrina@inmas.com`,
          phone: `081219000000`
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body.code).to.equal(11000)
            done()
          }
        })
    })

    it(`should give warning that email should be unique`, (done) => {
      chai.request(server)
        .post(`/api/users`)
        .send({
          name: `Shabrina V. Inmas`,
          username: `esviai`,
          password: `123456789`,
          email: `shabrina@inmas.com`,
          phone: `081219000001`
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body.code).to.equal(11000)
            done()
          }
        })
    })

    it(`should give warning that phone should be unique`, (done) => {
      chai.request(server)
        .post(`/api/users`)
        .send({
          name: `Shabrina V. Inmas`,
          username: `esviai`,
          password: `123456789`,
          email: `shabrina@virta.com`,
          phone: `081219000000`
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body.code).to.equal(11000)
            done()
          }
        })
    })

    it(`should give warning that username is required`, (done) => {
      chai.request(server)
        .post(`/api/users`)
        .send({
          name: `Shabrina V. Inmas`,
          username: ``,
          password: `123456789`,
          email: `shabrina@virta.com`,
          phone: `081219000001`
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body.errors).to.have.property(`username`)
            expect(res.body.errors.username.message).to.equal(`username should not be empty`)
            done()
          }
        })
    })

    it(`should give warning that email is required`, (done) => {
      chai.request(server)
        .post(`/api/users`)
        .send({
          name: `Shabrina V. Inmas`,
          username: `esviai`,
          password: `123456789`,
          email: ``,
          phone: `081219000001`
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body.errors).to.have.property(`email`)
            expect(res.body.errors.email.message).to.equal(`email should not be empty`)
            done()
          }
        })
    })

    it(`should give warning that phone is required`, (done) => {
      chai.request(server)
        .post(`/api/users`)
        .send({
          name: `Shabrina V. Inmas`,
          username: `esviai`,
          password: `123456789`,
          email: `shabrina@virta.com`,
          phone: ``
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body.errors).to.have.property(`phone`)
            expect(res.body.errors.phone.message).to.equal(`phone should not be empty`)
            done()
          }
        })
    })

    it(`should give warning regarding username length`, (done) => {
      chai.request(server)
        .post(`/api/users`)
        .send({
          name: `Shabrina V. Inmas`,
          username: `svi`,
          password: `123456789`,
          email: `shabrina@virta.com`,
          phone: `081219000001`
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body.errors).to.have.property(`username`)
            expect(res.body.errors.username.message).to.equal(`username should not be less than five characters`)
            done()
          }
        })
    })

    it(`should give warning regarding password length`, (done) => {
      chai.request(server)
        .post(`/api/users`)
        .send({
          name: `Shabrina V. Inmas`,
          username: `svi`,
          password: `123`,
          email: `shabrina@virta.com`,
          phone: `081219000001`
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body.errors).to.have.property(`password`)
            expect(res.body.errors.password.message).to.equal(`Password length should not be less than 8 characters`)
            done()
          }
        })
    })

    it(`should give warning regarding email format`, (done) => {
      chai.request(server)
        .post(`/api/users`)
        .send({
          name: `Shabrina V. Inmas`,
          username: `svi`,
          password: `123456789`,
          email: `shabrina@virta`,
          phone: `081219000001`
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body.errors).to.have.property(`email`)
            expect(res.body.errors.email.message).to.equal(`shabrina@virta is not a valid email.`)
            done()
          }
        })
    })

    it(`should give warning regarding phone minlength`, (done) => {
      chai.request(server)
        .post(`/api/users`)
        .send({
          name: `Shabrina V. Inmas`,
          username: `svi`,
          password: `123456789`,
          email: `shabrina@virta.com`,
          phone: `08121900`
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body.errors).to.have.property(`phone`)
            expect(res.body.errors.phone.message).to.equal(`The value of phone (08121900) should not be shorter than 10 characters.`)
            done()
          }
        })
    })

    it(`should give warning regarding phone maxlength`, (done) => {
      chai.request(server)
        .post(`/api/users`)
        .send({
          name: `Shabrina V. Inmas`,
          username: `svi`,
          password: `123456789`,
          email: `shabrina@virta.com`,
          phone: `0812190000000000`
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body.errors).to.have.property(`phone`)
            expect(res.body.errors.phone.message).to.equal(`The value of phone (0812190000000000) exceeds the maximum allowed length (13).`)
            done()
          }
        })
    })
  })

  describe(`GET /api/users`, () => {
    it(`should successfully get users`, (done) => {
      chai.request(server)
        .get(`/api/users`)
        .end((err,res) => {
          if (err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a(`array`)
            expect(res.body[0]).to.have.property(`name`)
            expect(res.body[0]).to.have.property(`username`)
            expect(res.body[0]).to.have.property(`email`)
            expect(res.body[0]).to.have.property(`password`)
            expect(res.body[0]).to.have.property(`phone`)
            expect(res.body[0].name).to.equal(`Shabrina V. Inmas`)
            expect(res.body[0].username).to.equal(`ingelieur`)
            expect(bcrypt.compareSync(`123456789`, res.body[0].password)).to.be.true
            expect(res.body[0].email).to.equal(`shabrina@inmas.com`)
            expect(res.body[0].phone).to.equal(`081219000000`)
            dataId = res.body[0]._id
            done()
          }
        })
    })
  })

  describe(`GET /api/users/:id`, () => {
    it(`should successfully get a user`, (done) => {
      chai.request(server)
        .get(`/api/users/${dataId}`)
        .end((err,res) => {
          if (err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a(`object`)
            expect(res.body).to.have.property(`name`)
            expect(res.body).to.have.property(`username`)
            expect(res.body).to.have.property(`email`)
            expect(res.body).to.have.property(`password`)
            expect(res.body).to.have.property(`phone`)
            expect(res.body.name).to.equal(`Shabrina V. Inmas`)
            expect(res.body.username).to.equal(`ingelieur`)
            expect(bcrypt.compareSync(`123456789`, res.body.password)).to.be.true
            expect(res.body.email).to.equal(`shabrina@inmas.com`)
            expect(res.body.phone).to.equal(`081219000000`)
            done()
          }
        })
    })
  })

  describe(`PUT /api/users`, () => {
    it(`should successfully modify a user`, (done) => {
      chai.request(server)
        .put(`/api/users/${dataId}`)
        .send({
          name: `Shabrina V. Inmas`,
          username: `esviai`,
          password: `123456789`,
          email: `shabrina@inmas.com`,
          phone: `081219000000`
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a(`object`)
            expect(res.body).to.have.property(`username`)
            expect(res.body.username).to.equal(`esviai`)
            done()
          }
        })
    })

    it(`should give warning regarding password length`, (done) => {
      chai.request(server)
        .put(`/api/users/${dataId}`)
        .send({
          name: ``,
          username: ``,
          password: `123`,
          email: ``,
          phone: ``
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body.errors).to.have.property(`password`)
            expect(res.body.errors.password.message).to.equal(`Password length should not be less than 8 characters`)
            done()
          }
        })
    })
  })

  describe(`DELETE /api/users`, () => {
    it(`should successfully delete a user`, (done) => {
      chai.request(server)
        .delete(`/api/users/${dataId}`)
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a(`object`)
            expect(res.body).to.have.property(`username`)
            expect(res.body.username).to.equal(`esviai`)
            done()
          }
        })
    })
  })
})
