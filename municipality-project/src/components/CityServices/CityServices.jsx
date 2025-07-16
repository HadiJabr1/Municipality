// src/components/CityServices/CityServices.jsx
import React, { useState } from 'react';
import './CityServices.css';
import { FaSearch } from 'react-icons/fa';
import image14 from '../../assets/images/image14.png';
import image15 from '../../assets/images/image15.png';
import image16 from '../../assets/images/image16.png';
import image17 from '../../assets/images/image17.png';
import image18 from '../../assets/images/image18.png';
import image19 from '../../assets/images/image19.png';
import image20 from '../../assets/images/image20.png';
import image21 from '../../assets/images/image21.png';
import image22 from '../../assets/images/image22.png';
import image23 from '../../assets/images/image23.png';
import image24 from '../../assets/images/image24.png';
import image25 from '../../assets/images/image25.png';

const categories = ['All Services', 'Public Works', 'Permits', 'Finance', 'Parks & Recreation'];

const services = [
  {
    image: image14,
    title: 'View Zoning Regulations',
    description: 'View zoning regulations for different areas of the city.',
    category: 'Permits'
  },
  {
    image: image15,
    title: 'Access Financial Reports',
    description: 'Access financial reports and budget information.',
    category: 'Finance'
  },
  {
    image: image16,
    title: 'Reserve a Park Facility',
    description: 'Reserve facilities at city parks for events or gatherings.',
    category: 'Parks & Recreation'
  },
  {
    image: image17,
    title: 'Submit a Service Request',
    description: 'Submit service requests for various issues or concerns.',
    category: 'Public Works'
  },
  {
    image: image18,
    title: 'Check Permit Status',
    description: 'Check the status of your permit applications.',
    category: 'Permits'
  },
  {
    image: image19,
    title: 'Manage Utility Payments',
    description: 'Manage your utility payments online.',
    category: 'Finance'
  },
  {
    image: image20,
    title: 'Explore Community Events',
    description: 'Explore and register for community events and activities.',
    category: 'Parks & Recreation'
  },
  {
    image: image21,
    title: 'Report a Streetlight Issue',
    description: 'Report malfunctioning or damaged streetlights.',
    category: 'Public Works'
  },
  {
    image: image22,
    title: 'Apply for Business License',
    description: 'Apply for or renew a business license.',
    category: 'Permits'
  },
  {
    image: image23,
    title: 'View Tax Records',
    description: 'Access property tax records and history.',
    category: 'Finance'
  },
  {
    image: image24,
    title: 'Reserve Sports Field',
    description: 'Reserve athletic fields for games or practices.',
    category: 'Parks & Recreation'
  },
  {
    image: image25,
    title: 'Request Tree Trimming',
    description: 'Request trimming of city-owned trees.',
    category: 'Public Works'
  }
];

const CityServices = () => {
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'All Services' || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const pageNumbers = [];
    pageNumbers.push(1);
    
    if (currentPage > 3) {
      pageNumbers.push('...');
    }
    
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    
    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }
    
    pageNumbers.push(totalPages);
    
    return pageNumbers;
  };

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
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>

        <div className="services-grid">
          {currentServices.length > 0 ? (
            currentServices.map((service, index) => (
              <div className="service-card" key={index}>
                <img src={service.image} alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No services found. Try a different search or category.</p>
            </div>
          )}
        </div>

        {filteredServices.length > servicesPerPage && (
          <div className="pagination">
            <button 
              className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </button>
            
            {getPageNumbers().map((number, index) => (
              number === '...' ? (
                <span key={index} className="ellipsis">...</span>
              ) : (
                <button
                  key={index}
                  className={currentPage === number ? 'page-number active' : 'page-number'}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              )
            ))}
            
            <button 
              className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CityServices;