import React, { useState } from 'react';
import './Complaints.css';

const initialComplaints = [
  { id: '#12345', name: 'Sarah Johnson', date: '2024-01-15', status: 'Pending' },
  { id: '#67890', name: 'Michael Brown', date: '2024-02-20', status: 'In Progress' },
  { id: '#11223', name: 'Emily Davis', date: '2024-03-10', status: 'Resolved' },
  { id: '#44556', name: 'David Wilson', date: '2024-04-05', status: 'Pending' },
  { id: '#77889', name: 'Jessica Lee', date: '2024-05-12', status: 'In Progress' }
];

const Complaints = () => {
  const [showModal, setShowModal] = useState(false);
  const [issueInput, setIssueInput] = useState('');
  const [issues, setIssues] = useState([
    'Potholes / Damaged Roads',
    'Potholes / Damaged Roads',
    'Potholes / Damaged Roads',
    'Potholes / Damaged Roads',
    'Potholes / Damaged Roads'
  ]);

  const handleAddIssue = () => {
    if (issueInput.trim()) {
      setIssues([...issues, issueInput.trim()]);
      setIssueInput('');
    }
  };

  const handleDeleteIssue = (index) => {
    const updated = [...issues];
    updated.splice(index, 1);
    setIssues(updated);
  };

  return (
    <div className="complaints-container">
      <div className="complaints-header">
        <h1>Complaints</h1>
        <button onClick={() => setShowModal(true)} className="add-issue-btn">
          Add Issue Type
        </button>
      </div>

      <table className="complaints-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {initialComplaints.map((complaint, index) => (
            <tr key={index}>
              <td>{complaint.id}</td>
              <td className="name-link">{complaint.name}</td>
              <td>{complaint.date}</td>
              <td>
                <span className={`status-badge ${complaint.status.replace(' ', '').toLowerCase()}`}>
                  {complaint.status}
                </span>
              </td>
              <td className="view-link">View</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Issue Type</h2>
            <div className="input-row">
              <input
                type="text"
                value={issueInput}
                placeholder="Please add Issue Type"
                onChange={(e) => setIssueInput(e.target.value)}
              />
              <button onClick={handleAddIssue}>Add</button>
            </div>

            <div className="issues-list">
              {issues.map((issue, i) => (
                <div key={i} className="issue-row">
                  <input type="text" value={issue} readOnly />
                  <button onClick={() => handleDeleteIssue(i)} className="delete-btn">🗑</button>
                </div>
              ))}
            </div>

            <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;
