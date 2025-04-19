import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { IoMdAdd } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { MdAccountCircle } from "react-icons/md";



const Header = () => {
  return (
    <div>
      <div className='logo'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaSt1PhgYIzohkPhdExjnkrLBTk-o9Pmarpg&s' alt='bookverse-logo'/>
      </div>

      <div className='search-box'>
        
      </div>
      
      <div className='add-newbook'>
        <NavLink to='./addnewpage'><span><IoMdAdd />add</span></NavLink>
      </div>

      <div className='wish-list'>
        <NavLink to='./wishlistpage'><span><GrFavorite />Wishlist</span></NavLink>
      </div>

      <div className='create-profile'>
        <NavLink to=
      </div>
    </div>
  )
}

export default Header
