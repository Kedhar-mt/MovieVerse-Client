// CastSlider.jsx
import { useState, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import '../styles/CastSlider.css';

const CastSlider = ({ movieId }) => {
  const [movieCastDetailsList, setMovieCastDetailsList] = useState([]);

  const getMovieCastDetailsData = useCallback(async () => {
    const API_KEY = '6f9ea63bae2c6135bb5c3379d58618de';
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const responseData = await response.json();
        const updatedData = responseData.cast.map((eachCast) => ({
          id: eachCast.id,
          originalName: eachCast.original_name,
          character: eachCast.character,
          profilePath: eachCast.profile_path,
        }));
        setMovieCastDetailsList(updatedData);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [movieId]);

  useEffect(() => {
    getMovieCastDetailsData();
  }, [getMovieCastDetailsData]);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Show 6 actors at a time
    slidesToScroll: 6, // Scroll 6 actors at a time
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="movie-cast">
      <h1 className="cast-heading">Top Billed Cast</h1>
      <Slider {...settings}>
        {movieCastDetailsList.map((cast) => (
          <div key={cast.id} className="cast-item">
            <img
              src={`https://image.tmdb.org/t/p/w200${cast.profilePath}`}
              alt={cast.originalName}
              className="cast-profile-image"
            />
            <div className="cast-details">
              <h2 className="cast-name">{cast.originalName}</h2>
              <p className="cast-character">Character: {cast.character}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom Next Arrow
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  );
};

// Custom Previous Arrow
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  );
};

export default CastSlider;
