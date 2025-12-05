import "./MoviesCarousel.css";
import { useEffect, useState, useRef } from "react";
import { fetchMovies } from "../utils/api";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";
import { ChevronLeft, ChevronRight } from "lucide-react";


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

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const openDetails = (movie) => {
    navigate(`/showtimes/${movie.imdbID}`, { state: movie });

  };

  return (
    <div className="carousel-container">
      {title && <h2 className="carousel-title">{title}</h2>}

      <button className="arrow-btn left" onClick={handlePrev}>
        <ChevronLeft size={24} />
      </button>
      <button className="arrow-btn right" onClick={handleNext}>
        <ChevronRight size={24} />
      </button>

      <div className="carousel-row" ref={carouselRef}>
      {movies.length > 0 ? (
  movies.map((movie) => (
    <div
      key={movie.imdbID}
      className="movie-card"
      onClick={() => openDetails(movie)}
    >
      <div className="movie-poster-wrapper">
        <img src={movie.Poster} alt={movie.Title} />
        <div className="movie-overlay"></div>
      </div>
      <div className="movie-info-body">
        <p className="movie-title">{movie.Title}</p>
        {movie.Year && <p className="movie-year">{movie.Year}</p>}
      </div>
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
