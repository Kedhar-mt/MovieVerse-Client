import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner"; // Loader component
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CastSlider from "./CastSlider"; // Assuming CastSlider is used for cast details
import "../styles/MovieDetails.css"; // Updated CSS file

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const API_KEY = "6f9ea63bae2c6135bb5c3379d58618de"; // Your API key
      const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

      try {
        const response = await axios.get(apiUrl);
        setMovieDetails({
          id: response.data.id,
          posterPath: response.data.poster_path,
          originalTitle: response.data.original_title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          tagline: response.data.tagline,
          releaseDate: response.data.release_date,
          genres: response.data.genres,
          runtime: response.data.runtime,
          revenue: response.data.revenue,
          voteAverage: response.data.vote_average,
          voteCount: response.data.vote_count,
          homepage: response.data.homepage,
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="single-movie-page">
      {isLoading ? (
        <div className="loader">
          <ThreeDots type="TailSpin" color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <>
          <div className="back-button-container">
            <button
              type="button"
              className="back-btn"
              onClick={handleBackClick}
            >
              Back to Home
            </button>
          </div>
          <div className="movie-details">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.posterPath}`}
              alt={movieDetails.originalTitle}
            />
            <div className="movie-content">
              <h1 className="title">{movieDetails.originalTitle}</h1>
              <p className="title-para">{movieDetails.overview}</p>
              <p className="title-para">Tagline: {movieDetails.tagline}</p>
              <p className="title-para">
                Release Date: {movieDetails.releaseDate}
              </p>
              <p className="title-para">
                Popularity: {movieDetails.popularity}
              </p>
              <p className="title-para">
                Runtime: {movieDetails.runtime} minutes
              </p>
              <p className="title-para">
                Revenue: ${movieDetails.revenue}
              </p>
              <p className="title-para">
                Vote Average: {movieDetails.voteAverage}
              </p>
              <p className="title-para">
                Vote Count: {movieDetails.voteCount}
              </p>

              <h3>Genres:</h3>
              <ul>
                {movieDetails.genres.map((genre) => (
                  <li className="genres-list" key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
      <div className="cast-details">
        <CastSlider movieId={id} />
      </div>
    </div>
  );
};

export default MovieDetails;
