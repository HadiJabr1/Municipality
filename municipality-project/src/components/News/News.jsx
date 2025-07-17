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
    detailImage: detailedArticleImage ,
    detailContent: {
      source: 'City of Springfield',
      fullText: `The Springfield Community Center, a state-of-the-art facility, officially opened its doors today, welcoming residents of all ages for a wide array of programs and activities. The center features a modern gymnasium, multiple fitness studios, community rooms, and an indoor swimming pool. This initiative aims to foster community engagement and provide accessible recreational and educational opportunities. Local officials expressed their excitement about the new hub, emphasizing its role in promoting healthy lifestyles and strengthening community bonds. "This center is a testament to our commitment to the well-being of our citizens," stated Mayor Jane Doe during the ribbon-cutting ceremony. "It will serve as a vibrant gathering place for years to come."`,
      quote: `"This center is a testament to our commitment to the well-being of our citizens," stated Mayor Jane Doe during the ribbon-cutting ceremony. "It will serve as a vibrant gathering place for years to come."`,
      additionalInfo: `Future plans for the community center include expanding program offerings based on community feedback, hosting local events, and collaborating with various community organizations to maximize its utility. Residents are encouraged to visit the center and explore the diverse range of classes and facilities available.`
    }
  },
  {
    id: 2,
    image: image28,
    title: "City Council Approves New Budget",
    description: "The budget includes funding for infrastructure improvements, public safety, and community services.",
    date: '2025-07-05',
    detailImage: detailedArticleImage ,
    detailContent: {
      source: 'City of Springfield',
      fullText: `The City Council today unanimously approved the new fiscal year budget, allocating significant funds towards critical infrastructure improvements, enhanced public safety measures, and expanded community services. The budget prioritizes sustainable development and aims to address the growing needs of the city's residents. Discussions highlighted investments in road repairs, new park facilities, and increased staffing for emergency services. Mayor Robert Thompson commented, "This budget reflects our commitment to a prosperous and secure future for all Springfield residents. We believe these investments will yield substantial returns in quality of life."`,
      quote: `"This budget reflects our commitment to a prosperous and secure future for all Springfield residents. We believe these investments will yield substantial returns in quality of life."`,
      additionalInfo: `Key initiatives funded include a new police substation, a city-wide recycling program expansion, and increased funding for after-school programs for youth. The council emphasized transparency and public accountability in the budget's implementation.`
    }
  },
  {
    id: 3,
    image: image29,
    title: "Local Business Wins National Award",
    description: "A local business has been recognized for its innovation and contributions to the community.",
    date: '2025-06-28',
    detailImage: detailedArticleImage ,
    detailContent: {
      source: 'City of Springfield',
      fullText: `Tech Innovators Inc., a leading local tech firm, was honored with the prestigious National Innovation Award at a ceremony in New York City last night. The award recognizes their groundbreaking work in sustainable technology solutions and their significant positive impact on the local economy and community. CEO Sarah Chen accepted the award, thanking her dedicated team and the support from the Springfield community. "This award is a testament to the hard work and creativity of our entire team," said Chen. "We are proud to call Springfield our home and to contribute to its growth and innovation."`,
      quote: `"This award is a testament to the hard work and creativity of our entire team," said Sarah Chen. "We are proud to call Springfield our home and to contribute to its growth and innovation."`,
      additionalInfo: `Tech Innovators Inc. has been a strong advocate for STEM education in local schools and has launched several initiatives to mentor aspiring young entrepreneurs. The company plans to use this recognition to further expand its research and development efforts.`
    }
  },
  {
    id: 4,
    image: image27,
    title: "Parks Department Announces Summer Programs",
    description: "Enrollment is now open for a wide range of summer activities at local parks.",
    date: '2025-06-20',
    detailImage: detailedArticleImage ,
    detailContent: {
      source: 'City of Springfield',
      fullText: `The Springfield Parks Department has unveiled its exciting lineup of summer programs, designed to offer fun and engaging activities for all ages. From youth sports camps to adult fitness classes and guided nature walks, there's something for everyone. Online registration is now open, and early bird discounts are available for a limited time. "We encourage everyone to get outside and enjoy our beautiful parks this summer," said Parks Director Mark Johnson.`,
      quote: `"We encourage everyone to get outside and enjoy our beautiful parks this summer," said Parks Director Mark Johnson.`,
      additionalInfo: `Special events include a weekly concert series in Central Park and a family movie night series at various park locations throughout July and August.`
    }
  },
  {
    id: 5,
    image: image28,
    title: "Road Construction Project Begins Downtown",
    description: "Expect traffic delays as major infrastructure upgrades get underway.",
    date: '2025-06-15',
    detailImage: detailedArticleImage ,
    detailContent: {
      source: 'City of Springfield',
      fullText: `A major road construction project commenced today in the downtown area, leading to temporary road closures and expected traffic delays. The project aims to improve road surfaces, upgrade storm drains, and enhance pedestrian walkways. Detour routes will be clearly marked, and residents are advised to plan their commutes accordingly. The project is anticipated to be completed by late fall. "We understand that construction can be inconvenient, but these upgrades are essential for the long-term vitality of our downtown," stated Public Works Director Emily Davis.`,
      quote: `"We understand that construction can be inconvenient, but these upgrades are essential for the long-term vitality of our downtown," stated Public Works Director Emily Davis.`,
      additionalInfo: `Updates on project progress and any further traffic impacts will be regularly posted on the city's official website and social media channels.`
    }
  },
  {
    id: 6,
    image: image29,
    title: "Youth Soccer League Kicks Off New Season",
    description: "Hundreds of young athletes are ready to compete in this year's soccer league.",
    date: '2025-06-10',
    detailImage: detailedArticleImage ,
    detailContent: {
      source: 'City of Springfield',
      fullText: `The Springfield Youth Soccer League kicked off its new season this past weekend, with hundreds of enthusiastic young athletes taking to the fields across the city. The league promotes teamwork, sportsmanship, and physical activity among children aged 5-14. Parents and coaches alike expressed excitement for a fun and competitive season. "It's wonderful to see so many kids active and engaged," said League Coordinator Tom Green.`,
      quote: `"It's wonderful to see so many kids active and engaged," said League Coordinator Tom Green.`,
      additionalInfo: `The league will host games every Saturday morning through August, culminating in a championship tournament and awards ceremony.`
    }
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
          <button className="search-icon">🔍</button>
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