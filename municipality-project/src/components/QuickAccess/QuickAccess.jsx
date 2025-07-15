// src/components/QuickAccess.jsx
import './QuickAccess.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import image5 from '../../assets/images/image5.png';
import image6 from '../../assets/images/image6.png';
import image7 from '../../assets/images/image7.png';
import image8 from '../../assets/images/image8.png';
import { useRef } from 'react';

const QuickAccess = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const services = [
    { image: image5, title: 'Report a Problem' },
    { image: image6, title: 'Trash Schedule' },
    { image: image7, title: 'Apply for Permits' },
    { image: image8, title: ' Pay Bills' }
  ];

  return (
    <section className="quick-access">
      <div className="container">
        <h2 className="section-heading">Quick Access</h2>
        <div className="carousel-wrapper">
          <button className="carousel-arrow left" onClick={() => scroll('left')}>
            <FaArrowLeft />
          </button>

          <div className="carousel" ref={scrollRef}>
            {services.map((service, index) => (
              <div key={index} className="carousel-card">
                <img src={service.image} alt={service.title} />
                <p>{service.title}</p>
              </div>
            ))}
          </div>

          <button className="carousel-arrow right" onClick={() => scroll('right')}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
