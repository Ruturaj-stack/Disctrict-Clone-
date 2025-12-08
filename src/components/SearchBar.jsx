import { useState } from "react";
import { movies, events } from "../utils/dummyData";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredEvents = events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setResults([...filteredMovies, ...filteredEvents]);
  };

  const handleSelect = (item) => {
    if (item.genre) {
      navigate(`/movie/${item.id}`, { state: item });
    } else {
      navigate(`/event/${item.id}`, { state: item });
    }

    setQuery("");
    setResults([]);
  };

  return (
    <div className="search-container">
      <div className="search-input-wrap">
        <input
          type="text"
          placeholder="Search movies or events"
          value={query}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            handleSearch(val);
          }}
          className="search-input"
        />
        <button
          className="search-btn"
          onClick={() => handleSearch(query)}
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </div>

      {results.length > 0 && (
        <div className="search-results">
          {results.map((item) => (
            <div
              key={item.id}
              className="search-item"
              onClick={() => handleSelect(item)}
            >
              <div className="search-title">{item.title}</div>
              <div className="search-type">{item.genre ? "Movie" : "Event"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
