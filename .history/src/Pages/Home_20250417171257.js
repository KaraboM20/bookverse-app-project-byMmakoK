import React from 'react';
import './Home.css';
import Booklists from './';

const Home = () => {
  return (
    <div>

<div className="welcome-home">
  <div className="slider">
    <img
      src="https://img.freepik.com/free-photo/top-view-books-circle-with-copy-space_23-2148827186.jpg?t=st=1744898686~exp=1744902286~hmac=b03434c69862dd7d6c0fd80bd1dce0be74bda7c46227256232c998be789a2a30&w=900"
      alt="background1"
    />
    <img
      src="https://img.freepik.com/premium-photo/cup-coffee-near-stack-books-grey_308079-2001.jpg?w=900"
      alt="background2"
    />
    <img
      src="https://img.freepik.com/free-photo/beautiful-composition-different-books_23-2148883807.jpg?t=st=1744898830~exp=1744902430~hmac=cd58219d6e8f827ad10dfd549e1f34102b118f85d2eea345952133da5ef9b3fa&w=900"
      alt="background3"
    />
    <img
      src="https://img.freepik.com/free-photo/creative-arrangement-with-different-books_23-2148851016.jpg?t=st=1744900188~exp=1744903788~hmac=67e0eb2b9cfcab54b7c5c6212d76bc54f2361352d327f5012e805f4f976ce322&w=900"
      alt="background4"
    />
  </div>
  <h1 className="welcome-text">Welcome to BookVerse</h1>
</div>
      
      <Booklists />

    </div>
  )
}

export default Home
