import React, { useState } from 'react';
import './News.css';
import image27 from '../../assets/images/image27.png';
import image28 from '../../assets/images/image28.png';
import image29 from '../../assets/images/image29.png';
import detailedArticleImage  from '../../assets/images/detailedArticleImage .png'; 

const newsArticles = [
  {
    id: 1,
    image: image27,
    title: "Springfield's New Community Center Opens",
    description: "The new community center offers a variety of programs and activities for residents of all ages.",
    date: '2025-07-10',
    detailImage: detailedArticleImage 
  },
  {
    id: 2,
    image: image28,
    title: "City Council Approves New Budget",
    description: "The budget includes funding for infrastructure improvements, public safety, and community services.",
    date: '2025-07-05',
    detailImage: detailedArticleImage 
  },
  {
    id: 3,
    image: image29,
    title: "Local Business Wins National Award",
    description: "A local business has been recognized for its innovation and contributions to the community.",
    date: '2025-06-28',
    detailImage: detailedArticleImage 
  },
  {
    id: 4,
    image: image27,
    title: "Parks Department Announces Summer Programs",
    description: "Enrollment is now open for a wide range of summer activities at local parks.",
    date: '2025-06-20',
    detailImage: detailedArticleImage 
  },
  {
    id: 5,
    image: image28,
    title: "Road Construction Project Begins Downtown",
    description: "Expect traffic delays as major infrastructure upgrades get underway.",
    date: '2025-06-15',
    detailImage: detailedArticleImage 
  },
  {
    id: 6,
    image: image29,
    title: "Youth Soccer League Kicks Off New Season",
    description: "Hundreds of young athletes are ready to compete in this year's soccer league.",
    date: '2025-06-10',
    detailImage: detailedArticleImage 
  },
];

const ITEMS_PER_PAGE = 3;


const ArticleDetailPage = ({ article, onBack }) => {
  if (!article) {
    return null;
  }


  const staticNewsTitleLink = "Local Business Expo a Huge Success"; 
  const staticPublishedDate = "July 15, 2024"; 
  const staticSource = "City of Metropolis"; 


  return (
    <div className="article-detail-page">
      <div className="back-button-container">
        <button onClick={onBack} className="back-to-news-button"> Back to News</button>
      </div>
      <div className="news-header">
        <span className="news-category">News</span> / <span className="news-title-link">{staticNewsTitleLink}</span>
      </div>
      <h1 className="article-title">News Title</h1> 
      <p className="article-meta">
        Published on {staticPublishedDate} | Source: {staticSource}
      </p>

      <div className="article-image-container">
        <img src={article.detailImage} alt={article.title} className="article-detail-image" />
      </div>

      <div className="article-body">
        <p>The City of Metropolis hosted its annual Local Business Expo last weekend, and by all accounts, it was a resounding success. Over 200 local businesses participated, showcasing their products and services to a crowd of over 5,000 attendees. The event featured a variety of workshops, networking sessions, and a keynote speech from renowned entrepreneur, Amelia Stone.</p>

        <p className="article-quote">
          “This expo is a vital platform for our local businesses to connect with the community and each other,” said Mayor Robert Thompson. “The energy and enthusiasm were palpable, and we’re thrilled with the turnout and the positive feedback we’ve received.”
        </p>

        <p>Several businesses reported significant leads and sales generated during the expo, and many attendees praised the diversity and quality of the exhibitors. The event also included a "Startup Alley" highlighting innovative new businesses in the area, and a "Taste of Metropolis" section, featuring local food and beverage vendors.</p>

      </div>
    </div>
  );
};


const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearchTerm = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterDate ? article.date.startsWith(filterDate) : true;

    return matchesSearchTerm && matchesDate;
  });

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(totalPages, 5);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number, index) => (
      <button
        key={index}
        className={`pagination-number ${number === currentPage ? 'active' : ''} ${number === '...' ? 'dots' : ''}`}
        onClick={() => number !== '...' && handlePageChange(number)}
        disabled={number === '...'}
      >
        {number}
      </button>
    ));
  };


  if (selectedArticle) {
    return <ArticleDetailPage article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  return (
    <div className="news-page-container">
      <h1>Latest News</h1>

      <div className="filters-container">
        <div className="date-filter">
          <button className="date-dropdown-button">Date <span className="arrow-down"></span></button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
         
        </div>
      </div>

      <div className="news-articles-grid">
        {currentArticles.map(article => (
          <div className="news-card" key={article.id}>
            <img src={article.image} alt={article.title} className="news-card-image" />
            <div className="news-card-content">
              <h2>{article.title}</h2>
          
              <p className="news-description-link" onClick={() => setSelectedArticle(article)}>
                {article.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-arrow"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button
          className="pagination-arrow"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default NewsPage;