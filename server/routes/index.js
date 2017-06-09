const router = require('express').Router()
const Cron = require('../controllers/cron')
const User = require('../controllers/users')

//router.get('/', Cron.start)
router.post('/signIn', User.signin)
router.post('/signup', User.create)

module.exports = router
