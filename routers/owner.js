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
		// res.send(dataOwner[0].Group.groupName)
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
	Models.Group.findById(req.params.groupid, condition).then(dataGroup=>{
		res.render('owners/detail', {rows: dataGroup})
		// res.send(dataGroup)
	})
})

router.get('/detail/:groupid/addmember', (req,res)=>{
	Models.User.findAll().then((dataUser)=>{
		// res.send(dataUser)
		res.render('owners/addmember', {rows: dataUser, groupid: req.params.groupid})
	})
})

router.post('/detail/:groupid/addmember', (req,res)=>{
	let condition={
		UserId: req.body.UserId,
		GroupId: req.params.groupid
	}
	// res.send(condition)
	Models.UserGroup.create(condition).then((newUser)=>{
		// res.render('owners/detail', {rows: newUser, groupid: req.params.groupid})
		res.redirect('/owner')
	})
})

router.get('/detail/:groupid/:userid/delete', (req,res)=>{
	let condition={
		include:[Models.User],
		where:{
			// UserId: req.params.userid,
			id:req.params.groupid
		}
	}
	Models.Group.findOne(condition).then((dataUser)=>{
		// res.send(dataUser.Users[0].getFullName())
		// res.send(dataUser[0].Users[0].UserGroup)
		res.render('owners/deletemember', {rows: dataUser, userid: req.params.userid})
		// res.send(req.params)
	})
})

router.post('/detail/:groupid/:userid/delete', (req,res)=>{
	let condition={
		where:{
			UserId: req.params.userid,
			GroupId : req.params.groupid
		}
	}
	console.log(condition)
	// res.send('condition')
	Models.UserGroup.destroy(condition).then((deletedUser)=>{
		// res.send(deletedUser)
		res.redirect('/owner')
	})
})



module.exports = router
