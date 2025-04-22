app.get('/add-dummy-school', async (req, res) => {
  try {
    const [result] = await db.execute(`
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

    res.send('Dummy school inserted & table created!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting dummy data');
  }
});

