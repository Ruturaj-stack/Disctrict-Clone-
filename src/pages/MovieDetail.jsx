import { useLocation, useNavigate } from "react-router-dom";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <h2>No movie data</h2>;

  return (
    <div className="movie-detail-container">
      <img src={state.poster} alt={state.title} className="detail-poster" />

      <h1>{state.title}</h1>

      <p>Lorem ipsum dolor sit amet... (API description coming soon)</p>

      <button className="book-btn" onClick={() => navigate("/booking", { state })}>
        Book Tickets
      </button>
    </div>
  );
};

export default MovieDetail;
