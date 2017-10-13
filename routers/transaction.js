// require express
const express = require('express')
const router = express.Router()

// require express-session
const session = require('express-session')

// require model
const Models = require('../models')

const moment = require('moment');

const sequelize = require('sequelize')

const queryOwner = require('../helpers/ownerTransaction')


//detail trx
// router.get('/detail/:user/:group',(req,res)=>{
//
// 	let condition = {
// 		where:{
// 			UserId: req.params.user,
// 			GroupId: req.params.group
// 		}
// 	}
//
// 	Models.Transaction.findAll(condition).then(userTrx=>{
// 		res.send(userTrx)
// 	})
//
// })

//add trx
router.get('/add/:id',(req,res)=>{
	let condition={
		where :{GroupId:req.params.id }
	}
	Models.UserGroup.findAll(condition).then(dataUser=>{
		let nowTime = new Date()
		dataUser.forEach(user=>{
			let monthIndex=0
			Models.UserGroup.findAll(condition).then(dataMonth=>{
				dataMonth.forEach(Month=>{
					let newData = {
						UserId:Month.UserId,
						GroupId:Month.GroupId,
						month: moment(nowTime).add(monthIndex,'months').format("YYYYMM")
					}
					Models.Transaction.create(newData).then(()=>{
						console.log('add data');
						res.send('done')
					})
					monthIndex++
				})
			})
		})
	})

})
const rundec = require('../helpers/decrypt')

//list trx buat user
router.get('/detail/:id',(req,res)=>{
	Models.sequelize.query(queryOwner(req,res)[0], { type: sequelize.QueryTypes.SELECT})
	  .then(users => {
			res.send(users)
 	  })

})

//list trx buat owner
router.get('/detail/:id/:owner',(req,res)=>{
	Models.sequelize.query(queryOwner(req,res)[1], { type: sequelize.QueryTypes.SELECT})
	  .then(users => {
			res.send(users)
 	  })

})

const nodemailer = require('nodemailer');
router.get('/email',(req,res)=>{
	const transporter = nodemailer.createTransport({
	 service: 'gmail',
	 auth: {
	        user: 'myproject.h8@gmail.com',
	        pass: rundec('6df9a5bfd96cca4c4aea5242c16b61fd','aris')
	    }
	});



	const mailOptions = {
  from: 'myproject.h8@gmail.com', // sender address
  to: 'nur.achdiansyah@gmail.com', // list of receivers
  subject: 'Reminder Arisan', // Subject line
  html: '<p>Your html here</p>'// plain text body
	};

	transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});

})



module.exports = router
