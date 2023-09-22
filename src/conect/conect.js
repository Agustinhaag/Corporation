const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.host_db,
    user: process.env.user_db,
    password: process.env.password_db,
    database: process.env.database,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})



module.exports ={
  conect: pool.promise()
}