import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails'; // Import the MovieDetails component
import MVLogoAnimation from './MVLogoAnimation';
import '../styles/MVLogoAnimation.css';

const App = () => {
  const [category, setCategory] = useState('popular');
  const [showMainContent, setShowMainContent] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleSearch = (query) => {
    if (query.trim()) {
      // Update the URL to include the search query
      navigate(`/?query=${query}`);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    navigate(`/category/${newCategory}`); // Change the URL based on category
  };

  const handleAnimationEnd = () => {
    setShowMainContent(true);
  };

  return (
    <div>
      {!showMainContent && <MVLogoAnimation onAnimationEnd={handleAnimationEnd} />}
      {showMainContent && (
        <>
          <Navbar setCategory={handleCategoryChange} onSearch={handleSearch} category={category} />
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/category/:category" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
