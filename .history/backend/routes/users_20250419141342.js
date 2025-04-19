const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/auth');

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
    console.log('Wishlist request:', { userId, bookId });

    // Validate inputs
    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate book
    const book = await Book.findById(bookId);
    if (!book) {
      console.log('Book not found:', bookId);
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if book is in wishlist (convert to string for comparison)
    const isInWishlist = user.wishlist.some((id) => id.toString() === bookId);
    console.log('Is book in wishlist?', isInWishlist);

    if (isInWishlist) {
      // Remove book from wishlist
      user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);
      console.log('Removing book from wishlist:', bookId);
    } else {
      // Add book to wishlist
      user.wishlist.push(bookId);
      console.log('Adding book to wishlist:', bookId);
    }

    // Save updated user
    await user.save();

    // Populate wishlist with book details
    const updatedUser = await User.findById(userId).populate('wishlist');
    console.log('Updated wishlist:', updatedUser.wishlist);

    res.status(200).json({
      message: isInWishlist ? 'Book removed from wishlist' : 'Book added to wishlist',
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    console.error('Wishlist update error:', {
      message: error.message,
      stack: error.stack,
      userId,
      bookId,
    });
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/users/:userId - Get user wishlist
router.get('/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    console.log('Fetching wishlist for user:', userId);
    const user = await User.findById(userId).populate('wishlist');
    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error('Fetch wishlist error:', {
      message: error.message,
      stack: error.stack,
      userId,
    });
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;