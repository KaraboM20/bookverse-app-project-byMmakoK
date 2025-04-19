import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { AuthContext } from '../context/AuthContext';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import './Wishlistpage.css';

const Wishlistpage = () => {
  const { wishlist, toggleWishlist, loading, error } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [wishlistBooks, setWishlistBooks] = useState([]);

  // Fetch full book details for wishlist IDs
  useEffect(() => {
    const fetchWishlistBooks = async () => {
      if (!wishlist || wishlist.length === 0) {
        setWishlistBooks([]);
        return;
      }
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');
        const bookIds = wishlist.map((item) => item._id).filter((id) => id && id.match(/^[0-9a-fA-F]{24}$/));
        if (bookIds.length === 0) {
          setWishlistBooks([]);
          return;
        }
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/books/multiple`,
          { ids: bookIds },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const validBooks = (response.data || []).filter((book) => book && book._id && book.title);
        console.log('Wishlist books fetched:', validBooks);
        setWishlistBooks(validBooks);
      } catch (err) {
        console.error('Fetch wishlist books error:', err.message);
        setLocalError('Failed to load wishlist books');
      }
    };
    fetchWishlistBooks();
  }, [wishlist]);

  if (!user) {
    history.push('/create-profile');
    return null;
  }

  const handleRemoveFromWishlist = async (bookId) => {
    try {
      setLocalError(null);
      setSuccess(null);
      const response = await toggleWishlist(bookId);
      const isInWishlist = response.wishlist.some((item) => item._id === bookId);
      if (!isInWishlist) {
        setSuccess('Book removed from wishlist!');
        console.log('Removed from Wishlist:', bookId);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Remove wishlist error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setLocalError(err.message || 'Failed to remove book');
    }
  };

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">My Wishlist</h1>
      {loading && <p className="wishlist-loading">Loading wishlist...</p>}
      {(error || localError) && (
        <p className="wishlist-error">{error || localError}</p>
      )}
      {!loading && !error && !localError && wishlistBooks.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlistBooks.map((book) => (
            <div key={book._id} className="wishlist-card">
              <img
                src={book.image || 'https://via.placeholder.com/150'}
                alt={book.title}
                className="wishlist-card-img"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
              />
              <div className="wishlist-card-content">
                <h2 className="wishlist-card-title">{book.title}</h2>
                <p className="wishlist-card-author">{book.author || 'Unknown Author'}</p>
                <button
                  onClick={() => handleRemoveFromWishlist(book._id)}
                  className="wishlist-remove-btn"
                >
                  <FaHeart className="wished" /> Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {success && <p className="wishlist-success">{success}</p>}
    </div>
  );
};

export default Wishlistpage;