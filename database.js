const {createConnection}=require('mysql')

const pool=createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'student'
},console.log('connected to the database'))

module.exports=pool
