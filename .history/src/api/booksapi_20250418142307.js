import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';
const USER_API_URL = '/api/users';

// Get all books
export const getAllBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};

// Add a new book
export const addBook = async (bookData) => {
  try {
    const response = await axios.post(API_URL, bookData);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw new Error('Failed to add book');
  }
};

// Get book by ID
export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    throw new Error('Failed to fetch book');
  }
};

// Delete a book
export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw new Error('Failed to delete book');
  }
};

// Update a book
export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw new Error('Failed to update book');
  }
};

// Toggle book in wishlist
export const toggleWishlist = async (userId, bookId) => {
  try {
    const response = await axios.put(`${USER_API_URL}/${userId}/wishlist`, { bookId });
    return response.data;
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    throw new Error('Failed to update wishlist');
  }
};