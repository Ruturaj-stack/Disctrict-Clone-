import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ShowTimes.css";
import { Play } from "lucide-react";

const ShowTimes = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Handle data from both API (PascalCase) and Dummy Data (camelCase)
  const movieTitle = state?.Title || state?.title || "Movie Title";
  const moviePoster = state?.Poster || state?.poster || "";
  const movieGenre = state?.Genre || (Array.isArray(state?.genre) ? state.genre.join(", ") : state?.genre) || "Genre";
  const movieDuration = state?.Runtime || state?.duration || "2h 30m";
  const movieLanguage = state?.Language || state?.language || "English";

  const handlePlayTrailer = () => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle + " trailer")}`, '_blank');
  };

  const theatres = [
    {
      name: "Metro INOX Cinema, M.G. Road, Mumbai",
      distance: "6.3 km away",
      cancellation: true,
      shows: ["04:50 PM", "07:40 PM", "10:10 PM"],
    },
    {
      name: "PVR ICON, Andheri West",
      distance: "10.2 km away",
      cancellation: false,
      shows: ["03:15 PM", "06:20 PM", "09:00 PM"],
    },
  ];

  const [selectedDate, setSelectedDate] = useState(0);

  const dates = ["4 Thu", "5 Fri", "6 Sat", "7 Sun"];

  return (
    <div className="showtimes-page">

      {/* ---- MOVIE HEADER ---- */}
      <div className="movie-header">
        <div className="poster-wrap">
          <img src={moviePoster} alt="poster" className="poster" />
          <button className="play-btn" onClick={handlePlayTrailer}>
            <Play size={20} fill="white" strokeWidth={0} />
          </button>
        </div>

        <div className="movie-info">
          <h1 className="movie-title">{movieTitle}</h1>
          <p className="movie-meta">UA13+ • {movieLanguage} • {movieDuration}</p>
          <p className="movie-genre" style={{color: '#666', marginTop: '5px'}}>{movieGenre}</p>
          <button className="view-details">View details</button>
        </div>
      </div>

      {/* ---- DATE SCROLLER ---- */}
      <div className="date-scroll">
        {dates.map((day, i) => (
          <div 
            key={i} 
            className={`date-card ${selectedDate === i ? "active" : ""}`}
            onClick={() => setSelectedDate(i)}
          >
            <span className="month">DEC</span>
            <span className="day">{day.split(" ")[0]}</span>
            <span className="label">{day.split(" ")[1]}</span>
          </div>
        ))}
      </div>

      {/* ---- FILTER ROW ---- */}
      <div className="filters-row">
        <button className="filter">Filters ▾</button>
        <button className="filter">After 5 PM</button>
        <button className="filter">Wheelchair Friendly</button>
        <button className="filter">Recliners</button>
        <button className="filter">Premium Seats</button>
      </div>

      {/* ---- LEGEND ---- */}
      <div className="legend-row">
        <span className="dot green"></span> Available
        <span className="dot yellow"></span> Filling fast
        <span className="dot red"></span> Almost full
      </div>

      {/* ---- THEATRES ---- */}
      {theatres.map((t, index) => (
        <div key={index} className="theatre-card">
          <h3>{t.name}</h3>
          <p className="theatre-meta">
            {t.distance} {t.cancellation && "| Allows cancellation"}
          </p>

          <div className="show-buttons">
            {t.shows.map((time) => (
              <button
                key={time}
                className="show-btn"
                onClick={() => navigate("/booking", { 
                  state: { 
                    ...state, 
                    title: movieTitle,
                    poster: moviePoster,
                    time,
                    type: "movie" 
                  } 
                })}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowTimes;
