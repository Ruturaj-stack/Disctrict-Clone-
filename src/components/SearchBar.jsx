import { useState } from "react";
import { movies, events } from "../utils/dummyData";
import { useNavigate } from "react-router-dom";

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
      // movies have genre property
      navigate(`/movie/${item.id}`, { state: item });
    } else {
      navigate(`/events`, { state: item });
    }

    setQuery("");
    setResults([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search movies or events..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        className="search-input"
      />

      {results.length > 0 && (
        <div className="search-results">
          {results.map((item) => (
            <div
              key={item.id}
              className="search-item"
              onClick={() => handleSelect(item)}
              style={{ cursor: "pointer" }}
            >
              <h4>{item.title}</h4>
              <p>{item.genre ? "Movie" : "Event"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
