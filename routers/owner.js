// require express
const express = require('express')
const router = express.Router()


const Models = require('../models')

// require express-session
const session = require('express-session')



router.get('/', function(req, res) {
	res.render('owners/index')

})

router.get('/:id',(req,res)=>{
	let condition={
		where:{UserId:req.params.id},
		include:[{model:Models.Group}]
	}

	Models.Owner.findAll(condition).then(dataOwner=>{
		res.send(dataOwner)
	})

})

router.get('/:id/create',(req,res)=>{
	let condition1={
		groupName: 'hi',
		description: 'hi' ,
		amount:10000
	}

	Models.Group.create(condition1).then(newGroup=>{
		let condition2={
			UserId:req.params.id,
			GroupId:newGroup.id
		}
		Models.Owner.create(condition2).then((newOwner)=>{
			res.send('hi')
		})
	})




})





module.exports = router
