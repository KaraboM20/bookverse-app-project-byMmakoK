const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  image: { type: String },
});

module.exports = mongoose.model('Book', bookSchema);