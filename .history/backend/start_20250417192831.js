require('dotenv').config();
const mongoose = require('mongoose');

// Load models
require('./models/Book');
require('./models/ser');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookverse', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

require('./index');