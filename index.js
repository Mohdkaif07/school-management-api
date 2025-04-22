<<<<<<< HEAD
// const express = require('express');
// const app = express();
// const schoolRoutes = require('./routes/schoolRoutes');

// // Middleware to parse JSON
// app.use(express.json());

// // Use your school routes
// app.use('/', schoolRoutes);

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

=======
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

>>>>>>> f69c7dcc09001eb9d70f30049eb1708ee6befbe0
const app = express();
app.use(cors());
app.use(express.json());

// Read from Railway-provided environment variables
const dbConfig = {
  host: process.env.MYSQLHOST || 'mysql.railway.internal',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || 'UALpbLSdCokkIklReNCQluMptbwrxdZl',
  database: process.env.MYSQLDATABASE || 'railway',
  port: process.env.MYSQLPORT || 3306,
};

// MySQL pool
let db;
mysql.createPool(dbConfig)
  .then(pool => {
    db = pool;
    console.log('✅ Connected to Railway MySQL');
  })
  .catch(err => {
    console.error('❌ MySQL connection error:', err);
  });

// Route to create table and insert dummy school
app.get('/add-dummy-school', async (req, res) => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        address VARCHAR(255),
        latitude DECIMAL(9,6),
        longitude DECIMAL(9,6)
      )
    `);

    await db.execute(`
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `, ['Test School', 'Sample Address', 12.9716, 77.5946]);

    res.send('✅ Dummy school inserted & table created!');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error inserting dummy data');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
