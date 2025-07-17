import React from 'react';
import './Header.css';
import image13 from '../../assets/images/image13.jpg';
import { FaSearch } from 'react-icons/fa';
const Header = () => {
  return (
    <header className="municipality-header">
      <div className="header-container">
        <div className="logo-container">
          <img 
            src={image13} 
            alt="Municipality Logo" 
            className="municipality-logo"
          />
          <a href="/"><h1>Municipality of BarelElias</h1></a>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Report Issue</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#" className="search-icon1"><FaSearch className="search-icon" /></a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;