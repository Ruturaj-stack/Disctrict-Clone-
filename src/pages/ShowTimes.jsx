import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ShowTimes.css";
import { Play } from "lucide-react";

// BRAND LOGOS (put files in src/assets/)
import cinepolisLogo from "../assets/cinepolis.png";
import inoxLogo from "../assets/inox.png";

const ShowTimes = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Handle API + dummy structures
  const movieTitle =
    state?.Title || state?.title || "Movie Title";
  const moviePoster =
    state?.Poster || state?.poster || "";
  const movieGenre =
    state?.Genre ||
    (Array.isArray(state?.genre)
      ? state.genre.join(", ")
      : state?.genre) ||
    "Drama";
  const movieDuration =
    state?.Runtime || state?.duration || "2h 49m";
  const movieLanguage =
    state?.Language || state?.language || "Hindi";
  const movieCert = state?.Rated || "UA16+";

  const handlePlayTrailer = () => {
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        movieTitle + " trailer"
      )}`,
      "_blank"
    );
  };

  // Fake theatre data for layout
  const theatres = [
    {
      id: 1,
      logo: cinepolisLogo,
      name: "Cinepolis Grand View High Street, Gurugram",
      distance: "1.6 km away",
      note: "Non-cancellable",
      cancellable: false,
      shows: ["07:30 PM", "11:05 PM"],
    },
    {
      id: 2,
      logo: inoxLogo,
      name: "INOX World Mark, Sector 65, Gurugram",
      distance: "4.4 km away",
      note: "Allows cancellation",
      cancellable: true,
      shows: ["04:35 PM", "07:50 PM", "11:20 PM"],
    },
  ];

  const [selectedDate, setSelectedDate] = useState(0);

  // Mimic BMS strip (you can tweak labels)
  const dates = [
    { day: "6", label: "Sat" },
    { day: "7", label: "Sun" },
    { day: "8", label: "Mon" },
    { day: "9", label: "Tue" },
    { day: "10", label: "Wed" },
    { day: "11", label: "Thu" },
  ];

  const handleShowClick = (time, theatreName) => {
    navigate("/booking", {
      state: {
        ...state,
        title: movieTitle,
        poster: moviePoster,
        time,
        theatre: theatreName,
        type: "movie",
      },
    });
  };

  return (
    <div className="st-wrapper">
      <div className="st-inner">

        {/* ------- MOVIE STRIP -------- */}
        <div className="st-movie-strip">
          <div className="st-poster-card">
            {moviePoster && (
              <img
                src={moviePoster}
                alt={movieTitle}
                className="st-poster-img"
              />
            )}
            <button
              className="st-play-btn"
              onClick={handlePlayTrailer}
            >
              <Play size={18} fill="#fff" strokeWidth={0} />
            </button>
          </div>

          <div className="st-movie-details">
            <h1 className="st-movie-title">{movieTitle}</h1>
            <p className="st-movie-meta">
              {movieCert} • {movieLanguage} • {movieDuration}
            </p>
            <p className="st-movie-genre">{movieGenre}</p>
            <button className="st-view-details-btn">
              View details
            </button>
          </div>
        </div>

        {/* ------- DATE STRIP -------- */}
        <div className="st-date-strip">
          <div className="st-month-column">
            <span className="st-month-text">DEC</span>
          </div>

          <div className="st-date-scroll">
            {dates.map((item, index) => (
              <button
                key={item.day + item.label}
                className={
                  "st-date-pill" +
                  (index === selectedDate ? " active" : "")
                }
                onClick={() => setSelectedDate(index)}
              >
                <span className="st-date-day">{item.day}</span>
                <span className="st-date-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ------- FILTER ROW -------- */}
        <div className="st-filters-row">
          <button className="st-filter-btn">
            Filters ▾
          </button>
          <button className="st-filter-btn">
            After 5 PM
          </button>
          <button className="st-filter-btn">
            Wheelchair Friendly
          </button>
          <button className="st-filter-btn">
            Recliners
          </button>
          <button className="st-filter-btn">
            Premium Seats
          </button>
        </div>

        {/* ------- LEGEND BAR -------- */}
        <div className="st-legend-bar">
          <div className="st-legend-item">
            <span className="st-dot st-dot-green" /> Available
          </div>
          <div className="st-legend-item">
            <span className="st-dot st-dot-yellow" /> Filling fast
          </div>
          <div className="st-legend-item">
            <span className="st-dot st-dot-red" /> Almost full
          </div>
        </div>

        {/* ------- THEATRE CARDS -------- */}
        <div className="st-theatres-list">
          {theatres.map((t) => (
            <div key={t.id} className="st-theatre-card">
              <div className="st-theatre-header">
                <div className="st-theatre-left">
                  <img
                    src={t.logo}
                    alt={t.name}
                    className="st-theatre-logo"
                  />
                  <div>
                    <h3 className="st-theatre-name">
                      {t.name}
                    </h3>
                    <p className="st-theatre-meta">
                      {t.distance}{" "}
                      <span className="st-theatre-note">
                        • {t.note}
                      </span>
                    </p>
                  </div>
                </div>

                <button className="st-like-btn" aria-label="like">
                  ♡
                </button>
              </div>

              <div className="st-showtime-row">
                {t.shows.map((time) => (
                  <button
                    key={time}
                    className="st-showtime-btn"
                    onClick={() =>
                      handleShowClick(time, t.name)
                    }
                  >
                    <span className="st-showtime-time">
                      {time}
                    </span>
                    <span className="st-showtime-tag">LASER</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ShowTimes;
