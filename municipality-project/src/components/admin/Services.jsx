// src/components/admin/Services.jsx
import React, { useState } from 'react';
import './Services.css';

const Services = () => {
  const initialServices = [
    { id: 1, name: 'Park Maintenance', category: 'Parks and Recreation', status: 'Active' },
    { id: 2, name: 'Street Cleaning', category: 'Public Works', status: 'Active' },
    { id: 3, name: 'Library Programs', category: 'Community Services', status: 'Inactive' },
    { id: 4, name: 'Senior Services', category: 'Community Services', status: 'Active' },
    { id: 5, name: 'Youth Programs', category: 'Community Services', status: 'Active' },
  ];

  const [services, setServices] = useState(initialServices);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    status: 'Active'
  });
  const [editingId, setEditingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing service
      setServices(services.map(s => 
        s.id === editingId ? { ...s, ...formData } : s
      ));
    } else {
      // Add new service
      const newService = {
        id: services.length + 1,
        ...formData
      };
      setServices([...services, newService]);
    }
    
    // Reset form and close sidebar
    setFormData({ name: '', description: '', category: '', status: 'Active' });
    setEditingId(null);
    setSidebarOpen(false);
  };

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      description: service.description || '',
      category: service.category,
      status: service.status
    });
    setEditingId(service.id);
    setSidebarOpen(true);
  };

  const handleDelete = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const openAddSidebar = () => {
    setFormData({ name: '', description: '', category: '', status: 'Active' });
    setEditingId(null);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setEditingId(null);
  };

  return (
    <div className="services-admin">
      <div className="services-header">
        <h1>Manage Services</h1>
        <button className="add-service-btn" onClick={openAddSidebar}>
          Add New Service
        </button>
      </div>
      
      <div className="services-table-container">
        <table className="services-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.category}</td>
                <td>
                  <span className={`status-badge ${service.status.toLowerCase()}`}>
                    {service.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(service)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(service.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sidebar for adding/editing services */}
      <div className={`service-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>{editingId ? 'Edit Service' : 'Add New Service'}</h2>
          <button className="close-btn" onClick={closeSidebar}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="service-form">
          <div className="form-group">
            <label>Service Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter service name"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter service description"
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="Parks and Recreation">Parks and Recreation</option>
              <option value="Public Works">Public Works</option>
              <option value="Community Services">Community Services</option>
              <option value="Public Safety">Public Safety</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Status</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === 'Active'}
                  onChange={handleChange}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === 'Inactive'}
                  onChange={handleChange}
                />
                Inactive
              </label>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-btn">
              {editingId ? 'Update Service' : 'Save Service'}
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={closeSidebar}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      
      {/* Overlay when sidebar is open */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </div>
  );
};

export default Services;