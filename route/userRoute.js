const express = require('express')
const router = express.Router()


//controller file
const {Register, Login, Check} = require('../controller/userController')

//Register route
router.post('/register', Register)

//Login route
router.post('/login', Login)


//Check route
router.get('/check', Check)




module.exports = router

