// db/connection.js
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'kaif',
  database: 'school_database'
});
module.exports = pool.promise();
