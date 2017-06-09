const router = require('express').Router()
const Question = require('../controllers/questions')

router.post('/', Question.create)
router.get('/', Question.showAll)
router.get('/:id', Question.showOne)
router.put('/:id', Question.update)
router.delete('/:id', Question.destroy)

module.exports = router
