import "./MoviesCarousel.css";
import { useEffect, useState, useRef } from "react";
import { fetchMovies } from "../utils/api";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";


const MoviesCarousel = ({ title, query }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchMovies(query);
      setMovies(data);
    }
    loadMovies();
  }, [query]);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2500);
    return () => clearInterval(interval);
  });

  const handleNext = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handlePrev = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const openDetails = (movie) => {
    navigate(`/showtimes/${movie.imdbID}`, { state: movie });

  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{title}</h2>

      <button className="arrow-btn left" onClick={handlePrev}>◀</button>
      <button className="arrow-btn right" onClick={handleNext}>▶</button>

      <div className="carousel-row" ref={carouselRef}>
      {movies.length > 0 ? (
  movies.map((movie) => (
    <div
      key={movie.imdbID}
      className="movie-card"
      onClick={() => openDetails(movie)}
    >
      <img src={movie.Poster} alt={movie.Title} />
      <p className="movie-title">{movie.Title}</p>
    </div>
  ))
) : (
  [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
)}

      </div>
    </div>
  );
};

export default MoviesCarousel;
