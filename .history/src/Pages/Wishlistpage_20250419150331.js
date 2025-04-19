import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { AuthContext } from '../context/AuthContext';
import { FaHeart } from 'react-icons/fa';
import './Wishlistpage.css';

const Wishlistpage = () => {
  const { wishlist, toggleWishlist, loading, error } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!user) {
    history.push('/create-profile');
    return null;
  }

  const handleRemoveFromWishlist = async (bookId) => {
    try {
      setLocalError(null);
      setSuccess(null);
      const isAdded = await toggleWishlist(bookId);
      if (!isAdded) {
        setSuccess('Book removed from wishlist!');
        console.log('Removed from Wishlist:', bookId);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setLocalError('Failed to remove book');
      console.error('Remove wishlist error:', err.message);
    }
  };

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">My Wishlist</h1>
      {loading && <p className="wishlist-loading">Loading wishlist...</p>}
      {(error || localError) && (
        <p className="wishlist-error">{error || localError}</p>
      )}
      {!loading && !error && !localError && wishlist.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist
            .filter((book) => book && book._id && book.title)
            .map((book) => (
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