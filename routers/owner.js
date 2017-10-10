// require express
const express = require('express')
const router = express.Router()

// require express-session
const session = require('express-session')

// require model
const model = require('../models')

router.get('/', function(req, res) {
	res.render('owners/index')
})

module.exports = router