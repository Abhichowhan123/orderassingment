const {createPool} = require('mysql')
const mysql = require('mysql2')
const Host = process.env.DB_HOST;
const User = process.env.DB_USERNAME;
const Password = process.env.DB_PASSWORD;
const Database = process.env.DB_DATABASE;
const Port = process.env.DB_PORT
// const pool = createPool({
//     host:Host,
//     user:User,
//     password:Password,
//     database:Database
// })
// module.exports = pool;
const pool = mysql.createConnection({
    host:'127.0.0.1',
    port:'3306',
    user:'user',
    password:'123',
    database:'Mysql',
})
pool.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("database connected");
    }
})
module.exports = pool;