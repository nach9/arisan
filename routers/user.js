// require express
const express = require('express')
const router = express.Router()

// require express-session
const session = require('express-session')

// require model
const model = require('../models')

// untuk menghandle /user
router.get('/', function(req, res) {
	res.redirect('/')
})

router.get('/:id', function(req, res) {
	res.render('users/index')
})



module.exports = router