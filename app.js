require('dotenv').config()
const dbConnection = require('./model/dbConfig')
const express = require('express');
const cors = require('cors')



const app = express();
const port = 5500;


//userRoute middleware file
const userRoutes = require('./route/userRoute');

//cross origin resource sharing
app.use(cors())

//json middlware
app.use(express.json())
//use userRoute middlware

app.use('/api/users', userRoutes)



app.listen(port, (error)=>{
    if(error){
        console.log(error.message)
    }else{
        console.log(`listening on ${port}`)
    }
})
