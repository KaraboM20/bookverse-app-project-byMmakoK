import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { GrFavorite } from 'react-icons/gr';
import { MdAccountCircle } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="header">
      <div className="logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmyNRIosj4TrlGKI3aKxiTm2sishkxxwVdQ&s"
          alt="bookverse-logo"
        />
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>

      <div className="header-icons">
        <div className="add-newbook">
          <NavLink to="/add-new">
            <IoMdAdd /> Add
          </NavLink>
        </div>

        <div className="wish-list">
          <NavLink to="/wishlist">
            <GrFavorite /> Wishlist
          </NavLink>
        </div>

        <div className="create-profile">
          {user ? (
            <div className="user-menu">
              <span className="username">
                <MdAccountCircle /> {user.username}
              </span>
              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/create-profile">
              <MdAccountCircle /> Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;