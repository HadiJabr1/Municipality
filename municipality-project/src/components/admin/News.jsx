// src/components/admin/News.jsx
import React, { useState } from 'react';
import './News.css';

const News = () => {
  const [newsItems, setNewsItems] = useState([
    { id: 1, title: 'Local Park Expansion', date: '2024-03-15', visibility: 'Public' },
    { id: 2, title: 'Community Clean-Up Event', date: '2024-03-10', visibility: 'Public' },
    { id: 3, title: 'New Business Opening', date: '2024-03-05', visibility: 'Public' },
    { id: 4, title: 'City Council Meeting', date: '2024-02-28', visibility: 'Private' },
    { id: 5, title: 'Traffic Alert: Road Closure', date: '2024-02-20', visibility: 'Public' },
  ]);

  const [newNews, setNewNews] = useState({
    title: '',
    date: '',
    visibility: 'Public',
    image: null
  });

  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNews(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewNews(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleAddNews = (e) => {
    e.preventDefault();
    if (!newNews.title || !newNews.date) return;
    
    if (editingId) {
      setNewsItems(newsItems.map(item => 
        item.id === editingId ? { ...item, ...newNews } : item
      ));
      setEditingId(null);
    } else {
      const newItem = {
        id: Math.max(...newsItems.map(item => item.id)) + 1,
        ...newNews
      };
      setNewsItems([newItem, ...newsItems]);
    }
    
    setNewNews({
      title: '',
      date: '',
      visibility: 'Public',
      image: null
    });
  };

  const handleEdit = (id) => {
    const itemToEdit = newsItems.find(item => item.id === id);
    setNewNews({
      title: itemToEdit.title,
      date: itemToEdit.date,
      visibility: itemToEdit.visibility,
      image: null
    });
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setNewsItems(newsItems.filter(item => item.id !== id));
  };

  return (
    <div className="news-container">
      <h1>News</h1>
      
      <table className="news-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Visibility</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsItems.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>{item.visibility}</td>
              <td className="actions-cell">
                <button onClick={() => handleEdit(item.id)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-news-section">
        <h1>Add News</h1>
        <form onSubmit={handleAddNews}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newNews.title}
              onChange={handleInputChange}
              placeholder="Enter title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={newNews.date}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="visibility">Visibility</label>
            <select
              id="visibility"
              name="visibility"
              value={newNews.visibility}
              onChange={handleInputChange}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Upload Image</label>
            <div className="upload-area">
              <p>Drag and drop or browse to upload</p>
              <input
                type="file"
                id="image"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <label htmlFor="image" className="browse-btn">Browse</label>
            </div>
          </div>
          
          <button type="submit" className="save-btn">
            {editingId ? 'Update' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default News;