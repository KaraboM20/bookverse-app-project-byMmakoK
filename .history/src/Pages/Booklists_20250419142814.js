import React from 'react';
import { useWishlist } from '../';
import { Link } from 'react-router-dom';

const Booklists = ({ books }) => {
  const { wishlist, toggleWishlist, loading, error } = useWishlist();

  const handleHeartClick = async (bookId) => {
    if (!bookId) {
      console.error('Invalid book ID');
      return;
    }
    try {
      const isAdded = await toggleWishlist(bookId);
      console.log(isAdded ? 'Added to Wishlist' : 'Removed from Wishlist', bookId);
    } catch (err) {
      console.error('Failed to toggle wishlist:', err.message);
    }
  };

  return (
    <div className="booklists">
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      {books && books.length > 0 ? (
        books.map((book) => (
          <div key={book._id} className="book-card">
            <Link to={`/books/${book._id}`}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </Link>
            <span
              className={`heart-icon ${wishlist.includes(book._id) ? 'in-wishlist' : ''}`}
              onClick={() => handleHeartClick(book._id)}
              style={{ cursor: 'pointer', fontSize: '24px' }}
            >
              ♥
            </span>
          </div>
        ))
      ) : (
        <p>No books available</p>
      )}
      <style>
        {`
          .heart-icon {
            color: gray;
            transition: color 0.3s;
          }
          .heart-icon.in-wishlist {
            color: red;
          }
          .book-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }
          .error {
            color: red;
          }
        `}
      </style>
    </div>
  );
};

export default Booklists;