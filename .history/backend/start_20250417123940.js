const mongoose = require('mongoose');
const seedBooks = require('./seed');

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/bookverse');
    console.log('MongoDB connected');

    // Seed the database
    await seedBooks();

    // Start the Express server (requires index.js)
    require('./index');
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
};

startServer();