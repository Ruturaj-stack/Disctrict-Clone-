import "./SectionCarousel.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SectionCarousel = ({ title, items, viewAllLink }) => {
  const navigate = useNavigate();
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { current } = rowRef;
      const scrollAmount = 300;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleItemClick = (item) => {
    // Determine the type based on the item properties or context if available
    // For now, we'll route to booking directly with the item state
    // But ideally, we should go to a detail page first.
    // Given the instructions, we can go to booking for simplicity or detail if we had it.
    // Let's use the generic booking page we set up which handles different types.
    
    // Guess type if not explicit
    let type = "activity";
    if (item.price && item.price.includes("Book Now")) type = "movie";
    if (item.category) type = "event";
    
    navigate("/booking", { state: { ...item, type } });
  };

  return (
    <section className="section-block">
      <div className="section-header">
        <h2>{title}</h2>
        {viewAllLink && (
          <button 
            className="view-all-btn"
            onClick={() => navigate(viewAllLink)}
          >
            View All ▸
          </button>
        )}
      </div>

      <div className="carousel-wrapper">
        <button className="nav-btn left" onClick={() => handleScroll("left")}>
          <ChevronLeft size={24} />
        </button>
        
        <div className="section-row" ref={rowRef}>
          {items.map((item) => (
            <div
              key={item.id}
              className="section-card"
              onClick={() => handleItemClick(item)}
            >
              <div className="card-img-wrapper">
                <img src={item.image} alt={item.title} />
                <div className="card-overlay"></div>
              </div>

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

        <button className="nav-btn right" onClick={() => handleScroll("right")}>
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default SectionCarousel;
