const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool with the variables from the environment
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,           // Use MYSQL_HOST from environment
  user: process.env.MYSQL_USER,           // Use MYSQL_USER from environment
  password: process.env.MYSQL_PASSWORD,   // Use MYSQL_PASSWORD from environment
  database: process.env.MYSQL_DATABASE,   // Use MYSQL_DATABASE from environment
  port: process.env.MYSQL_PORT || 3306    // Default to 3306 if MYSQL_PORT is not set
});

module.exports = pool.promise();

