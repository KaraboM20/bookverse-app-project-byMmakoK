const mongoose = require('mongoose');
const seedBooks = require('./seed');

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookverse');
    console.log('MongoDB connected');

    // Load index.js to define models and endpoints
    require('./index');

    // Seed the database
    await seedBooks();
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
};

startServer();