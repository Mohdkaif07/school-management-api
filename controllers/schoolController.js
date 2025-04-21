const db = require('../db/connection');
const { getDistance } = require('../utils/distance');

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: 'School added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error });
  }
};

exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const [schools] = await db.execute('SELECT * FROM schools');
    
    const sorted = schools
      .map((school) => ({
        ...school,
        distance: getDistance(parseFloat(latitude), parseFloat(longitude), school.latitude, school.longitude)
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error });
  }
};
