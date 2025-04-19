import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const WishlistContext = createContext();

const API_BASE_URL = 'https://bookverse-app-project.onrender.com';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch wishlist on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/wishlist`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setWishlist(response.data.map(item => item._id).filter(id => id));
      } catch (err) {
        setError('Failed to load wishlist');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  // Toggle book in wishlist
  const toggleWishlist = async (bookId) => {
    if (!bookId) {
      setError('Invalid book ID');
      return false;
    }

    const isInWishlist = wishlist.includes(bookId);
    setLoading(true);
    try {
      if (isInWishlist) {
        // Remove from wishlist
        await axios.delete(`${API_BASE_URL}/wishlist/${bookId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setWishlist(wishlist.filter(id => id !== bookId));
        console.log('Removed from Wishlist:', bookId);
        return false; // Indicates book was removed
      } else {
        // Add to wishlist
        await axios.post(
          `${API_BASE_URL}/wishlist`,
          { bookId },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setWishlist([...wishlist, bookId]);
        console.log('Added to Wishlist:', bookId);
        return true; // Indicates book was added
      }
    } catch (err) {
      setError('Failed to update wishlist');
      console.error(err);
      return isInWishlist; // Return current state on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, loading, error }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);