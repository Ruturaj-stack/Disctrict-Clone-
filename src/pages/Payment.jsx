import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";
import { saveBooking } from "../utils/storage";
import toast from "react-hot-toast";
import { useState } from "react";
import { CreditCard, Smartphone, Landmark, Wallet } from "lucide-react";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  if (!state) return <div className="payment-container error"><h2>Invalid Payment Request</h2></div>;

  const type = state.type || "movie";
  const amount = state.amount;

  const handlePayment = () => {
    // Simulate payment processing
    const loadingToast = toast.loading("Processing payment...");
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      
      const bookingData = {
        id: Date.now(),
        ...state,
        time: state.time || new Date().toLocaleString(),
        date: state.date || new Date().toLocaleDateString(),
        paymentMethod
      };

      saveBooking(bookingData);
      toast.success("Booking Confirmed!");
      navigate("/confirmation", { state: bookingData });
    }, 2000);
  };

  return (
    <div className="payment-page container">
      <div className="payment-wrapper">
        {/* Left Side: Payment Methods */}
        <div className="payment-methods-section">
          <h2 className="section-header">Payment Options</h2>
          
          <div className="payment-options">
            <div 
              className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              <div className="option-icon"><CreditCard size={24} /></div>
              <div className="option-details">
                <span className="option-title">Credit / Debit Card</span>
                <span className="option-sub">Visa, Mastercard, RuPay</span>
              </div>
              <div className="radio-circle"></div>
            </div>

            <div 
              className={`payment-option ${paymentMethod === 'upi' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('upi')}
            >
              <div className="option-icon"><Smartphone size={24} /></div>
              <div className="option-details">
                <span className="option-title">UPI</span>
                <span className="option-sub">Google Pay, PhonePe, Paytm</span>
              </div>
              <div className="radio-circle"></div>
            </div>

            <div 
              className={`payment-option ${paymentMethod === 'netbanking' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('netbanking')}
            >
              <div className="option-icon"><Landmark size={24} /></div>
              <div className="option-details">
                <span className="option-title">Net Banking</span>
                <span className="option-sub">All major banks supported</span>
              </div>
              <div className="radio-circle"></div>
            </div>

            <div 
              className={`payment-option ${paymentMethod === 'wallet' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('wallet')}
            >
              <div className="option-icon"><Wallet size={24} /></div>
              <div className="option-details">
                <span className="option-title">Wallets</span>
                <span className="option-sub">Paytm, Amazon Pay, Mobikwik</span>
              </div>
              <div className="radio-circle"></div>
            </div>
          </div>

          {/* Dynamic Payment Form based on selection */}
          <div className="payment-form-area">
            {paymentMethod === 'card' && (
               <div className="card-form">
                 <input type="text" placeholder="Card Number" className="input-field" />
                 <div className="row">
                   <input type="text" placeholder="Expiry (MM/YY)" className="input-field" />
                   <input type="text" placeholder="CVV" className="input-field" />
                 </div>
                 <input type="text" placeholder="Name on Card" className="input-field" />
               </div>
            )}
            {paymentMethod === 'upi' && (
               <div className="upi-form">
                 <input type="text" placeholder="Enter UPI ID (e.g. user@okhdfc)" className="input-field" />
                 <button className="verify-btn">Verify</button>
               </div>
            )}
             <div className="secure-note">
               🔒 Your payment info is safe and secure
             </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="order-summary-section">
          <h2 className="section-header">Order Summary</h2>
          
          <div className="summary-card">
            <div className="summary-header">
               <div className="item-details">
                 <h3>{state.title || state.name}</h3>
                 <p>{state.location}</p>
                 <div className="tags">
                   {type === "movie" && <span className="tag">Movie</span>}
                   {type === "dining" && <span className="tag">Dining</span>}
                   {type === "event" && <span className="tag">Event</span>}
                 </div>
               </div>
               <img src={state.poster || state.image} alt="poster" className="summary-poster" />
            </div>
            
            <div className="divider"></div>
            
            <div className="booking-details-list">
              {type === "movie" && (
                <>
                   <div className="detail-row">
                     <span>Date & Time</span>
                     <span>{state.date}, {state.time}</span>
                   </div>
                   <div className="detail-row">
                     <span>Seats</span>
                     <span>{state.seats?.join(", ")}</span>
                   </div>
                   <div className="detail-row">
                     <span>Screen</span>
                     <span>Audi 2</span>
                   </div>
                </>
              )}
              
              {type === "dining" && (
                 <>
                   <div className="detail-row">
                     <span>Reservation</span>
                     <span>{state.date} at {state.time}</span>
                   </div>
                   <div className="detail-row">
                     <span>Guests</span>
                     <span>{state.guests} People</span>
                   </div>
                 </>
              )}

              {(type === "event" || type === "activity") && (
                 <div className="detail-row">
                   <span>Tickets</span>
                   <span>{state.tickets} x General Access</span>
                 </div>
              )}
            </div>

            <div className="divider"></div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{amount}</span>
              </div>
              <div className="price-row">
                <span>Convenience Fee</span>
                <span>₹{(amount * 0.02).toFixed(0)}</span>
              </div>
              <div className="price-row total">
                <span>Total Amount</span>
                <span>₹{Math.floor(amount + (amount * 0.02))}</span>
              </div>
            </div>

            <button className="pay-now-btn" onClick={handlePayment}>
              Pay ₹{Math.floor(amount + (amount * 0.02))}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
