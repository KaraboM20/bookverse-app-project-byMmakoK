const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Book = require('../models/Book'); // Add Book model for validation
const authMiddleware = require('../middleware/auth'); // Add auth middleware

// POST /api/users/register - Create a new user profile
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.status(201).json({
      message: 'Profile created successfully',
      token,
      user: { id: user._id, username, email },
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/users/:userId/wishlist - Add or remove a book from wishlist
router.put('/:userId/wishlist', authMiddleware, async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate book
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if book is already in wishlist
    const isInWishlist = user.wishlist.includes(bookId);

    if (isInWishlist) {
      // Remove book from wishlist
      user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);
    } else {
      // Add book to wishlist
      user.wishlist.push(bookId);
    }

    // Save updated user
    await user.save();

    // Populate wishlist with book details
    const updatedUser = await User.findById(userId).populate('wishlist');

    res.status(200).json({
      message: isInWishlist ? 'Book removed from wishlist' : 'Book added to wishlist',
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    console.error('Wishlist update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/users/:userId - Get user wishlist
router.get('/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error('Fetch wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;