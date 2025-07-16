// src/components/ExploreOurTown/ExploreOurTown.jsx
import React from 'react';
import './ExploreOurTown.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import image1 from '../../assets/images/image1.jpg';
import image2 from '../../assets/images/image2.jpg';
import image3 from '../../assets/images/image3.jpg';
import image4 from '../../assets/images/image4.jpg';
import image10 from '../../assets/images/image10.png';

const ExploreOurTown = () => {
  const townLocations = [
    { id: 1, image: image1 },
    { id: 2, image: image2 },
    { id: 3, image: image3 },
    { id: 4, image: image4 },
    { id: 5, image: image10 }
  ];

  return (
   <section className="explore-our-town">
      <div className="container">
        <h2 className="section-title">Explore Our Town</h2>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={-50} 
          centeredSlides={true}
          loop={true}
          slidesPerView={3}
          pagination={{ clickable: true }}
          navigation
          className="town-swiper"
        >
          {townLocations.map((location) => (
            <SwiperSlide key={location.id}>
              <div className="swiper-card">
                <img src={location.image} alt={`Town ${location.id}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ExploreOurTown;
