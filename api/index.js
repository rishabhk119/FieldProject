const app = require('../server/src/app');
const connectDB = require('../server/src/config/db');

// Connect to MongoDB
connectDB();

// Export the Express app for Vercel's serverless environment
module.exports = app;
