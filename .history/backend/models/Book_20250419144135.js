const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const authMiddleware = require('../middleware/auth');

router.post('/multiple', authMiddleware, async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'Invalid or empty book IDs' });
  }
  try {
    const books = await Book.find({ _id: { $in: ids } });
    res.json(books);
  } catch (err) {
    console.error('Fetch multiple books error:', err);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

module.exports = router;