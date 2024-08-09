// index.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection (Sequelize)
const sequelize = require('./config/sequelize');
const User = require('./models/User');

// Sync database
sequelize.sync()
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.error('Error setting up the database:', err));

// Routes
const authRoutes = require('./routes/auth'); // Example route
app.use('/api/auth', authRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
