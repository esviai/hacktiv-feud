const router = require('express').Router()
const Cron = require('../controllers/cron')

router.get('/', Cron.start)

module.exports = router
