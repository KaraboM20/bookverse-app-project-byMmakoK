const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Book = require('./models/book');

const seedBooks = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/bookverse');
    console.log('MongoDB connected for seeding');
    await Book.deleteMany({});
    console.log('Existing books cleared');
    const dataPath = path.join(__dirname, 'books-data.json');
    const booksData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    await Book.insertMany(booksData);
    console.log('Books seeded successfully');
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error seeding books:', err);
    process.exit(1);
  }
};

seedBooks();