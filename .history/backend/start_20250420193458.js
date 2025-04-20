require('dotenv').config();
const mongoose = require('mongoose');
const seedBooks = require('./seed');

// Load models
require('./models/Book');
require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
  serverSelectionTimeoutMS: 30000, 
  socketTimeoutMS: 45000,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
  });

require('./index');