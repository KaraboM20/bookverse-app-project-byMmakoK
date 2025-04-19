import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/wishlist'; // Adjust to your deployed URL if needed

  // Fetch wishlist on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setWishlist(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch wishlist. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const addToWishlist = async (item) => {
    try {
      const response = await axios.post(API_URL, item);
      setWishlist((prev) => {
        if (!prev.some((i) => i.id === item.id)) {
          return [...prev, response.data];
        }
        return prev;
      });
      setError(null);
    } catch (err) {
      setError('Failed to add item to wishlist.');
      console.error(err);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setWishlist((prev) => prev.filter((item) => item.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to remove item from wishlist.');
      console.error(err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, loading, error }}>
      {children}
    </WishlistContext.Provider>
  );
};