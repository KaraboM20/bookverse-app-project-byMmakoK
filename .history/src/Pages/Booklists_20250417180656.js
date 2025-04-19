import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { fetchBooks } from '../api/booksapi';
import './Booklists.css';

const Booklists = () => {
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getBooks();
  }, []);

  // Toggle book in wishlist
  const toggleWishlist = (bookId) => {
    setWishlist((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

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
            <div className="heart-container">
              <FaHeart
                className={`heart-icon ${wishlist.includes(book._id) ? 'wished' : ''}`}
                onClick={() => toggleWishlist(book._id)}
              />
            </div>
            <img
              src={book.image}
              alt={book.title}
              className="book-image"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
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