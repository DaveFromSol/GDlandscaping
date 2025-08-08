import React from 'react';
import FinancialSummary from './FinancialSummary';

const Dashboard = ({ dashboardData, jobs }) => {
  return (
    <div className="dashboard-content">
      {jobs && <FinancialSummary jobs={jobs} />}
      
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {dashboardData.recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className={`activity-status ${activity.type}`}>
                {activity.type === 'completed' && 'COMPLETED'}
                {activity.type === 'scheduled' && 'SCHEDULED'}
                {activity.type === 'new' && 'NEW REQUEST'}
              </div>
              <div className="activity-details">
                <h4>{activity.title}</h4>
                <p>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn primary">Schedule New Job</button>
          <button className="action-btn secondary">Add Client</button>
          <button className="action-btn secondary">Generate Quote</button>
          <button className="action-btn secondary">View Calendar</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;