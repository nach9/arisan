// require express
const express = require('express')
const router = express.Router()

// require model
const Models = require('../models')

// require helper for check authentication
const checkAuth = require('../helpers/checkAuth')
router.use(checkAuth)

router.get('/',(req,res)=>{
	let condition={
		include:[Models.Group]
	}
	Models.User.findById(req.session.userId,condition).then((dataUser)=>{
		res.render('groups/index', {rows: dataUser})
	})
})

router.get('/detail/:groupid' , (req,res)=>{
	let condition={
		include:[Models.User]
	}
	Models.Group.findById( req.params.groupid,condition).then(dataGroup=>{
		res.render('groups/detail', {rows: dataGroup})
	})
})

module.exports = router