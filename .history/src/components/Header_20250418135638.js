import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { IoMdAdd } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { MdAccountCircle } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import './Header.css';
import { AuthContext } from '../context/AuthContext';



const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmyNRIosj4TrlGKI3aKxiTm2sishkxxwVdQ&s' alt='bookverse-logo'/>
      </div>

      <div className='search-box'>
      <input
        type='text'
        placeholder='Search...'
        className='search-input'
      />
      <button className='search-button'>
        <FaSearch />
      </button>
      </div>
      
      <div className='header-icons'>
      <div className='add-newbook'>
        <NavLink to='./addnewpage'><IoMdAdd />add</NavLink>
      </div>

      <div className='wish-list'>
        <NavLink to='./wishlistpage'><GrFavorite />Wishlist</NavLink>
      </div>

      <div className='create-profile'>
        <NavLink to='./createprofilepage'><MdAccountCircle />Create Profile</NavLink>
      </div>
      </div>
    </div>
  )
}

export default Header
