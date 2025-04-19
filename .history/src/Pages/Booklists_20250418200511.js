import React, { useState, useEffect, useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import { getAllBooks } from '../api/booksapi';
import './Booklists.css';
import { WishlistContext } from '../context/WishlistContext';
import { AuthContext } from '../context/AuthContext';

const Booklists = () => {
  const { addToWishlist, wishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await getAllBooks();
        console.log('Fetched books:', data);
        setBooks(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch books error:', err.message);
        setError(err.message || 'Failed to load books');
        setLoading(false);
      }
    };
    getBooks();
  }, []);

  const handleAddToWishlist = async (bookId) => {
    if (!user) {
      setError('Please create a profile to add to wishlist');
      return;
    }
    if (!bookId) {
      setError('Invalid book ID');
      return;
    }
    try {
      setError(null);
      setSuccess(null);
      await addToWishlist(bookId);
      setSuccess('Book added to wishlist!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Add to wishlist error in Booklists:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(err.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(price);
  };

  if (loading) return <div className="loading">Loading books...</div>;
  if (error && !books.length) return <div className="error">Error: {error}</div>;

  return (
    <div className="booklists-container">
      <h2>Book Collection</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="books-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <div className="heart-container">
              <FaHeart
                className={`heart-icon ${
                  wishlist.some((item) => item && item._id === book._id) ? 'wished' : ''
                }`}
                onClick={() => handleAddToWishlist(book._id)}
                title={wishlist.some((item) => item && item._id === book._id) ? 'In Wishlist' : 'Add to Wishlist'}
              />
            </div>
            <img
              src={book.image || 'https://via.placeholder.com/150'}
              alt={book.title}
              className="book-image"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
            />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author || 'Unknown Author'}</p>
            <p><strong>Genre:</strong> {book.genre || 'N/A'}</p>
            <p><strong>Price:</strong> {formatPrice(book.price)}</p>
            <p><strong>Stock:</strong> {book.stockQuantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booklists;