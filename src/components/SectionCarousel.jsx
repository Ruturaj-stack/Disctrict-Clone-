import "./SectionCarousel.css";
import { useNavigate } from "react-router-dom";

const SectionCarousel = ({ title, items }) => {
  const navigate = useNavigate();

  return (
    <section className="section-block">
      <div className="section-header">
        <h2>{title}</h2>
        <button className="view-all-btn">View All ▸</button>
      </div>

      <div className="section-row">
        {items.map((item) => (
          <div
            key={item.id}
            className="section-card"
            onClick={() => navigate(`/activity/${item.id}`, { state: item })}
            style={{ cursor: "pointer" }} // ensures hover pointer like real website
          >
            <img src={item.image} alt={item.title} />

            <div className="section-card-body">
              <h3>{item.title}</h3>
              {item.subtitle && <p className="sub">{item.subtitle}</p>}
              <p className="meta">{item.meta}</p>
              <p className="loc">{item.location}</p>
              <p className="price">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionCarousel;
