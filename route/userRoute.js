const express = require('express')
const router = express.Router()

//authentication midware file
const authMidlware = require('../middlware/authMidlware')
//controller file
const {Register, Login, Check} = require('../controller/userController')

//Register route
router.post('/register', Register)

//Login route
router.post('/login', Login)


//Check route
router.get('/check',authMidlware , Check)




module.exports = router

