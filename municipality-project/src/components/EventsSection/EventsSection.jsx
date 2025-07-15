import './EventsSection.css'
import EventItem from './EventItem'
import { useSelector } from 'react-redux'

const EventsSection = () => {
  const events = useSelector(state => state.events)
  
  return (
    <section className="events-section">
      <div className="container">
        <div className="section-title">
          <h2>Upcoming Events</h2>
        </div>
        <div className="events-list">
          {events.map(event => (
            <EventItem 
              key={event.id}
              date={event.date}
              title={event.title}
              // The description prop is no longer needed for the new design
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventsSection