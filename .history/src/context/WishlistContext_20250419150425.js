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
      const userResponse = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const bookIds = (userResponse.data.wishlist || []).filter(
        (id) => id && typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)
      );
      console.log('Wishlist book IDs:', bookIds);

      if (bookIds.length === 0) {
        setWishlist([]);
        return;
      }

      const booksResponse = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/books/multiple`,
        { ids: bookIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const validBooks = (booksResponse.data || []).filter(
        (book) => book && book._id && book.title
      );
      console.log('Wishlist books fetched:', validBooks);
      setWishlist(validBooks);
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
          ? 'User or books not found.'
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
    if (!bookId || typeof bookId !== 'string' || !bookId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('Invalid book ID format');
    }
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found. Please log in again.');
      const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/users/${user.userId}/wishlist`;
      const isInWishlist = wishlist.some((book) => book._id === bookId);
      console.log('Toggling wishlist:', { API_URL, bookId, userId: user.userId, isInWishlist });

      const response = await axios.put(
        API_URL,
        { bookId, action: isInWishlist ? 'remove' : 'add' },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Toggle wishlist response:', response.data);

      await fetchWishlist();
      setError(null);
      return !isInWishlist; // true = added, false = removed
    } catch (err) {
      console.error('Toggle wishlist error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        bookId,
        userId: user.userId,
      });
      const errorMessage =
        err.response?.status === 401
          ? 'Authentication failed. Please log in again.'
          : err.response?.status === 400
          ? err.response?.data?.message || 'Invalid book ID or wishlist update failed.'
          : err.response?.status === 404
          ? 'User or book not found.'
          : err.response?.data?.message || 'Failed to update wishlist';
      setError(errorMessage);
      throw new Error(errorMessage);
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