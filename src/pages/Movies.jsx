import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { movies } from "../utils/dummyData";
import "./Movies.css";
import { ChevronDown, Star } from "lucide-react";

const Movies = () => {
  const navigate = useNavigate();
  const locationObj = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [location, setLocation] = useState("Mumbai");
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const languages = ["All", "Hindi", "English", "Marathi"];
  const genres = ["All", "Action", "Adventure", "Drama", "Thriller", "Comedy"];
  const locations = ["Mumbai", "Delhi-NCR", "Bengaluru", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad"];
  
  useEffect(() => {
    const params = new URLSearchParams(locationObj.search);
    const search = params.get("search");
    if (search) {
      setSearchQuery(search);
    } else {
      setSearchQuery("");
    }
  }, [locationObj.search]);

  const filteredMovies = movies.filter(movie => {
    const langMatch = selectedLanguage === "All" || movie.language === selectedLanguage;
    const genreMatch = selectedGenre === "All" || movie.genre.includes(selectedGenre);
    const searchMatch = searchQuery === "" || movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return langMatch && genreMatch && searchMatch;
  });

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setShowLocationPicker(false);
  };

  return (
    <div className="movies-page container">
      <div className="page-header">
        <div className="location-selector-wrapper" style={{ position: 'relative' }}>
          <div 
            className="title-row" 
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
            onClick={() => setShowLocationPicker(!showLocationPicker)}
          >
              <h1>Movies in {location}</h1>
              <ChevronDown 
                size={28} 
                color="#333" 
                style={{ 
                  marginTop: '-5px', 
                  transition: 'transform 0.3s ease',
                  transform: showLocationPicker ? 'rotate(180deg)' : 'rotate(0deg)'
                }} 
              />
          </div>
          
          {showLocationPicker && (
            <div className="location-dropdown">
              <div className="location-search">
                <input type="text" placeholder="Search for your city" autoFocus />
              </div>
              <div className="popular-cities">
                <span>Popular Cities</span>
                <div className="cities-grid">
                  {locations.map(loc => (
                    <div 
                      key={loc} 
                      className={`city-item ${location === loc ? 'selected' : ''}`}
                      onClick={() => handleLocationSelect(loc)}
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="filters-container">
          <div className="filter-group">
            <span className="filter-label">Language:</span>
            <div className="filter-chips">
              {languages.map(lang => (
                <button 
                  key={lang} 
                  className={`filter-btn ${selectedLanguage === lang ? 'active' : ''}`}
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Genre:</span>
            <div className="filter-chips">
              {genres.map(genre => (
                <button 
                  key={genre} 
                  className={`filter-btn ${selectedGenre === genre ? 'active' : ''}`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <div 
            key={movie.id} 
            className="movie-card"
            onClick={() => navigate(`/showtimes/${movie.id}`, { state: { ...movie } })}
          >
            <div className="poster-container">
              <img src={movie.poster} alt={movie.title} className="movie-poster" />
              <div className="rating-badge">
                <Star size={12} fill="white" color="white" /> {movie.rating}
              </div>
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="genre">{movie.genre.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
