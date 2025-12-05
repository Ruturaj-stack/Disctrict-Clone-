import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";
import { useState, useEffect } from "react";
import { getBookings } from "../utils/storage";
import toast from "react-hot-toast";


const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const rows = ["A", "B", "C", "D", "E"];
  const seatsPerRow = 10;

  const seatPrices = {
    A: 400,
    B: 400,
    C: 300,
    D: 300,
    E: 200
  };

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const allBookings = getBookings();
    const sameMovieBookings = allBookings.filter(
      (b) => b.title === state.title
    );
    const reserved = sameMovieBookings.flatMap((b) => b.seats);
    setBookedSeats(reserved);
  }, [state.title]);

  const toggleSeat = (seat) => {
  if (bookedSeats.includes(seat)) {
  toast.error("This seat is already booked ❌");
  return;
}


    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const totalAmount = selectedSeats.reduce((acc, seat) => {
    const row = seat.charAt(0); 
    return acc + seatPrices[row];
  }, 0);

  const handleNext = () => {
    navigate("/payment", { state: { ...state, seats: selectedSeats, amount: totalAmount } });
  };

  return (
    <div className="booking-container">
      <h1 className="movie-name">{state.title}</h1>

      <div className="screen">SCREEN THIS WAY</div>

      <div className="legend">
        <span className="legend-item platinum">Platinum ₹400</span>
        <span className="legend-item gold">Gold ₹300</span>
        <span className="legend-item silver">Silver ₹200</span>
      </div>

      <div className="seat-layout">
        {rows.map((row) => (
          <div key={row} className="seat-row">
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const seatId = `${row}${i + 1}`;
              const selected = selectedSeats.includes(seatId);
              const reserved = bookedSeats.includes(seatId);

              return (
                <div
                  key={seatId}
                  className={`seat seat-${row} ${selected ? "selected-seat" : ""} ${
                    reserved ? "booked-seat" : ""
                  }`}
                  onClick={() => toggleSeat(seatId)}
                >
                  {seatId}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="selected-info">
        <h2>Selected Seats: {selectedSeats.join(", ") || "None"}</h2>
        <h2>Total Price: ₹{totalAmount}</h2>

        <button
          className="next-btn"
          disabled={selectedSeats.length === 0}
          onClick={handleNext}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Booking;
