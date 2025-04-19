const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Book = mongoose.model('Book');

const seedBooks = async () => {
  try {
    // Clear existing books
    await Book.deleteMany({});
    console.log('Existing books cleared');

    // Seed new books
    console.log('Seeding books collection...');
    const dataPath = path.join(__dirname, 'books-data.json');
    const booksData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    await Book.insertMany(booksData);
    console.log('Books seeded successfully');
  } catch (err) {
    console.error('Error seeding books:', err);
    throw err;
  }
};

module.exports = seedBooks;