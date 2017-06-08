const chai = require(`chai`)
const chaiHttp = require(`chai-http`)
const bcrypt = require(`bcrypt`)
const saltRounds = 10
chai.use(chaiHttp);

const expect = chai.expect

const server = require(`../app`)
const Question = require (`../models/question`)

describe(`Questions`, () => {
  after((done) => {
    Question.remove({}, (err) => {
      done()
    })
  })

  var dataId = ""

  describe(`POST /api/questions`, () => {
    it(`should successfully create a question`, (done) => {
      chai.request(server)
        .post(`/api/questions`)
        .send({
          title: `Bubur Ayam`,
          content: `Bagaimana cara kamu makan bubur?`,
          options: [`Diaduk`, `Tidak diaduk`, `Makan kerupuknya dulu`, `Buburnya saja ga pakai apa-apa`, `Makan langsung dari panci si tukang bubur`],
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a(`object`)
            expect(res.body).to.have.property(`title`)
            expect(res.body).to.have.property(`content`)
            expect(res.body).to.have.property(`options`)
            expect(res.body.title).to.equal(`Bubur Ayam`)
            expect(res.body.content).to.equal(`Bagaimana cara kamu makan bubur?`)
            expect(res.body.options).to.be.a(`array`)
            expect(res.body.options).to.have.lengthOf(5)
            done()
          }
        })
    })
  })

    //  describe(`GET /api/questions`, () => {
    //    it(`should successfully get questions`, (done) => {
    //      chai.request(server)
    //        .get(`/api/questions`)
    //        .end((err,res) => {
    //          if (err) done(err)
    //          else {
    //            expect(res).to.have.status(200)
    //            expect(res.body).to.be.a(`array`)
    //            expect(res.body[0]).to.have.property(`name`)
    //            expect(res.body[0]).to.have.property(`questionname`)
    //            expect(res.body[0]).to.have.property(`email`)
    //            expect(res.body[0]).to.have.property(`password`)
    //            expect(res.body[0]).to.have.property(`phone`)
    //            expect(res.body[0].name).to.equal(`Shabrina V. Inmas`)
    //            expect(res.body[0].questionname).to.equal(`ingelieur`)
    //            expect(bcrypt.compareSync(`123456789`, res.body[0].password)).to.be.true
    //            expect(res.body[0].email).to.equal(`shabrina@inmas.com`)
    //            expect(res.body[0].phone).to.equal(`081219000000`)
    //            dataId = res.body[0]._id
    //            done()
    //          }
    //        })
    //    })
    //  })
    //
    //  describe(`GET /api/questions/:id`, () => {
    //    it(`should successfully get a question`, (done) => {
    //      chai.request(server)
    //        .get(`/api/questions/${dataId}`)
    //        .end((err,res) => {
    //          if (err) done(err)
    //          else {
    //            expect(res).to.have.status(200)
    //            expect(res.body).to.be.a(`object`)
    //            expect(res.body).to.have.property(`name`)
    //            expect(res.body).to.have.property(`questionname`)
    //            expect(res.body).to.have.property(`email`)
    //            expect(res.body).to.have.property(`password`)
    //            expect(res.body).to.have.property(`phone`)
    //            expect(res.body.name).to.equal(`Shabrina V. Inmas`)
    //            expect(res.body.questionname).to.equal(`ingelieur`)
    //            expect(bcrypt.compareSync(`123456789`, res.body.password)).to.be.true
    //            expect(res.body.email).to.equal(`shabrina@inmas.com`)
    //            expect(res.body.phone).to.equal(`081219000000`)
    //            done()
    //          }
    //        })
    //    })
    //  })
    //
    //  describe(`PUT /api/questions`, () => {
    //    it(`should successfully modify a question`, (done) => {
    //      chai.request(server)
    //        .put(`/api/questions/${dataId}`)
    //        .send({
    //          name: `Shabrina V. Inmas`,
    //          questionname: `esviai`,
    //          password: `123456789`,
    //          email: `shabrina@inmas.com`,
    //          phone: `081219000000`
    //        })
    //        .end((err,res) => {
    //          if(err) done(err)
    //          else {
    //            expect(res).to.have.status(200)
    //            expect(res.body).to.be.a(`object`)
    //            expect(res.body).to.have.property(`questionname`)
    //            expect(res.body.questionname).to.equal(`esviai`)
    //            done()
    //          }
    //        })
    //    })
    //
    //    it(`should give warning regarding password length`, (done) => {
    //      chai.request(server)
    //        .put(`/api/questions/${dataId}`)
    //        .send({
    //          name: ``,
    //          questionname: ``,
    //          password: `123`,
    //          email: ``,
    //          phone: ``
    //        })
    //        .end((err,res) => {
    //          if(err) done(err)
    //          else {
    //            expect(res).to.have.status(200)
    //            expect(res.body.errors).to.have.property(`password`)
    //            expect(res.body.errors.password.message).to.equal(`Password length should not be less than 8 characters`)
    //            done()
    //          }
    //        })
    //    })
    //  })
    //
    //  describe(`DELETE /api/questions`, () => {
    //    it(`should successfully delete a question`, (done) => {
    //      chai.request(server)
    //        .delete(`/api/questions/${dataId}`)
    //        .end((err,res) => {
    //          if(err) done(err)
    //          else {
    //            expect(res).to.have.status(200)
    //            expect(res.body).to.be.a(`object`)
    //            expect(res.body).to.have.property(`questionname`)
    //            expect(res.body.questionname).to.equal(`esviai`)
    //            done()
    //          }
    //        })
    //    })
    //  })
})
