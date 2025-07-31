// src/components/admin/Events.jsx
import React, { useState } from 'react';
import './Events.css';

const AdminEvents = () => {
  const initialEvents = [
    { id: 1, title: 'Community Cleanup', date: '2024-07-15', location: 'Central Park', description: 'Help clean our community parks and streets' },
    { id: 2, title: 'Summer Concert Series', date: '2024-08-05', location: 'Amphitheater', description: 'Enjoy live music every Friday night' },
    { id: 3, title: 'Farmers Market', date: '2024-09-01', location: 'Town Square', description: 'Fresh local produce every Saturday morning' },
    { id: 4, title: 'Holiday Parade', date: '2024-12-24', location: 'Main Street', description: 'Annual holiday parade with floats and music' },
    { id: 5, title: 'Youth Sports Camp', date: '2024-06-20', location: 'Recreation Center', description: 'Summer sports camp for children ages 8-12' }
  ];

  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState(initialEvents);
  const [currentEvent, setCurrentEvent] = useState({
    id: null,
    title: '',
    date: '',
    description: '',
    location: '',
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCurrentEvent((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === currentEvent.id ? currentEvent : event
      ));
    } else {
      // Add new event
      const newEvent = {
        ...currentEvent,
        id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1
      };
      setEvents([...events, newEvent]);
    }
    
    // Reset form
    setCurrentEvent({
      id: null,
      title: '',
      date: '',
      description: '',
      location: '',
      image: null,
    });
    setShowForm(false);
    setIsEditing(false);
  };

  const handleEdit = (event) => {
    setCurrentEvent({...event});
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  return (
    <div className="admin-events-container">
      <div className="events-header">
        <div>
          <h2>Events Management</h2>
          <p>Manage and create events for the city of Springfield</p>
        </div>
        <button className="add-event-btn" onClick={() => {
          setCurrentEvent({
            id: null,
            title: '',
            date: '',
            description: '',
            location: '',
            image: null,
          });
          setIsEditing(false);
          setShowForm(true);
        }}>
          Add Event
        </button>
      </div>

      <div className="events-table">
        <h3>Existing Events</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td className="actions-cell">
                  <button className="edit-btn" onClick={() => handleEdit(event)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="event-form-modal">
          <div className="event-form-box">
            <h3>{isEditing ? 'Edit Event' : 'Add new Event'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={currentEvent.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date and time</label>
                  <input
                    type="date"
                    name="date"
                    value={currentEvent.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={currentEvent.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Event Location"
                  value={currentEvent.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Upload Image</label>
                <div className="image-upload-box">
                  <div className="upload-area">
                    <p>Drag and drop or browse to upload</p>
                    <input 
                      type="file" 
                      id="fileInput" 
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="fileInput" className="browse-btn">Browse</label>
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Close</button>
                <button type="submit" className="submit-btn">
                  {isEditing ? 'Update Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;