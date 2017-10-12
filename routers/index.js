// require express
const express = require('express')
const router = express.Router()

// require express-session
const session = require('express-session')

// require model
const Models = require('../models')

// require helpers encryt
const encrypt = require('../helpers/encrypt')

// require helpers salt
const salt = require('../helpers/generateSalt')

// require helper for check authentication
const checkAuth = require('../helpers/checkAuth')
// router.use(checkAuth)

router.get('/', checkAuth, function(req, res) {
	res.redirect('login')
})

router.get('/login', function(req, res) {
	res.render('login')
})

router.post('/login', function(req, res) {
	Models.User.findOne({where: {email: req.body.email}}).then((dataUser) => {
		if (encrypt(req.body.password, dataUser.salt) === dataUser.password) {
			req.session.auth = true
			req.session.role = dataUser.role
			req.session.userId = dataUser.id
			req.session.fullname = dataUser.getFullName()
			res.redirect('/user')
		} else {
			res.redirect('/login')
		}
	})
})

router.get('/signup', function(req, res) {
	res.render('signup')
})

router.get('/logout', function (req, res) {
	req.session.destroy(function(err) {
		res.redirect('/login')
	})
})

module.exports = router

