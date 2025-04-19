import React, { useState, useEffect } from 'react';
import './Booklists.css'; // Optional CSS file for styling

const Booklists = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Format price in ZAR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(price);
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="booklists-container">
      <h2>Book Collection</h2>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <img
              src={book.image}
              alt={book.title}
              className="book-image"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')} // Fallback image
            />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Price:</strong> {formatPrice(book.price)}</p>
            <p><strong>Stock:</strong> {book.stockQuantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booklists;