import "./ArtistsStrip.css";

const ArtistsStrip = ({ title, artists }) => {
  return (
    <section className="artists-block">
      <div className="section-header">
        <h2>{title}</h2>
      </div>

      <div className="artists-row">
        {artists.map((artist) => (
          <div key={artist.id} className="artist-pill">
            <img src={artist.image} alt={artist.name} />
            <span>{artist.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtistsStrip;
