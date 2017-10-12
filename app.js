// require express
const express = require('express')
const app = express()

const session = require('express-session')
app.use(session({
	secret: 'arisanyuk',
	resave: false,
  	saveUninitialized: true
}))

// require public
app.use(express.static('./public'))

// require body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// require ejs
app.set('view engine', 'ejs')

// route index
const index = require('./routers/index')
app.use('/', index)

// route user
const user = require('./routers/user')
app.use('/user', user)

// route owner
const owner = require('./routers/owner')
app.use('/owner', owner)

// route group
const group = require('./routers/group')
app.use('/group', group)

// route transaction
const transaction = require('./routers/transaction')
app.use('/trx', transaction)

app.listen(3000)
console.log('Listening on port 3000')
