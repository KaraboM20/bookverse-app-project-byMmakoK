import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { addBook } from '../api/booksapi';

const Addnewpage = () => {
  const [isLoggedIn] = useState(false); // Mock: Set to true to test form
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookData = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity, 10),
      };
      await addBook(bookData);
      setSuccess('Book added successfully!');
      setError(null);
      setFormData({
        title: '',
        author: '',
        isbn: '',
        genre: '',
        price: '',
        stockQuantity: '',
        image: '',
      });
    } catch (err) {
      setError('Failed to add book');
      setSuccess(null);
    }
  };

  const toggleForm = () => {
    if (!isLoggedIn) {
      setError('Please login first to continue');
      setShowForm(false);
    } else {
      setShowForm((prev) => !prev);
      setError(null);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <h1>Add New Book</h1>
      <FaPlus
        onClick={toggleForm}
        style={{
          fontSize: '1.5rem',
          color: '#007bff',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {isLoggedIn && showForm && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
            style={{ padding: '10px', fontSize: '1rem' }}
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Author"
            required
            style={{ padding: '10px', fontSize: '1rem' }}
          />
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleInputChange}
            placeholder="ISBN (e.g., 978-0743273565)"
            required
            style={{ padding: '10px', fontSize: '1rem' }}
          />
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            placeholder="Genre"
            required
            style={{ padding: '10px', fontSize: '1rem' }}
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price (ZAR)"
            step="0.01"
            required
            style={{ padding: '10px', fontSize: '1rem' }}
          />
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleInputChange}
            placeholder="Stock Quantity"
            required
            style={{ padding: '10px', fontSize: '1rem' }}
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            style={{ padding: '10px', fontSize: '1rem' }}
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add Book
          </button>
        </form>
      )}
    </div>
  );
};

export default Addnewpage;