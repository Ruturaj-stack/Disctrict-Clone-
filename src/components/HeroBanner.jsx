import React, { useState, useEffect } from "react";
import "./HeroBanner.css";
import { useNavigate } from "react-router-dom";
import lollaImg from "../assets/lolla.png";
import dunkiImg from "../assets/dunki.png";
import edImg from "../assets/ed.png";


const heroData = [
 
  {
    id: 1,
    title: "Dunki",
    subtitle: "A Rajkumar Hirani Film",
    image: dunkiImg,   // ← here
    type: "movie",
    price: "Book Now"
  },
  {
    id: 2,
    title: "Ed Sheeran Tour",
    subtitle: "+–=÷× Tour | Mumbai",
    image: edImg,      // ← here
    type: "event",
    price: "₹4,500 onwards"
  },
   {
    id: 3,
    title: "Lollapalooza India 2024",
    subtitle: "The biggest music festival is back!",
    image: lollaImg,   // ← use the imported image variable
    type: "event",
    price: "₹5,999 onwards"
  },
];


const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleBook = (item) => {
    navigate("/booking", { state: { ...item, name: item.title } });
  };

  return (
    <div className="hero-banner">
      <div className="banner-slider" style={{ transform: `translateX(-${current * 100}%)` }}>
        {heroData.map((banner, index) => (
          <div key={banner.id} className="banner-slide">
            <div
              className="banner-image"
              style={{
                backgroundImage: `url(${banner.image})`,
                transform: current === index ? "scale(1.05)" : "scale(1)"
              }}
            />
            <div className="banner-overlay">
              <div className="banner-content container">
                <h1>{banner.title}</h1>
                <p>{banner.subtitle}</p>
                <button className="banner-btn" onClick={() => handleBook(banner)}>
                  {banner.type === "movie" ? "Book Tickets" : "Buy Now"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="banner-dots">
        {heroData.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${current === idx ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
