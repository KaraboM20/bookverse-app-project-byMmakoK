const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Book = require('./models/Book');

const seedBooks = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB is not connected, skipping seeding');
      return false;
    }

    await Book.deleteMany({});
    console.log('Existing books cleared');

    console.log('Seeding books collection...');
    const dataPath = path.join(__dirname, 'books-data.json');
    const booksData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    await Book.insertMany(booksData);
    console.log('Books seeded successfully');
    return true;
  } catch (err) {
    console.error('Error seeding books:', err.message);
    return false; 
  }
};

module.exports = seedBooks;