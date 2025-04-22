
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
const mysql = require('mysql2/promise'); // Use promise-based API
const cors = require('cors');

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

(async function() {
  try {
    db = await mysql.createPool(dbConfig); // Use await for creating pool
    console.log('✅ Connected to Railway MySQL');
  } catch (err) {
    console.error('❌ MySQL connection error:', err);
  }
})();

// Route to create table and insert dummy school
app.get('/add-dummy-school', async (req, res) => {
  try {
    // Create the table if it doesn't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        address VARCHAR(255),
        latitude DECIMAL(9,6),
        longitude DECIMAL(9,6)
      )
    `);

    // Insert a dummy school
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

// Route to list schools
app.get('/listSchools', async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).send('❌ Latitude and longitude are required!');
  }

  try {
    // Fetch all schools from the database
    const [rows] = await db.execute('SELECT * FROM schools');
    
    // Calculate distance and add to response
    const schoolsWithDistance = rows.map(school => {
      const distance = calculateDistance(latitude, longitude, school.latitude, school.longitude);
      return { ...school, distance };
    });

    // Sort schools by distance (ascending order)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    // Send the list of schools with distance
    res.json(schoolsWithDistance);
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error fetching schools');
  }
});

// Function to calculate the distance between two lat/long points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

// Route to add a new school
app.post('/addSchool', async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate input data
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).send('❌ All fields (name, address, latitude, longitude) are required!');
  }

  try {
    // Insert the new school into the database
    await db.execute(`
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `, [name, address, latitude, longitude]);

    res.status(201).send('✅ School added successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error adding school');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
