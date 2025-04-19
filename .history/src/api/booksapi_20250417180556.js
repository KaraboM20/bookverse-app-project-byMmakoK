import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';


export const fetchBooks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
};

// Get all books
export const getAllBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Add a new book
export const addBook = async (bookData) => {
  try {
    const response = await axios.post(API_URL, bookData);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

// Get book by ID
export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    throw error;
  }
};

// Delete a book
export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

// Update a book
export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};
