import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Confirmation.css";

const Confirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div>Invalid Booking</div>;

  const type = state.type || "movie";

  const downloadPDF = () => {
    const ticket = document.getElementById("ticket");

    html2canvas(ticket).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${state.title || state.name}-Ticket.pdf`);
    });
  };

  return (
    <div className="confirmation-page">
      <h2>🎉 Booking Confirmed!</h2>

      <div className="ticket" id="ticket">
        <h3>{state.title || state.name}</h3>
        <p style={{ opacity: 0.8, fontSize: "14px" }}>
          {type === 'dining' ? state.location : 'District Entertainment | Mumbai'}
        </p>

        <img src={state.poster || state.image} alt="poster" className="ticket-poster" />

        <div className="ticket-details">
          {type === "movie" && <p><strong>Seats:</strong> {state.seats?.join(", ")}</p>}
          {type === "dining" && (
            <>
              <p><strong>Date:</strong> {state.date}</p>
              <p><strong>Time:</strong> {state.time}</p>
              <p><strong>Guests:</strong> {state.guests}</p>
            </>
          )}
          {(type === "event" || type === "activity") && (
             <p><strong>Tickets:</strong> {state.tickets}</p>
          )}
          <p><strong>Amount Paid:</strong> ₹{state.amount}</p>
          <p><strong>Booking Time:</strong> {state.time}</p>
        </div>

        <div className="qr-box">
          <QRCodeCanvas value={JSON.stringify(state)} size={120} />
        </div>
      </div>

      <button onClick={downloadPDF} className="download-btn">📥 Download Ticket PDF</button>
      <button className="home-btn" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Confirmation;
