require('dotenv').config();
const mongoose = require('mongoose');

// Load models
require('./models/Book');
require('./models/User');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookverse', {
  serverSelectionTimeoutMS: 30000, 
  socketTimeoutMS: 45000,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

require('./index');