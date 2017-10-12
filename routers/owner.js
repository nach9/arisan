// require express
const express = require('express')
const router = express.Router()

// require model
const Models = require('../models')

// require helper for check authentication
const checkAuth = require('../helpers/checkAuth')
router.use(checkAuth)

//get owners detail
router.get('/',(req,res)=>{
	let condition={
		where:{UserId:req.session.userId},
		include:[Models.Group]
	}
	Models.Owner.findAll(condition).then(dataOwner=>{
		res.render('owners/index', {rows: dataOwner})
	})
})

//create group
router.get('/create',(req,res)=>{
	res.render('owners/create')
})

//create group
router.post('/create',(req,res)=>{
	let condition1={
		groupName: req.body.groupName,
		description: req.body.description  ,
		amount:req.body.amount
	}
	Models.Group.create(condition1).then(newGroup=>{
		let condition2={
			UserId:req.session.userId,
			GroupId:newGroup.id
		}
		Models.Owner.create(condition2).then((newOwner)=>{
			res.redirect('/owner')
		})
	})
})

router.get('/detail/:groupid' , (req,res)=>{
	let condition={
		include:[Models.User]
	}
	Models.Group.findById( req.params.groupid,condition).then(dataGroup=>{
		res.render('owners/detail', {rows: dataGroup})
	})
})

// belum -----------------------------------------------------------------
router.get('/:id/detail/:groupid/addmember', (req,res)=>{
	Models.User.findAll().then((dataUser)=>{
		res.send(dataUser)
	})
})

router.post('/:id/detail/:groupid/addmember', (req,res)=>{
	let condition={
		UserId: req.body.UserId,
		GroupId: req.params.groupid
	}
	console.log(condition)
	Models.UserGroup.create(condition).then((newUser)=>{
		// res.send(newUser)
		res.render('owners/addmember', {rows: newUser})
	})
})

router.get('/:id/detail/:groupid/delete', (req,res)=>{
	let condition={
		include:[Models.User],
		where:{
			id:req.params.groupid
		}
	}
	Models.Group.findAll(condition).then((dataUser)=>{
		res.send(dataUser)
	})
})

router.post('/:id/detail/:groupid/delete', (req,res)=>{
	let condition={
		where:{
			UserId: req.body.UserId,
			groupid : req.params.groupid
		}
	}
	Models.UserGroup.destroy(condition).then((deletedUser)=>{
		res.send(deletedUser)
	})
})





module.exports = router
