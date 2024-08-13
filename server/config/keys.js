// Load environment variables from the .env file
require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI, // MongoDB connection string
  jwtSecret: process.env.JWT_SECRET, // JWT secret key for token signing
  anotherAPIKey: process.env.ANOTHER_API_KEY, // Any other API key you might have
};
