import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";
import { saveBooking } from "../utils/storage";
import toast from "react-hot-toast";


const Payment = () => {
  const { state } = useLocation(); // booking info from previous page
  const navigate = useNavigate();

  const totalAmount = state.seats.length * 250; // price per seat (demo)



const handlePayment = () => {
  const bookingData = {
    id: Date.now(),
    title: state.title,
    poster: state.poster,
    seats: state.seats,
    price: totalAmount,
    time: new Date().toLocaleString()
  };

  saveBooking(bookingData);
  toast.success("Payment Successful  Ticket Booked!");

  navigate("/confirmation", { state: bookingData });
};



  return (
    <div className="payment-container">
      <h1>Payment Summary</h1>

      <div className="payment-details">
        <img src={state.poster} alt={state.title} />
        <div className="payment-info">
          <h2>{state.title}</h2>
          <p>Seats: {state.seats.join(", ")}</p>
          <p>Total Amount: ₹{state.amount}</p>

        </div>
      </div>

      <button className="pay-btn" onClick={handlePayment}>
        Pay Now ₹{totalAmount}
      </button>
    </div>
  );
};

export default Payment;
