import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { addBook } from '../api/booksapi';
import './Addnewpage.css';

const Addnewpage = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    price: '',
    stockQuantity: '',
    image: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { title, author, isbn, genre, price, stockQuantity } = formData;
    if (!title || title.length < 2) {
      setError('Title must be at least 2 characters long');
      return false;
    }
    if (!author || author.length < 2) {
      setError('Author must be at least 2 characters long');
      return false;
    }
    if (!isbn || !/^\d{10,13}$/.test(isbn)) {
      setError('ISBN must be 10 or 13 digits');
      return false;
    }
    if (!genre || genre.length < 2) {
      setError('Genre must be at least 2 characters long');
      return false;
    }
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      setError('Price must be a positive number');
      return false;
    }
    if (!stockQuantity || isNaN(stockQuantity) || parseInt(stockQuantity, 10) < 0) {
      setError('Stock quantity must be a non-negative number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    try {
      const bookData = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity, 10),
      };
      console.log('Submitting book:', bookData);
      await addBook(bookData);
      setSuccess('Book added successfully!');
      setFormData({
        title: '',
        author: '',
        isbn: '',
        genre: '',
        price: '',
        stockQuantity: '',
        image: '',
      });
      setShowForm(false);
    } catch (err) {
      console.error('Add book error:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to add book. Please try again.');
    }
  };

  const toggleForm = () => {
    if (!user) {
      setError('Please create a profile to continue');
      history.push('/create-profile');
    } else {
      setShowForm((prev) => !prev);
      setError(null);
    }
  };

  return (
    <div className="add-new-container">
      <h1 className="add-new-title">Add New Book</h1>
      <FaPlus
        onClick={toggleForm}
        className="add-new-icon"
      />
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      {user && showForm && (
        <form onSubmit={handleSubmit} className="add-new-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter title"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Enter author"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
              placeholder="Enter ISBN (e.g., 9780743273565)"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              placeholder="Enter genre"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price (ZAR)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              step="0.01"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="stockQuantity">Stock Quantity</label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleInputChange}
              placeholder="Enter stock quantity"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Enter image URL (optional)"
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">
            Add Book
          </button>
        </form>
      )}
    </div>
  );
};

export default Addnewpage;