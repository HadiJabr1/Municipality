// src/components/admin/DashboardMain.jsx
import React from 'react';
import './DashboardMain.css';

const stats = [
  { label: 'Total News Articles', value: 125 },
  { label: 'Upcoming Events', value: 32 },
  { label: 'Services Offered', value: 58 },
  { label: 'Complaints Received', value: 15 },
];

const recentActivity = [
  { title: 'Pothole on Main Street', id: '2024-001' },
  { title: 'Noise complaint near park', id: '2024-002' },
  { title: 'Streetlight malfunction', id: '2024-003' },
  { title: 'Graffiti on building', id: '2024-004' },
  { title: 'Illegal dumping', id: '2024-005' },
  { title: 'New Park Opens', id: 'Published: July 26, 2024' },
  { title: 'Road Closure on Elm Street', id: 'Published: July 20, 2024' },
  { title: 'Community Clean-Up Event', id: 'Published: July 15, 2024' },
  { title: 'Summer Concert Series Announced', id: 'Published: July 10, 2024' },
  { title: 'Water Conservation Tips', id: 'Published: July 5, 2024' },
];

const DashboardMain = () => {
  return (
    <div className="dashboard-main">
      <h1 className="dashboard-title">Dashboard</h1>
      <h3 className="overview-title">Overview</h3>
      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <span>{item.label}</span>
            <h2>{item.value}</h2>
          </div>
        ))}
      </div>

      <h3 className="recent-title">Recent Activity</h3>
      <div className="activity-list">
        {recentActivity.map((item, i) => (
          <div className="activity-card" key={i}>
            <span className="activity-icon">📄</span>
            <div className="activity-text">
              <strong>{item.title}</strong>
              <p>{item.id.includes('2024-') ? `Complaint ID: ${item.id}` : item.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardMain;
