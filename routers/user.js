// require express
const express = require('express')
const router = express.Router()

// require model
const Models = require('../models')

// require helper for check authentication
const checkAuth = require('../helpers/checkAuth')
router.use(checkAuth)

router.get('/', function(req, res) {
	res.render('users/index')
})

module.exports = router