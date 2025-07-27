import React, { useState } from 'react';
import './UpcomingEvents.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import image1 from '../../assets/images/image30.png';
import image2 from '../../assets/images/image31.png';
import image3 from '../../assets/images/image32.png';
import image4 from '../../assets/images/image33.png';
import image5 from '../../assets/images/image34.png';
import image6 from '../../assets/images/image35.png';

const UpcomingEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  // All events data
  const allEvents = [
    {
      id: 1,
      title: "Community Cleanup Day",
      description: "Join us for a day of community service as we work together to clean up our local parks and streets. Bring your friends and family for a fun and rewarding experience.",
      date: "July 15, 2024",
      location: "next to clock tower",
      image: image1,
      alt: "Community Cleanup"
    },
    {
      id: 2,
      title: "Summer Concert Series",
      description: "Enjoy live music performances every Friday evening throughout the summer. Featuring local bands and artists, this series offers a diverse range of musical genres.",
      date: "Every Friday, June - August 2024",
      location: "Central Park Amphitheater",
      image: image2,
      alt: "Concert"
    },
    {
      id: 3,
      title: "Farmers Market",
      description: "Discover fresh, locally sourced produce, artisanal goods, and more at our weekly farmers market. Support local businesses and enjoy the vibrant atmosphere.",
      date: "Every Saturday, 8AM-2PM",
      location: "Main Street Square",
      image: image3,
      alt: "Farmers Market"
    },
    {
      id: 4,
      title: "Art Exhibition",
      description: "Explore a collection of contemporary art from local artists. The exhibition features paintings, sculptures, and mixed media works, showcasing the creativity of our community.",
      date: "August 5-30, 2024",
      location: "Community Art Center",
      image: image4,
      alt: "Art Exhibition"
    },
    {
      id: 5,
      title: "Community Workshop: Sustainable Living",
      description: "Learn practical tips for sustainable living in this interactive workshop. Topics include reducing waste, conserving energy, and making eco-friendly choices.",
      date: "July 22, 2024",
      location: "Community Center Room B",
      image: image5,
      alt: "Workshop"
    },
    {
      id: 6,
      title: "Book Club Meeting",
      description: "Join fellow book lovers for a discussion of this month's featured book. Share your thoughts, insights, and enjoy a lively conversation.",
      date: "July 28, 2024",
      location: "Public Library Conference Room",
      image: image6,
      alt: "Book Club"
    }
  ];

  // Calculate current events to display
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = allEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(allEvents.length / eventsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate page numbers with ellipsis logic
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;

    // Always show first page
    pageNumbers.push(
      <span 
        key={1} 
        className={`page-number ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => handlePageChange(1)}
      >
        1
      </span>
    );

    // Show ellipsis if current page is beyond maxVisiblePages
    if (currentPage > maxVisiblePages) {
      pageNumbers.push(<span key="start-ellipsis" className="page-dots">...</span>);
    }

    // Calculate start and end page numbers
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if near start
    if (currentPage <= maxVisiblePages) {
      startPage = 2;
      endPage = Math.min(4, totalPages - 1);
    }
    // Adjust if near end
    else if (currentPage > totalPages - maxVisiblePages) {
      startPage = totalPages - 2;
      endPage = totalPages - 1;
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span 
          key={i} 
          className={`page-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }

    // Show ellipsis if not near end
    if (currentPage < totalPages - 1 && totalPages > maxVisiblePages + 1) {
      pageNumbers.push(<span key="end-ellipsis" className="page-dots">...</span>);
    }

    // Always show last page if there are multiple pages
    if (totalPages > 1) {
      pageNumbers.push(
        <span 
          key={totalPages} 
          className={`page-number ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="events-page">
      <div className="header-container">
        <h1 className="title">Upcoming <span className="title-highlight">Events</span></h1>
        <p className="subtitle">
          Stay informed about the latest happenings in our community. Explore a variety of events,
          from cultural festivals to community workshops, designed to engage and connect residents.
        </p>
      </div>

      <div className="events-container">
        {currentEvents.map(event => (
          <div className="event-card-with-image" key={event.id}>
            <div className="event-content">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">
                {event.description}
              </p>
              <p className="event-date"><strong>Date:</strong> {event.date}</p>
              <p className="event-location"><strong>Location:</strong> {event.location}</p>
              <div className="divider"></div>
              <button className="view-details-button">View Details</button>
            </div>
            <div className="event-image-container">
              <img src={event.image} alt={event.alt} className="event-image" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          className="pagination-arrow" 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        
        {renderPageNumbers()}
        
        <button 
          className="pagination-arrow" 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;