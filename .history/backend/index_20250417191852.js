const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Book = require('./models/Book');
const User = require('./models/User');
const seedBooks = require('./seed');

const app = express();

app.use(cors());
app.use(express.json());

// Run seeding after connection
seedBooks();

// Book Routes
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add book' });
  }
});

// User Routes
app.post('/api/users/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, wishlist: [] });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to register user' });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('wishlist');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { username, email, password, wishlist } = req.body;
    const updateData = { username, email, wishlist };
    if (password) updateData.password = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.put('/api/users/:id/wishlist', async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.wishlist.includes(bookId)) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);
    } else {
      user.wishlist.push(bookId);
    }
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update wishlist' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`**Server** running on port ${PORT}`));