import './EventItem.css'

const EventItem = ({ date, title }) => {
  return (
    <div className="event-item">
      <div className="event-info">
        <h3 className="event-title">{title}</h3>
        <div className="event-date">{date}</div>
      </div>
      <a href="#" className="event-link">View Details</a>
    </div>
  )
}

export default EventItem