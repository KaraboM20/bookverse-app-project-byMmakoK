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

  if (!user) {
    history.push('/create-profile');
    return null;
  }

  const handleToggleWishlist = async (bookId) => {
    try {
      await toggleWishlist(bookId);
      console.log('Removed from Wishlist:', bookId);
      setLocalError(null);
    } catch (err) {
      console.error('Toggle wishlist error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setLocalError(err.message);
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
            .filter((item) => item && item._id)
            .map((item) => (
              <div key={item._id} className="wishlist-card">
                <img
                  src={item.image || 'https://via.placeholder.com/150'}
                  alt={item.title}
                  className="wishlist-card-img"
                />
                <div className="wishlist-card-content">
                  <h2 className="wishlist-card-title">{item.title}</h2>
                  <p className="wishlist-card-author">{item.author || 'Unknown Author'}</p>
                  <button
                    onClick={() => handleToggleWishlist(item._id)}
                    className={`wishlist-remove-btn ${
                      wishlist.some((book) => book && book._id === item._id)
                        ? 'wished'
                        : 'not-wished'
                    }`}
                  >
                    <FaHeart /> Remove from Wishlist
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Wishlistpage;