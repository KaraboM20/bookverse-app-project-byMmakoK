aconst mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Use existing Book model defined in index.js
const Book = mongoose.model('Book');

const seedBooks = async () => {
  try {
    // Check if books collection is empty
    const bookCount = await Book.countDocuments();
    if (bookCount > 0) {
      console.log('Books collection already populated, skipping seeding');
      return;
    }

    console.log('Seeding books collection...');

    // Read the sample data
    const dataPath = path.join(__dirname, 'books-data.json');
    const booksData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Insert new books
    await Book.insertMany(booksData);
    console.log('Books seeded successfully');
  } catch (err) {
    console.error('Error seeding books:', err);
    throw err;
  }
};

module.exports = seedBooks;