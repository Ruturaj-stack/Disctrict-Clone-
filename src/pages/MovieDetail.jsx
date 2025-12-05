import { useLocation, useNavigate } from "react-router-dom";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { state } = useLocation(); // movie data
  const navigate = useNavigate();

  return (
    <div className="movie-detail-container">
      <img src={state.Poster} alt={state.Title} className="detail-poster" />
      <h1>{state.Title}</h1>


      <div className="detail-info">
        <h1>{state.title}</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Movie storyline & description will appear here later from API.</p>

        <button className="book-btn" onClick={() => navigate("/booking", { state })}>
          Book Tickets
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
