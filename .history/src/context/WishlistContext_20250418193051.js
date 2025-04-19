import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/users/${user.userId}`;
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setWishlist(response.data.wishlist || []);
      } catch (err) {
        console.error('Fetch wishlist error:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to load wishlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const addToWishlist = async (bookId) => {
    if (!user) throw new Error('Please create a profile to add to wishlist');
    try {
      const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/users/${user.userId}/wishlist`;
      const response = await axios.put(API_URL, { bookId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setWishlist(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Add to wishlist error:', err.response?.data);
      throw new Error(err.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (bookId) => {
    if (!user) throw new Error('Please create a profile to remove from wishlist');
    try {
      const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/users/${user.userId}/wishlist`;
      const response = await axios.put(API_URL, { bookId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setWishlist(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Remove from wishlist error:', err.response?.data);
      throw new Error(err.response?.data?.message || 'Failed to remove from wishlist');
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, loading, error }}>
      {children}
    </WishlistContext.Provider>
  );
};