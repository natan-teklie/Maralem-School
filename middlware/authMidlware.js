const userController = require('../controller/userController')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')

async function authMidlware(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"authentication invalid"});
    }
    const token = authHeader.split(' ')[1];
    // console.log(token)
    // console.log(authHeader)
    try {
        const {username, userid} = jwt.verify(token, "secret")
        req.user = {username, userid}
        // return res.status(StatusCodes.OK).json({data})
        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"authentication invalid"})
    }
    
}
module.exports = authMidlware