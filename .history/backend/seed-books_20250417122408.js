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
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/bookverse');
    console.log('MongoDB connected for seeding');

    // Clear existing books to avoid duplicates
    await Book.deleteMany({});
    console.log('Existing books cleared');

    // Read the sample data
    const dataPath = path.join(__dirname, 'books-data.json');
    const booksData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Insert new books
    await Book.insertMany(booksData);
    console.log('Books seeded successfully');

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error seeding books:', err);
    process.exit(1);
  }
};

seedBooks();node