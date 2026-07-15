const mongoose = require('mongoose');
const winston = require('../utils/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    winston.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    winston.error(`MongoDB Connection Error: ${error.message}`);
    winston.info('Retrying MongoDB connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  winston.info('MongoDB connection closed on app termination');
  process.exit(0);
});

module.exports = connectDB;
