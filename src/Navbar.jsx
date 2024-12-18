import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import icon from '../assets/icon.jpg'; // Import the image properly
import './index.css';

const Navbar = ({ setCategory, onSearch, category }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery); // Call the onSearch prop with the query
      //setSearchQuery(''); // Clear the search input
    }
  };

  // This will add a class to the active category to create a bold line
  const getActiveClass = (categoryName) => {
    return category === categoryName ? 'active-category' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img
            src={icon} // Use the imported image here
            alt="MovieVerse Logo"
            className="navbar-brand-img"
            style={{ width: '35px', height: '35px', marginRight: '5px' }} // Reduced size
          />
          <h1 className="navbar-brand mb-0" style={{ fontSize: '1.5rem' }}>MovieVerse</h1>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto me-3">
            <li className="nav-item">
              <button
                className={`nav-link ${getActiveClass('popular')}`}
                onClick={() => setCategory('popular')}
              >
                Popular
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${getActiveClass('top_rated')}`}
                onClick={() => setCategory('top_rated')}
              >
                Top Rated
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${getActiveClass('upcoming')}`}
                onClick={() => setCategory('upcoming')}
              >
                Upcoming
              </button>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ maxWidth: '250px' }}
            />
            <button type="submit" className="btn btn-outline-success">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
