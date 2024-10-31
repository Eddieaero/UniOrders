require('dotenv').config();
const mysql = require('mysql2');

// Create MySQL connection pool
const pool = mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    queueLimit: 0
});


module.exports = pool.promise();