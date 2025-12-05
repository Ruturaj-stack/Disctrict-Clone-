import "./HeroBanner.css";

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="banner-content">
        <h1 className="banner-title">P-POP CULTURE</h1>
        <p className="banner-subtext">Presale is now live</p>

        <button className="book-btn">
          Book Tickets
        </button>
      </div>

      <img
        src="https://i.ibb.co/c61ktKm/banner-sample.jpg"
        alt="Banner"
        className="banner-image"
      />
    </div>
  );
};

export default HeroBanner;
