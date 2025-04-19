import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWishlist = useCallback(async () => {
    if (!user || !user.userId) {
      setWishlist([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found. Please log in again.');
      const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/users/${user.userId}`;
      console.log('Fetching wishlist:', API_URL);
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const validWishlist = (response.data.wishlist || []).filter(
        (item) => item && item._id
      );
      console.log('Wishlist response:', validWishlist);
      setWishlist(validWishlist);
    } catch (err) {
      console.error('Fetch wishlist error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      const errorMessage =
        err.response?.status === 401
          ? 'Authentication failed. Please log in again.'
          : err.response?.status === 404
          ? 'User not found.'
          : err.response?.data?.message || 'Failed to load wishlist';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const toggleWishlist = async (bookId) => {
    if (!user || !user.userId) {
      throw new Error('Please create a profile to modify wishlist');
    }
    if (!bookId) {
      throw new Error('Invalid book ID');
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found. Please log in again.');
      const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/users/${user.userId}/wishlist`;
      console.log('Toggling wishlist:', { API_URL, bookId });
      const response = await axios.put(
        API_URL,
        { bookId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Toggle wishlist response:', response.data);
      await fetchWishlist();
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Toggle wishlist error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      const errorMessage =
        err.response?.status === 401
          ? 'Authentication failed. Please log in again.'
          : err.response?.status === 400
          ? 'Invalid book ID or wishlist update failed.'
          : err.response?.status === 404
          ? 'User or book not found.'
          : err.response?.data?.message || 'Failed to update wishlist';
      throw new Error(errorMessage);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, loading, error }}>
      {children}
    </WishlistContext.Provider>
  );
};