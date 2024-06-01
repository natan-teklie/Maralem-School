const mysql2 = require('mysql2');

const dbConnection = mysql2.createPool({
    user:'MAdmin',
    database:'maralem school',
    host:"localhost",
    password:"123456789",
    connectionLimit:10
})

dbConnection.execute("select 'test'", (error,result) =>{
    if(error){
        console.log(error.message)
    }else{
        console.log(result)
    }
})

module.exports = dbConnection.promise()