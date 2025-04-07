import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className='playfair-display'>Total Interior Eco</h1>
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/gallery">Gallery</a>
            </li>
            {/* <li>
              <a href="/services">Services</a>
            </li> */}
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <div className="ribbon-drop-wrapper">
          <div className="ribbon-content-wrapper">
            <a href="">Innovative Designs, Timeless Comfort.</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
