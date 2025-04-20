require('dotenv').config();
const mongoose = require('mongoose');

// Load models
require('./models/Book');
require('./models/User');

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000, 
  socketTimeoutMS: 45000,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err));
  process.exit(1);

require('./index');