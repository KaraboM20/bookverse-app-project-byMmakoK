const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Define Book schema (copied from index.js)
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  image: { type: String }
});
const Book = mongoose.model('Book', bookSchema);

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
    throw err; // Let the caller handle the error
  }
};

module.exports = seedBooks;