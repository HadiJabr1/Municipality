// src/components/CityServices/CityServices.jsx
import React, { useState } from 'react';
import './CityServices.css';
import { FaSearch } from 'react-icons/fa';
import image14 from '../../assets/images/image14.png';
import image15 from '../../assets/images/image15.png';
import image16 from '../../assets/images/image16.png';
import image17 from '../../assets/images/image17.png';
import image18 from '../../assets/images/image18.png';

const categories = ['All Services', 'Public Works', 'Permits', 'Finance', 'Parks & Recreation'];

const services = [
  {
    image: image14,
    title: 'Report a Pothole',
    description: 'Report potholes on city streets for repair.',
    category: 'Public Works',
    linkText: 'Report potholes on city streets for repair.'
  },
  {
    image: image15,
    title: 'Apply for a Building Permit',
    description: 'Apply for building permits for construction or renovation projects.',
    category: 'Permits'
  },
  {
    image: image16,
    title: 'Pay Property Taxes',
    description: 'Pay your property taxes online or in person.',
    category: 'Finance'
  },
  {
    image: image17,
    title: 'Register for a Recreation Program',
    description: 'Register for various recreation programs offered by the city.',
    category: 'Parks & Recreation'
  },
  {
    image: image18,
    title: 'Request a Bulk Item Pickup',
    description: 'Schedule a pickup for large items not covered by regular trash service.',
    category: 'Public Works'
  }
];

const CityServices = () => {
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'All Services' || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="city-services">
      <div className="container">
        <h2 className="title">City Services</h2>

        <div className="controls">
          <div className="tabs">
            {categories.map(cat => (
              <button 
                key={cat}
                className={activeCategory === cat ? 'tab active' : 'tab'}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>

        <div className="services-grid">
          {filteredServices.map((service, index) => (
            <div className="service-card" key={index}>
              <img src={service.image} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityServices;
