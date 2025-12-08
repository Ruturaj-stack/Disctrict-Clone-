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
          {bookings.map((b) => {
            const type = b.type || "movie";
            const title = b.title || b.name;
            const poster = b.poster || b.image;
            return (
              <div key={b.id} className="ticket-card">
                <img src={poster} alt={title} />
                <h3>{title}</h3>
                <p className="tag-row">
                  <span className={`tag ${type}`}>{type.toUpperCase()}</span>
                </p>

                {type === "movie" && (
                  <p><strong>Seats:</strong> {Array.isArray(b.seats) ? b.seats.join(", ") : b.seats}</p>
                )}
                {type === "dining" && (
                  <p><strong>Reservation:</strong> {b.date} at {b.time}</p>
                )}
                {(type === "event" || type === "activity") && (
                  <p><strong>Tickets:</strong> {b.tickets || 1}</p>
                )}

                <p><strong>Amount:</strong> ₹{b.amount || b.price}</p>
                <p><strong>Booked on:</strong> {b.time}</p>

                <button className="delete-btn" onClick={() => removeBooking(b.id)}>
                  Cancel Booking
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
