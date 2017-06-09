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

    it(`should give warning that options are required`, (done) => {
      chai.request(server)
        .post(`/api/questions`)
        .send({
          title: `Bubur Ayam`,
          content: `Bagaimana cara kamu makan bubur?`,
          options: [``],
        })
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body.errors.options.message).to.equal(`There should be 5 options for each question.`)
            done()
          }
        })
    })
  })

    describe(`GET /api/questions`, () => {
      it(`should successfully get questions`, (done) => {
        chai.request(server)
          .get(`/api/questions`)
          .end((err,res) => {
            if (err) done(err)
            else {
              expect(res).to.have.status(200)
              expect(res.body).to.be.a(`array`)
              expect(res.body[0]).to.have.property(`title`)
              expect(res.body[0]).to.have.property(`content`)
              expect(res.body[0]).to.have.property(`options`)
              expect(res.body[0].title).to.equal(`Bubur Ayam`)
              expect(res.body[0].content).to.equal(`Bagaimana cara kamu makan bubur?`)
              expect(res.body[0].options).to.be.a(`array`)
              expect(res.body[0].options).to.have.lengthOf(5)
              expect(res.body[0].options[1]).to.equal(`Tidak diaduk`)
              dataId = res.body[0]._id
              done()
            }
          })
      })
    })

  describe(`GET /api/questions/:id`, () => {
    it(`should successfully get a question`, (done) => {
      chai.request(server)
        .get(`/api/questions/${dataId}`)
        .end((err,res) => {
          if (err) done(err)
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
            expect(res.body.options[1]).to.equal(`Tidak diaduk`)
            done()
          }
        })
    })
  })

  describe(`PUT /api/questions`, () => {
    it(`should successfully modify a question`, (done) => {
      chai.request(server)
        .put(`/api/questions/${dataId}`)
        .send({
          title: `Bubur Ayam`,
          content: `Bagaimana cara kamu makan bubur?`,
          options: [`Diaduk`, `Langsung makan`, `Makan kerupuknya dulu`, `Buburnya saja ga pakai apa-apa`, `Makan langsung dari panci si tukang bubur`],
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
            expect(res.body.options[1]).to.equal(`Langsung makan`)
            done()
          }
        })
    })
  })

  describe(`DELETE /api/questions`, () => {
    it(`should successfully delete a question`, (done) => {
      chai.request(server)
        .delete(`/api/questions/${dataId}`)
        .end((err,res) => {
          if(err) done(err)
          else {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a(`object`)
            expect(res.body).to.have.property(`content`)
            expect(res.body.title).to.equal(`Bubur Ayam`)
            done()
          }
        })
    })
  })
})
