import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">StudentHub</Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/list">Home</Link></li>
            <li><Link to="/create">Add Student</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
