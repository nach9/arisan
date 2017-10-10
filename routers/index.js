// require express
const express = require('express')
const router = express.Router()

// require express-session
const session = require('express-session')

// require model
const model = require('../models')

router.get('/', function(req, res) {
	res.render('index')
})

router.get('/login', function(req, res) {
	res.render('login')
})

router.get('/signup', function(req, res) {
	res.render('signup')
})


module.exports = router

