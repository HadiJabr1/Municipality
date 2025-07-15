import './NewsSection.css';
import NewsItem from './NewsItem';
import image9 from '../../assets/images/image9.png';
import image10 from '../../assets/images/image10.png';
import image11 from '../../assets/images/image11.png';
import { useSelector } from 'react-redux';


const mockNews = [
  {
    id: 1,
    date: 'June 28, 2024',
    title: 'New Park Opens in Central District',
    content: 'The new community park features playgrounds, walking trails, and picnic areas.',
    image: image10
  },
  {
    id: 2,
    date: 'June 25, 2024',
    title: 'Road Closure on Elm Street',
    content: 'Elm Street will be closed for construction from July 1st to July 15th.',
    image: image11
  },
  {
    id: 3,
    date: 'June 20, 2024',
    title: 'Summer Concert Series Announced',
    content: 'Enjoy free concerts every Friday evening in the town square throughout July.',
    image: image9
  }
];



const NewsSection = () => {
  const news = mockNews; 
  
  return (
    <section className="news-section">
      <div className="container">
        <div className="section-title">
          <h2>Latest News</h2>
        </div>
    
        <div className="news-list">
          {news.map(item => (
            <NewsItem 
              key={item.id}
              date={item.date}
              title={item.title}
              content={item.content}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsSection;
