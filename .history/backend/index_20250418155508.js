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
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(400).json({ message: 'Failed to add book' });
  }
});

// User Routes
app.post('/api/users/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, wishlist: [] });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.status(201).json({
      message: 'Profile created successfully',
      token,
      user: { id: user._id, username, email },
    });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('wishlist');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { username, email, password, wishlist } = req.body;
    const updateData = { username, email, wishlist };
    if (password) updateData.password = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(400).json({ message: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

app.put('/api/users/:id/wishlist', async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.wishlist.includes(bookId)) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);
    } else {
      user.wishlist.push(bookId);
    }
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    console.error('Error updating wishlist:', err);
    res.status(400).json({ message: 'Failed to update wishlist' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`**Server** running on port ${PORT}`));