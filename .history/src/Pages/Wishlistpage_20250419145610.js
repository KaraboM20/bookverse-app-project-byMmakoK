import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { AuthContext } from '../context/AuthContext';
import { FaHeart } from 'react-icons/fa';
import './Wishlistpage.css';

const Wishlistpage = () => {
  const { wishlist, removeFromWishlist, loading, error } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  if (!user) {
    history.push('/create-profile');
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Wishlist</h1>
      {loading && <p className="text-center text-gray-500">Loading wishlist...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
            >
              <img
                src={item.image || 'https://via.placeholder.com/150'}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold truncate">{item.title}</h2>
                <p className="text-gray-600">{item.author || 'Unknown Author'}</p>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="mt-2 flex items-center text-red-500 hover:text-red-700"
                >
                  <FaHeart className="mr-2" /> Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlistpage;