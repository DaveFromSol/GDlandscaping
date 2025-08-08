import React from 'react';
import PropTypes from 'prop-types';
import FinancialSummary from './FinancialSummary';
import LoadingSpinner from './LoadingSpinner';

const Dashboard = ({ dashboardData, jobs }) => {
  if (!dashboardData) {
    return <LoadingSpinner message="Loading dashboard data..." />;
  }

  return (
    <div className="dashboard-content">
      {jobs && <FinancialSummary jobs={jobs} />}
      
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {dashboardData.recentActivities?.length > 0 ? (
            dashboardData.recentActivities.map((activity) => (
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
            ))
          ) : (
            <div className="no-activities">No recent activities</div>
          )}
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

Dashboard.propTypes = {
  dashboardData: PropTypes.shape({
    activeProjects: PropTypes.number,
    weeklyRevenue: PropTypes.number,
    scheduledJobs: PropTypes.number,
    clientSatisfaction: PropTypes.number,
    recentActivities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired
      })
    )
  }),
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      status: PropTypes.string,
      revenue: PropTypes.number,
      materialCosts: PropTypes.number,
      laborAssignments: PropTypes.array
    })
  )
};

export default Dashboard;