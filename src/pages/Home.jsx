import "./Home.css";
import HeroBanner from "../components/HeroBanner";
import MoviesCarousel from "../components/MoviesCarousel";
import SectionCarousel from "../components/SectionCarousel";
import ArtistsStrip from "../components/ArtistsStrip";


import {
  crowdFavouriteActivities,
  indiaTopEvents,
  bestComedy,
  sportsMania,
  artistsInDistrict,
} from "../utils/homeData";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <HeroBanner />

      <div className="home-inner container">
        <div className="section-header-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
             <h2 className="section-title">Recommended Movies</h2>
             <button className="view-all-btn" onClick={() => navigate('/movies')} style={{ background: 'none', border: 'none', color: '#ef4f5f', cursor: 'pointer', fontSize: '1rem' }}>View All ▸</button>
        </div>
        <MoviesCarousel />

        <SectionCarousel
          title="Crowd Favourite Activities"
          items={crowdFavouriteActivities}
          viewAllLink="/activities"
        />

      <div style={{ marginTop: "70px" }}>
  <ArtistsStrip
    title="Artists in your District"
    artists={artistsInDistrict}
  />
</div>


        <SectionCarousel 
          title="India’s Top Events" 
          items={indiaTopEvents} 
          viewAllLink="/events"
        />

        <SectionCarousel 
          title="Best in Comedy" 
          items={bestComedy} 
          viewAllLink="/events"
        />

        <SectionCarousel 
          title="Sports Mania" 
          items={sportsMania} 
          viewAllLink="/events"
        />
      </div>
    </div>
  );
};

export default Home;
