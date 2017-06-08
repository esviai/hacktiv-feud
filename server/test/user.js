const chai = require('chai')
const chaiHttp = require('chai-http')
const bcrypt = require('bcrypt')
const saltRounds = 10
chai.use(chaiHttp);

const expect = chai.expect

const server = require('../app')
const user = require ('../models/user')

describe('Users', () => {
  it('should successfully create a user', (done) => {
    chai.request(server)
      .post('/api/users')
      .send({
        name: 'Shabrin V. Inmas',
        username: 'ingelieur',
        password: '123456789',
        email: 'shabrina@inmas.com',
        phone: '081219000000'
      })
      .end((err,res) => {
        if(err) done(err)
        else {
          let hashPassword =
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('username')
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('password')
          expect(res.body).to.have.property('phone')
          expect(res.body.name).to.equal('Shabrina V. Inmas')
          expect(res.body.username).to.equal('ingelieur')
          expect(bcrypt.compareSync(req.body.password, bcrypt.hashSync(req.body.password, saltRounds))).to.be.true
          expect(res.body.email).to.equal('shabrina@inmas.com')
          expect(res.body.phone).to.equal('081219000000')
        }
      })
  })

})
