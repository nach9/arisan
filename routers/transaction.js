// require express
const express = require('express')
const router = express.Router()

// require express-session
const session = require('express-session')

// require model
const Models = require('../models')



//detail trx
router.get('/detail/:user/:group',(req,res)=>{

	let condition = {
		where:{
			UserId: req.params.user,
			GroupId: req.params.group
		}
	}

	Models.Transaction.findAll(condition).then(userTrx=>{
		res.send(userTrx)
	})

})

//add trx
router.get('/add/:id',(req,res)=>{
	let condition={
		where :{GroupId:req.params.id }
	}
	Models.UserGroup.findAll(condition).then(data=>{
		data.forEach(user=>{
			Models.Transaction.create().then(()=>{
				console.log('add data');
			})
		})
	})



})


module.exports = router
