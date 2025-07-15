import './NewsItem.css';

const NewsItem = ({ date, title, content, image }) => {
  return (
    
    <div className="news-item">
     
      <div className="news-details">
        <div className="news-date">{date}</div>
        <h3 className="news-title">{title}</h3>
        <p className="news-excerpt">{content}</p>
      </div>
     
      <div className="news-image-container">
        <img 
            src={image} 
            alt={`Visual representation of: ${title}`} 
            className="news-image"
       
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/450x300/e2e8f0/e2e8f0?text=Image+Not+Found'; }}
        />
      </div>
    </div>
  );
}

export default NewsItem;
