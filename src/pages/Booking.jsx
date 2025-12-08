// src/pages/Booking.jsx
import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";
import { useState, useEffect } from "react";
import { getBookings } from "../utils/storage";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

import LoginModal from "../components/LoginModal";
import OTPModal from "../components/OTPModal";

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // ===== HOOKS =====
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [ticketCount, ] = useState(1);

  const [showLogin, setShowLogin] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const [phone, setPhone] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const type = state?.type || "movie";
  const displayTitle = state?.title || state?.name || "";
  const displayImage = state?.poster || state?.image || "";
  const displayLocation = state?.location || "";
  const displayCategory =
    type === "dining"
      ? state?.cuisine || "Dining"
      : state?.category || (type === "activity" ? "Activity" : "Event");

  // ===== LOGIN HANDLERS =====
  const handleLoginSuccess = (enteredPhone, otp) => {
    setPhone(enteredPhone);
    setGeneratedOtp(otp);

    setShowLogin(false);
    setTimeout(() => setShowOtp(true), 300);
  };

  const handleOtpVerify = () => {
    setShowOtp(false);

    // redirect after OTP success
    if (type === "movie") {
      navigate("/payment", {
        state: {
          ...state,
          type: "movie",
          seats: selectedSeats,
          amount: movieTotalAmount,
        },
      });
    } else {
      navigate("/payment", {
        state: {
          ...state,
          type,
          amount: eventPrice * ticketCount,
          tickets: ticketCount,
        },
      });
    }
  };

  // ================= MOVIE CONFIG =================
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

  // LOAD RESERVED SEATS
  useEffect(() => {
    if (type === "movie") {
      const allBookings = getBookings();
      const reserved = allBookings
        .filter((b) => b.title === movieTitle)
        .flatMap((b) => b.seats || []);

      setBookedSeats(reserved);
    }
  }, [type, movieTitle]);

  if (!state) {
    return <h2>Invalid Booking Request</h2>;
  }

  // ===== SEAT HANDLING =====
  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return toast.error("Seat already booked");

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const calcSeatPrice = (seatId) => {
    return executiveRows.includes(seatId[0]) ? EXEC_PRICE : NORMAL_PRICE;
  };

  const movieTotalAmount = selectedSeats.reduce(
    (sum, seatId) => sum + calcSeatPrice(seatId),
    0
  );

  const handleMovieNext = () => {
    if (selectedSeats.length === 0) return toast.error("Please select seats first");
    if (isLoggedIn) {
      navigate("/payment", {
        state: {
          ...state,
          type: "movie",
          seats: selectedSeats,
          amount: movieTotalAmount,
        },
      });
    } else {
      setShowLogin(true);
    }
  };

  const parsePrice = (priceStr) =>
    parseInt((priceStr || "0").replace(/[^0-9]/g, ""), 10);

  const eventPrice = parsePrice(state?.price);

  const handleNonMovieNext = () => {
    if (isLoggedIn) {
      navigate("/payment", {
        state: {
          ...state,
          type,
          amount: eventPrice * ticketCount,
          tickets: ticketCount,
        },
      });
    } else {
      setShowLogin(true);
    }
  };

  // ========== UI ==========

  return (
    <>
      {type === "movie" ? (
        <div className="movie-booking-page">
          <div className="movie-booking-inner">

            <div className="movie-booking-header">
              <h1 className="mb-title">{movieTitle}</h1>
              <p className="mb-sub">
                {showDate}, {selectedTime} at {theatre}
              </p>
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

            {/* seat layout */}
            <div className="mb-seat-wrapper">
              <div className="mb-row-labels"><span>D</span><span>C</span><span>B</span><span>A</span></div>

              <div className="mb-seat-main">
                <p className="mb-section-title">EXECUTIVE : ₹320</p>

                {executiveRows.map((row) => (
                  <div key={row} className="mb-seat-row">
                    <div className="mb-seat-row-inner">
                      {Array.from({ length: executiveSeatsPerRow }, (_, i) => {
                        const num = i + 1;
                        const seatId = `${row}${num}`;
                        return (
                          <button
                            key={seatId}
                            className={`mb-seat-chip ${
                              bookedSeats.includes(seatId) ? "booked" : ""
                            } ${selectedSeats.includes(seatId) ? "selected" : ""}`}
                            onClick={() => toggleSeat(seatId)}
                            disabled={bookedSeats.includes(seatId)}
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
                      {layout.map((val, idx) =>
                        val === "wc" ? (
                          <div key={idx} className="mb-seat-chip wc">♿</div>
                        ) : (
                          <button
                            key={`${row}${val}`}
                            className={`mb-seat-chip ${
                              bookedSeats.includes(`${row}${val}`) ? "booked" : ""
                            } ${
                              selectedSeats.includes(`${row}${val}`) ? "selected" : ""
                            }`}
                            onClick={() => toggleSeat(`${row}${val}`)}
                            disabled={bookedSeats.includes(`${row}${val}`)}
                          >
                            {val}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ))}

                <div className="mb-screen-wrap"><div className="mb-screen-curve" /></div>
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
      ) : (
        // EVENTS / SPORTS BOOKING VIEW
        <div className="event-booking-outer">
          <div className="event-booking-layout">
            <div className="event-booking-banner"><img src={displayImage} alt={displayTitle} /></div>

            <div className="event-booking-card">
              <h1 className="eb-title">{displayTitle}</h1>
              <div className="eb-line">🏷 {displayCategory}</div>
              <div className="eb-line">🕒 Daily, 6:00 PM onwards</div>
              <div className="eb-line">📍 {displayLocation}</div>

              <div className="eb-price-block">
                <p className="label">Starts from</p>
                <p className="price">{state.price || "₹999 onwards"}</p>
              </div>

              <button className="eb-book-btn" onClick={handleNonMovieNext}>
                BOOK TICKETS
              </button>
            </div>
          </div>

          <section className="event-about-sec">
            <h2>About the Event</h2>
            <p>Experience vibrant activities, events, food and more.</p>
          </section>
        </div>
      )}

      {/* MODALS */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={(number, otp) => handleLoginSuccess(number, otp)}
        />
      )}

      {showOtp && (
        <OTPModal
          phone={phone}
          generatedOtp={generatedOtp}
          onClose={() => setShowOtp(false)}
          onVerify={handleOtpVerify}
        />
      )}
    </>
  );
};

export default Booking;
