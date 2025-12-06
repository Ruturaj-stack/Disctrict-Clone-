import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import MyBookings from "./pages/MyBookings";
import Movies from "./pages/Movies";
import Events from "./pages/Events";
import Dining from "./pages/Dining";
import Activities from "./pages/Activities";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import ShowTimes from "./pages/ShowTimes";
import ActivityDetail from "./pages/ActivityDetail";
import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import EventDetail from "./pages/EventDetail";

console.log("EVENTS COMPONENT:", Events);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <AuthModal />
        <Toaster position="top-center" reverseOrder={false} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/events" element={<Events />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/activity/:id" element={<ActivityDetail />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/showtimes/:id" element={<ShowTimes />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
