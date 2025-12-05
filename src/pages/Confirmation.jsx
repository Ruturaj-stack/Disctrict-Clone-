import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Confirmation.css";

const Confirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const downloadPDF = () => {
    const ticket = document.getElementById("ticket");

    html2canvas(ticket).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${state.title}-Ticket.pdf`);
    });
  };

  return (
    <div className="confirmation-page">
      <h2>🎉 Booking Confirmed!</h2>

      <div className="ticket" id="ticket">
        <h3>{state.title}</h3>
        <p style={{ opacity: 0.8, fontSize: "14px" }}>District Cinemas | Mumbai</p>

        <img src={state.poster} alt="poster" className="ticket-poster" />

        <p><strong>Seats:</strong> {state.seats.join(", ")}</p>
        <p><strong>Amount Paid:</strong> ₹{state.amount}</p>
        <p><strong>Booking Time:</strong> {state.time}</p>

        <div className="qr-box">
          <QRCodeCanvas value={`${state.title}-${state.time}-${state.seats}`} size={150} />

        </div>
      </div>

      <button onClick={downloadPDF}>📥 Download Ticket PDF</button>
      <button style={{ marginTop: "10px" }} onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Confirmation;
