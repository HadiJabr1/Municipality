import React, { useState } from 'react';
import { Plus, Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import './PublicComplaints.css';

// Import images
import image47 from '../../assets/images/image47.png';
import image48 from '../../assets/images/image48.png';
import image49 from '../../assets/images/image49.png';
import image50 from '../../assets/images/image50.png';
import image51 from '../../assets/images/image51.png';

// Mock Data for complaints with updated image paths
const initialComplaints = [
  {
    id: 1,
    category: 'Road Maintenance',
    title: 'Pothole on Elm Street',
    description: 'Large pothole causing traffic hazard. Requesting immediate repair.',
    status: 'In Progress',
    image: image47,  // Use imported image
  },
  {
    id: 2,
    category: 'Public Safety',
    title: 'Streetlight Outage',
    description: 'Streetlight malfunction at the intersection of Oak and Maple. Reduced visibility at night.',
    status: 'Completed',
    image: image48,  // Use imported image
  },
  {
    id: 3,
    category: 'Sanitation',
    title: 'Illegal Dumping',
    description: 'Large amount of trash dumped near the community park. Requires cleanup.',
    status: 'New',
    image: image49,  // Use imported image
  },
  {
    id: 4,
    category: 'Road Maintenance',
    title: 'Cracked Sidewalk',
    description: 'Sidewalk near the library is cracked and uneven, posing a tripping hazard.',
    status: 'New',
    image: image50,  // Use imported image
  },
  {
    id: 5,
    category: 'Public Safety',
    title: 'Graffiti on Building',
    description: 'Graffiti vandalism on the side of the community center. Needs removal.',
    status: 'In Progress',
    image: image51,  // Use imported image
  },
];

// Main App Component
export default function App() {
  const [page, setPage] = useState('complaintsList'); // 'complaintsList' or 'addComplaint'
  const [complaints, setComplaints] = useState(initialComplaints);

  const handleAddComplaint = (newComplaint) => {
    setComplaints([ { ...newComplaint, id: complaints.length + 1, status: 'New' }, ...complaints]);
    setPage('complaintsList');
  };

  return (
    <div className="app-container">
      <div className="main-content">
        {page === 'complaintsList' ? (
          <ComplaintsListPage setPage={setPage} complaints={complaints} />
        ) : (
          <AddComplaintPage setPage={setPage} onAddComplaint={handleAddComplaint} />
        )}
      </div>
    </div>
  );
}

// Complaints List Page Component
const ComplaintsListPage = ({ setPage, complaints }) => {
  return (
    <div>
      <Header title="Public Complaints">
        <button
          onClick={() => setPage('addComplaint')}
          className="button primary-button add-complaint-button"
        >
          <Plus size={20} className="icon" />
          Add Complaint
        </button>
      </Header>
      <Filters />
      <ComplaintList complaints={complaints} />
      <Pagination />
    </div>
  );
};

// Add Complaint Page Component
const AddComplaintPage = ({ setPage, onAddComplaint }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || !category || !description) {
            console.error("Please fill all fields");
            return;
        }
        onAddComplaint({ title, category, description, image: imagePreview || 'https://placehold.co/600x400/cccccc/000000?text=No+Image' });
    };
    
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

  return (
    <div>
      <Header title="Report an Issue" />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-layout">
            {/* Form Fields */}
            <div className="form-section">
              <h3 className="form-section-title">Complaint Details</h3>
              <div className="form-fields">
                <div>
                  <label htmlFor="issue-title" className="form-label">Issue Title</label>
                  <input type="text" id="issue-title" value={title} onChange={e => setTitle(e.target.value)} className="form-input" placeholder="e.g., Large Pothole on Main St" />
                </div>
                <div>
                  <label htmlFor="issue-category" className="form-label">Category</label>
                  <select id="issue-category" value={category} onChange={e => setCategory(e.target.value)} className="form-input">
                    <option value="">Select a category</option>
                    <option value="Road Maintenance">Road Maintenance</option>
                    <option value="Public Safety">Public Safety</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Parks & Rec">Parks & Rec</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea id="description" rows="4" value={description} onChange={e => setDescription(e.target.value)} className="form-textarea" placeholder="Provide a detailed description of the issue..."></textarea>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-section">
              <h3 className="form-section-title">Upload Photo</h3>
              <div className="image-upload-box">
                {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="image-preview"/>
                ) : (
                    <div className="image-upload-placeholder">
                        <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <p className="upload-text">Drag & drop or click to upload</p>
                    </div>
                )}
                <input type="file" id="image-upload" className="sr-only" onChange={handleImageChange} accept="image/*" />
                <label htmlFor="image-upload" className="button select-image-button">
                  Select Image
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => setPage('complaintsList')}
              className="button secondary-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button primary-button"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ title, children }) => {
  return (
    <div className="header">
      <h1 className="header-title">{title}</h1>
      {children}
    </div>
  );
};

// Filters Component
const Filters = () => {
  return (
    <div className="filters-container">
      <div className="search-bar-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search"
          className="search-input"
        />
      </div>
      <div className="filter-buttons">
        <FilterDropdown label="Issue Type" />
        <FilterDropdown label="Status" />
        <FilterDropdown label="Date" />
      </div>
    </div>
  );
};

// Filter Dropdown Component
const FilterDropdown = ({ label }) => {
  return (
    <button className="filter-dropdown">
      {label}
      <ChevronDown size={16} className="icon" />
    </button>
  );
};

// Complaint List Component
const ComplaintList = ({ complaints }) => {
  return (
    <div className="complaint-list">
      {complaints.map((complaint) => (
        <ComplaintCard key={complaint.id} {...complaint} />
      ))}
    </div>
  );
};

// Complaint Card Component
const ComplaintCard = ({ category, title, description, status, image }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'In Progress':
        return 'status-in-progress';
      case 'Completed':
        return 'status-completed';
      default:
        return 'status-new';
    }
  };

  return (
    <div className="complaint-card">
      <div className="card-content">
        <p className="card-category">{category}</p>
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <div className="card-actions">
          <button className="button view-details-button">
            View Details
          </button>
          <span className={`status-badge ${getStatusClass()}`}>
            {status}
          </span>
        </div>
      </div>
      <div className="card-image-wrapper">
        <img
          src={image}
          alt={title}
          className="card-image"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/cccccc/000000?text=Image+Not+Found'; }}
        />
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = () => {
  return (
    <div className="pagination">
      <button className="pagination-button">
        <ChevronLeft size={20} />
      </button>
      <button className="pagination-button active">1</button>
      <button className="pagination-button">2</button>
      <button className="pagination-button">3</button>
      <button className="pagination-button">4</button>
      <button className="pagination-button">5</button>
      <button className="pagination-button">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
