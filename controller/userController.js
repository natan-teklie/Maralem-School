const dbConnection = require('../model/dbConfig')
const bcrypt = require('bcrypt')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')

//Register
async function Register (req, res) {
  const {username, firstname, lastname, email, password} = req.body;

  if(!username || !firstname || !lastname || !email || !password){
   return res.status(StatusCodes.BAD_REQUEST).json({msg:"please fill all required filds"})
    
  }
  
  try {
    const [user] = await dbConnection.query("select username, userid, password from users where username = ?  or  email = ?", [username, email]);
    if(user.length > 0){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"user already existed"})
    }
    if(password.length < 8){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be at least 8 character"})
         
       }


       //password encryption
       const salt = await bcrypt.genSalt()
       const hashedpassword = await bcrypt.hash(password, salt)


    await dbConnection.query('INSERT INTO users(username, firstname, lastname, email, password) VALUES(?,?,?,?,?)', [username, firstname, lastname, email, hashedpassword]);
    return res.status(StatusCodes.CREATED).json({msg:"user created"})
  } catch (error) { 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong please try again later"})
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error})
  }

}


//Login
async function Login (req, res){
    const{email, password} = req.body;
    
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"please fill all requiered filds"})
    }
    try {
        const [user] = await dbConnection.query("select userid, username, password from users where email = ?",[email] )
        //if I want to look what user looks like I can 
        // return res.json({user:user})
        if(user.length ==0){
            console.log(user)
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"})
        }
        //check password by comparing given password
      const isMatch =  await bcrypt.compare(password, user[0].password)
      if(!isMatch){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid request"})
      }
      
      //token generation
      const username = user[0].username;
      const userid = user[0].userid;
      const token = await jwt.sign({username, userid}, 'secret', {expiresIn:'1d'});
      return res.status(StatusCodes.OK).json({msg:"successfully login", token, username})
    } catch (error) {
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong please try again"})
        return res.json({error:error.message})
    }
}


function Check(req,res){
    res.send('Hi there.This is check route')
}

module.exports = {Register, Login, Check}