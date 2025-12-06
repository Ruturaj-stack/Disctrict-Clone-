// src/pages/Booking.jsx
import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";
import { useState, useEffect } from "react";
import { getBookings } from "../utils/storage";
import toast from "react-hot-toast";

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ================= HOOKS ALWAYS FIRST =================
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [ticketCount, setTicketCount] = useState(1);

  // ================= COMMON =================
  const type = state?.type || "movie";

  // ----- MOVIE SEAT LAYOUT -----
  const executiveRows = ["D", "C", "B"];
  const executiveSeatsPerRow = 15;

  const normalLayout = {
    A: [1, 2, "wc", "wc", "wc", 5, 6, 7, 8, 9, 10, 11, 12, 13],
  };

  const baseTimes = ["09:05 AM", state?.time || "08:30 PM", "11:55 PM"];
  const [selectedTime, setSelectedTime] = useState(baseTimes[1]);

  const showDate = state?.date || "7 Dec";
  const showWeekday = state?.weekday || "Sun";
  const theatre = state?.theatre || "Cinepolis Grand View High Street, Gurugram";
  const movieTitle = state?.title || state?.name || "Movie Title";

  const EXEC_PRICE = 320;
  const NORMAL_PRICE = 300;

  useEffect(() => {
    if (type === "movie") {
      const allBookings = getBookings();
      const sameMovieBookings = allBookings.filter((b) => b.title === movieTitle);
      const reserved = sameMovieBookings.flatMap((b) => b.seats || []);
      setBookedSeats(reserved);
    }
  }, [type, movieTitle]);

  // ================= INVALID REQUEST =================
  if (!state) {
    return (
      <div className="booking-empty-page">
        <h2>Invalid Booking Request</h2>
      </div>
    );
  }

  // ================= MOVIE ACTIONS =================
  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) {
      toast.error("This seat is already booked ❌");
      return;
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : prev.length >= 10
        ? (toast.error("You can only book up to 10 seats"), prev)
        : [...prev, seatId]
    );
  };

  const calcSeatPrice = (seatId) => {
    const row = seatId.charAt(0);
    return executiveRows.includes(row) ? EXEC_PRICE : NORMAL_PRICE;
  };

  const movieTotalAmount = selectedSeats.reduce(
    (sum, seatId) => sum + calcSeatPrice(seatId),
    0
  );

  const handleMovieNext = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    navigate("/payment", {
      state: {
        ...state,
        type: "movie",
        title: movieTitle,
        seats: selectedSeats,
        amount: movieTotalAmount,
        time: selectedTime,
        date: showDate,
        theatre,
      },
    });
  };

  // ================= EVENT / ACTIVITY =================
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    if (typeof priceStr === "number") return priceStr;
    const num = priceStr.replace(/[^0-9]/g, "");
    return parseInt(num, 10) || 0;
  };

  const eventPrice = parsePrice(state?.price);

  const handleNonMovieNext = () => {
    navigate("/payment", {
      state: {
        ...state,
        tickets: ticketCount,
        amount: eventPrice * ticketCount,
        type,
      },
    });
  };

  // ================= MOVIE LAYOUT =================
  if (type === "movie") {
    return (
      <div className="movie-booking-page">
        <div className="movie-booking-inner">
          <div className="movie-booking-header">
            <div>
              <h1 className="mb-title">{movieTitle}</h1>
              <p className="mb-sub">
                {showDate}, {selectedTime} at {theatre}
              </p>
            </div>
          </div>

          <div className="mb-top-row">
            <div className="mb-date-block">
              <span className="mb-day">{showWeekday}</span>
              <span className="mb-date">{showDate}</span>
            </div>

            <div className="mb-time-chips">
              {baseTimes.map((t) => (
                <button
                  key={t}
                  className={`mb-time-chip ${selectedTime === t ? "active" : ""}`}
                  onClick={() => setSelectedTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-seat-wrapper">
            <div className="mb-row-labels">
              <span>D</span>
              <span>C</span>
              <span>B</span>
              <span>A</span>
            </div>

            <div className="mb-seat-main">
              <p className="mb-section-title">EXECUTIVE : ₹320</p>

              {executiveRows.map((row) => (
                <div key={row} className="mb-seat-row">
                  <div className="mb-seat-row-inner">
                    {Array.from({ length: executiveSeatsPerRow }, (_, i) => {
                      const num = i + 1;
                      const seatId = `${row}${num}`;
                      const isBooked = bookedSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          className={`mb-seat-chip ${isBooked ? "booked" : ""} ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() => toggleSeat(seatId)}
                          disabled={isBooked}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <p className="mb-section-title normal">NORMAL : ₹300</p>

              {Object.entries(normalLayout).map(([row, layout]) => (
                <div key={row} className="mb-seat-row">
                  <div className="mb-seat-row-inner">
                    {layout.map((val, idx) => {
                      if (val === "wc") {
                        return (
                          <div key={`${row}-wc-${idx}`} className="mb-seat-chip wc">
                            ♿
                          </div>
                        );
                      }

                      const seatId = `${row}${val}`;
                      const isBooked = bookedSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          className={`mb-seat-chip ${isBooked ? "booked" : ""} ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() => toggleSeat(seatId)}
                          disabled={isBooked}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="mb-screen-wrap">
                <div className="mb-screen-curve" />
              </div>
            </div>
          </div>

          <div className="mb-legend-bar">
            <div className="mb-legend-item">
              <span className="mb-legend-dot available" /> Available
            </div>
            <div className="mb-legend-item">
              <span className="mb-legend-dot occupied" /> Occupied
            </div>
            <div className="mb-legend-item">
              <span className="mb-legend-dot selected" /> Selected
            </div>
          </div>
        </div>

        {selectedSeats.length > 0 && (
          <div className="mb-summary-bar">
            <div className="mb-summary-left">
              <div className="mb-summary-title">
                {selectedSeats.length} Tickets • {selectedSeats.join(", ")}
              </div>
              <div className="mb-summary-sub">
                {movieTitle} • {showDate}, {selectedTime}
              </div>
            </div>

            <button className="mb-pay-btn" onClick={handleMovieNext}>
              Pay ₹{movieTotalAmount}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============= EVENT / ACTIVITIES / SPORTS (DISTRICT STYLE) =============
  return (
    <div className="event-booking-outer">
      <div className="event-booking-layout">
        <div className="event-booking-banner">
          <img src={state.image} alt={state.title} />
        </div>

        <div className="event-booking-card">
          <h1 className="eb-title">{state.title}</h1>

          <div className="eb-line">
            <span>🏷</span> {state.category || "Activities & Experiences"}
          </div>

          <div className="eb-line">
            <span>🕒</span> Daily, 6:00 PM onwards
          </div>

          <div className="eb-line">
            <span>📍</span> {state.location}
          </div>

          <div className="eb-price-block">
            <p className="label">Starts from</p>
            <p className="price">{state.price}</p>
          </div>

          <button className="eb-book-btn" onClick={handleNonMovieNext}>
            BOOK TICKETS
          </button>
        </div>
      </div>

      <section className="event-about-sec">
        <h2>About the Event</h2>
        <p>
          Enjoy vibrant performances, activities, food, experiences and much more!
        </p>
      </section>
    </div>
  );
};

export default Booking;
