const router = require('express').Router()
const User = require('../controllers/users')

router.post('/', User.create)
router.get('/', User.showAll)
router.get('/:id', User.showOne)
router.put('/:id', User.update)
router.delete('/:id', User.destroy)

module.exports = router
