import "./Home.css";
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

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero / top banner – simple for now */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>Discover movies, events & more in your District</h1>
          <p>Book tickets for movies, concerts, activities and dining experiences.</p>
        </div>
      </section>

      <div className="home-inner">
        <SectionCarousel
          title="Crowd Favourite Activities"
          items={crowdFavouriteActivities}
        />

        <h2 className="section-title">Top Hindi movies near you</h2>
        <MoviesCarousel title="Top Hindi movies near you" query="Hindi" />

        <ArtistsStrip
          title="Artists in your District"
          artists={artistsInDistrict}
        />

        <SectionCarousel title="India’s Top Events" items={indiaTopEvents} />

        <SectionCarousel title="Best in Comedy" items={bestComedy} />

        <SectionCarousel title="Sports Mania" items={sportsMania} />
      </div>
    </div>
  );
};

export default Home;
