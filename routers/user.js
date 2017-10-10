// require express
const express = require('express')
const router = express.Router()


const Models = require('../models')

router.get('/', function(req, res) {
	res.render('users/index')
})

router.get('/:id', (req,res)=>{


})




module.exports = router

