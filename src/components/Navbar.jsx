import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css'; // Make sure to import the CSS file!

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleWorksClick = () => {
    if (location.pathname === '/') {
      document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#works');
    }
  };

  return (
    <nav className="navbar-container">
      
      {/* 1. THE LOGO */}
      <Link to="/" className="logo-text">
        CINEGRAPHIXX
      </Link>

      {/* 2. THE LINKS (Works & About) */}
      <div className="nav-links">
        
        {/* Works Button */}
        <button 
          className="nav-item" 
          onClick={handleWorksClick}
        >
          Works
        </button>

        {/* About Link */}
        <Link to="/about" className="nav-item">
          About
        </Link>

      </div>
      
    </nav>
  );
}