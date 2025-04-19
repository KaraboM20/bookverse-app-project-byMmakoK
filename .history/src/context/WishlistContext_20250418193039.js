import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWishlist = async () => {
    if (!user || !user.userId) {
      setWishlist([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/users/${user.userId}`;
      console.log('Fetching wishlist:', API_URL);
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Wishlist response:', response.data.wishlist);
      setWishlist(response.data.wishlist || []);
    } catch (err) {
      console.error('Fetch wishlist error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(err.response?.data?.message || 'Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const addToWishlist = async (bookId) => {
    if (!user || !user.userId) throw new Error('Please create a profile to add to wishlist');
    if (!bookId) throw new Error('Invalid book ID');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/users/${user.userId}/wishlist`;
      console.log('Adding to wishlist:', { API_URL, bookId });
      const response = await axios.put(API_URL, { bookId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Add to wishlist response:', response.data);
      await fetchWishlist(); // Refetch to ensure state is updated
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Add to wishlist error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      throw new Error(err.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (bookId) => {
    if (!user || !user.userId) throw new Error('Please create a profile to remove from wishlist');
    if (!bookId) throw new Error('Invalid book ID');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/users/${user.userId}/wishlist`;
      console.log('Removing from wishlist:', { API_URL, bookId });
      const response = await axios.put(API_URL, { bookId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Remove from wishlist response:', response.data);
      await fetchWishlist(); // Refetch to ensure state is updated
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Remove from wishlist error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      throw new Error(err.response?.data?.message || 'Failed to remove from wishlist');
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, loading, error }}>
      {children}
    </WishlistContext.Provider>
  );
};