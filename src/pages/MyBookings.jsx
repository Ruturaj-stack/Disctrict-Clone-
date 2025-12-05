import { getBookings, deleteBooking } from "../utils/storage";
import "./MyBookings.css";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

const removeBooking = (id) => {
  deleteBooking(id);
  setBookings(getBookings());
  toast.error("Booking Cancelled ❌");
};


  return (
    <div className="bookings-container">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings yet. Book your first ticket!</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((b) => (
            <div key={b.id} className="ticket-card">
              <img src={b.poster} alt={b.title} />
              <h3>{b.title}</h3>
              <p><strong>Seats:</strong> {b.seats}</p>
              <p><strong>Amount:</strong> ₹{b.price}</p>
              <p><strong>Booked on:</strong> {b.time}</p>

              <button className="delete-btn" onClick={() => removeBooking(b.id)}>
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
