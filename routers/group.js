// require express
const express = require('express')
const router = express.Router()

// require express-session
const session = require('express-session')

// require model
const Models = require('../models')

router.get('/', function(req, res) {
	res.render('groups/index')
})

router.get('/:id',(req,res)=>{
	let condition={
		include:[Models.Group]
	}
	Models.User.findById(req.params.id,condition).then((dataUser)=>{
		res.send(dataUser)
	})
})


module.exports = router
