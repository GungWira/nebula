const mysql = require('mysql')

// var db = mysql.createConnection({
//   host : 'localhost',
//   user : 'root',
//   password : '',
//   database : 'nebula'
// })
var db = mysql.createConnection({
  host : 'btbood9ke5vnkf9flxqe-mysql.services.clever-cloud.com',
  user : 'un9w33mbwj9affgq',
  password : '1LcLbE8J2bTGwNVChW9J',
  database : 'btbood9ke5vnkf9flxqe'
})

module.exports = db;