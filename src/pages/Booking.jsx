import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";
import { useState, useEffect } from "react";
import { getBookings } from "../utils/storage";
import toast from "react-hot-toast";

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Default to movie if no type provided (legacy support)
  const type = state?.type || "movie";

  // --- MOVIE LOGIC ---
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 12; // Wider rows
  const seatPrices = { 
    A: 500, B: 500, // Platinum
    C: 350, D: 350, E: 350, // Gold
    F: 200, G: 200, H: 200 // Silver
  };
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState("19:00");

  const showTimes = ["10:00 AM", "01:30 PM", "04:45 PM", "07:00 PM", "10:30 PM"];

  useEffect(() => {
    if (type === "movie") {
      const allBookings = getBookings();
      // Filter booked seats based on movie title AND time (mock logic)
      // For simplicity, we just use title to show some booked seats
      const sameMovieBookings = allBookings.filter((b) => b.title === state.title);
      const reserved = sameMovieBookings.flatMap((b) => b.seats || []);
      
      // Add some dummy booked seats for realism if none exist
      if (reserved.length === 0) {
        setBookedSeats(["D5", "D6", "E4", "E5"]);
      } else {
        setBookedSeats(reserved);
      }
    }
  }, [state?.title, type]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) {
      toast.error("This seat is already booked ❌");
      return;
    }
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length >= 10) {
        toast.error("You can only book up to 10 seats");
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const movieTotalAmount = selectedSeats.reduce((acc, seat) => {
    const row = seat.charAt(0);
    return acc + (seatPrices[row] || 200);
  }, 0);

  // --- DINING LOGIC ---
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // --- EVENT/ACTIVITY LOGIC ---
  const [ticketCount, setTicketCount] = useState(1);
  
  // Parse price string "₹1,500 onwards" -> 1500
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    if (typeof priceStr === 'number') return priceStr;
    const num = priceStr.replace(/[^0-9]/g, "");
    return parseInt(num, 10) || 0;
  };
  const eventPrice = parsePrice(state?.price);

  // --- HANDLERS ---
  const handleNext = () => {
    let bookingData = { ...state };

    if (type === "movie") {
      bookingData = { 
        ...bookingData, 
        seats: selectedSeats, 
        amount: movieTotalAmount,
        time: selectedTime,
        date: new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
      };
    } else if (type === "dining") {
      if (!date || !time) {
        toast.error("Please select date and time");
        return;
      }
      // Dining usually has a reservation fee or just free booking. Let's assume ₹500 holding fee.
      bookingData = { ...bookingData, guests, date, time, amount: 500 }; 
    } else if (type === "event" || type === "activity") {
      bookingData = { ...bookingData, tickets: ticketCount, amount: eventPrice * ticketCount };
    }

    navigate("/payment", { state: bookingData });
  };

  if (!state) return <div className="booking-container"><h2>Invalid Booking Request</h2></div>;

  return (
    <div className="booking-container container">
      <div className="booking-header">
        <h1 className="booking-title">{state.title || state.name}</h1>
        <p className="booking-sub">
          {state.location} {state.cuisine ? `• ${state.cuisine}` : ""} {state.category ? `• ${state.category}` : ""}
        </p>
      </div>

      {type === "movie" && (
        <div className="movie-booking-section">
          <div className="time-selector">
            {showTimes.map(t => (
              <button 
                key={t} 
                className={`time-pill ${selectedTime === t ? 'active' : ''}`}
                onClick={() => setSelectedTime(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="screen-container">
            <div className="screen">Screen This Way</div>
            <div className="screen-glow"></div>
          </div>
          
          <div className="seat-layout">
            {rows.map((row) => (
              <div key={row} className="seat-row">
                <span className="row-label">{row}</span>
                <div className="row-seats">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const selected = selectedSeats.includes(seatId);
                    const reserved = bookedSeats.includes(seatId);
                    
                    // Add gap after 4th and 8th seat for aisle
                    const isGap = (i + 1) === 5 || (i + 1) === 9;
                    
                    return (
                      <div key={seatId} style={{ display: 'flex', alignItems: 'center' }}>
                         {isGap && <div className="aisle-gap"></div>}
                         <div
                          className={`seat ${selected ? "selected" : ""} ${reserved ? "booked" : ""} ${seatPrices[row] > 400 ? 'premium' : ''}`}
                          onClick={() => toggleSeat(seatId)}
                          title={`${seatId} - ₹${seatPrices[row]}`}
                        >
                          {/* <span className="seat-num">{i + 1}</span> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="legend">
            <div className="legend-item"><span className="seat available"></span> Available</div>
            <div className="legend-item"><span className="seat selected"></span> Selected</div>
            <div className="legend-item"><span className="seat booked"></span> Sold</div>
            <div className="legend-item"><span className="seat premium"></span> Premium</div>
          </div>

          {selectedSeats.length > 0 && (
            <div className="booking-summary-bar">
              <div className="summary-text">
                <span>{selectedSeats.join(", ")}</span> ({selectedSeats.length} Tickets)
              </div>
              <button className="pay-button" onClick={handleNext}>
                Pay ₹{movieTotalAmount}
              </button>
            </div>
          )}
        </div>
      )}

      {type === "dining" && (
        <div className="booking-form-card">
          <h3>Reserve a Table</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Date</label>
              <input type="date" className="form-input" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="time" className="form-input" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Guests</label>
              <div className="guest-selector">
                {[2, 3, 4, 5, 6, 8].map(n => (
                  <button 
                    key={n} 
                    className={`guest-pill ${guests === n ? 'active' : ''}`}
                    onClick={() => setGuests(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="reservation-note">
            <p><strong>Reservation Fee: ₹500</strong></p>
            <p className="note-text">This amount will be adjusted against your final bill at the restaurant.</p>
          </div>

          <button className="next-btn full-width" onClick={handleNext} disabled={!date || !time}>
            Proceed to Pay ₹500
          </button>
        </div>
      )}

      {(type === "event" || type === "activity") && (
        <div className="booking-form-card">
          <h3>Select Tickets</h3>
          <div className="ticket-control-wrapper">
            <div className="ticket-info">
              <span className="ticket-type">General Access</span>
              <span className="ticket-price">₹{eventPrice}</span>
            </div>
            <div className="counter-control">
              <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}>−</button>
              <span className="count">{ticketCount}</span>
              <button onClick={() => setTicketCount(ticketCount + 1)}>+</button>
            </div>
          </div>
          
          <div className="price-breakdown">
             <div className="breakdown-row">
               <span>Subtotal</span>
               <span>₹{eventPrice * ticketCount}</span>
             </div>
             <div className="breakdown-row">
               <span>Booking Fee</span>
               <span>₹{ticketCount * 20}</span>
             </div>
             <div className="breakdown-row total">
               <span>Total</span>
               <span>₹{eventPrice * ticketCount + (ticketCount * 20)}</span>
             </div>
          </div>

          <button className="next-btn full-width" onClick={handleNext}>
            Proceed to Pay ₹{eventPrice * ticketCount + (ticketCount * 20)}
          </button>
        </div>
      )}
    </div>
  );
};

export default Booking;
