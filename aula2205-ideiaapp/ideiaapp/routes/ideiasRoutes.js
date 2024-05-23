const express = require('express')
const router = express.Router()
const IdeiasController = require('../controllers/IdeiaController')
const IdeiaController = require('../controllers/IdeiaController')

router.get('/add', IdeiaController.createIdeia)
router.post('/add', IdeiaController.createIdeiaSave)
router.post('/remove', IdeiaController.removeIdeia)
router.get('//edit/:id', IdeiaController.updateIdeia)
router.get('/ideia', IdeiaController.createIdeia)
router.get('/dashboard', IdeiaController.dashboard)
router.get('/', IdeiaController, IdeiasController.showIdeias)

module.exports = router 