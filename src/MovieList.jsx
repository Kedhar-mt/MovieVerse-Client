import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import '../styles/MovieList.css';

const MovieList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      const baseApi = import.meta.env.VITE_API_BASE_URL;
      const apiKey = import.meta.env.VITE_API_KEY;
      let apiUrl;

      if (location.search) {
        const searchQuery = new URLSearchParams(location.search).get('query');
        apiUrl = `${baseApi}/search/movie?api_key=${apiKey}&query=${searchQuery}`;
      } else if (category === 'popular') {
        apiUrl = `${baseApi}/movie/popular?api_key=${apiKey}`;
      } else if (category === 'top_rated') {
        apiUrl = `${baseApi}/movie/top_rated?api_key=${apiKey}`;
      } else if (category === 'upcoming') {
        apiUrl = `${baseApi}/movie/upcoming?api_key=${apiKey}`;
      } else {
        apiUrl = `${baseApi}/movie/popular?api_key=${apiKey}`;
      }

      try {
        let allMovies = [];
        for (let page = 1; page <= 5; page++) {
          const response = await axios.get(`${apiUrl}&page=${page}`);
          allMovies = [...allMovies, ...response.data.results];
        }
        setMovies(allMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, location.search]);

  const handleCardClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row no-gutters">
        {movies.map((movie) => (
          <div key={movie.id} className="col-4 col-sm-3 col-md-2 col-lg-2 mb-4">
            <div className="card movie-card" onClick={() => handleCardClick(movie)}>
              <div className="card-img-wrapper">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="card-img-top"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="font-weight-bold text-warning">⭐ {movie.vote_average}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
