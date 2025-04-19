const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded; // decoded = { userId: '...' }

    
    if (req.params.userId && req.params.userId !== decoded.userId) {
      return res.status(403).json({ message: 'Unauthorized: User ID mismatch' });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }

    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
