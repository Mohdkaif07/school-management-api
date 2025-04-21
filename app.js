const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes');

// Middleware to parse JSON
app.use(express.json());

// Use your school routes
app.use('/', schoolRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
