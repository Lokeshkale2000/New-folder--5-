import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Corrected import path

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Post App</Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/BlogPostForm" className="navbar-link">Add New Post</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Home" className="navbar-link">Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
