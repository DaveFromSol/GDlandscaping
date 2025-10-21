import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

export const useFirebaseData = () => {
  const [dashboardData, setDashboardData] = useState({
    activeProjects: 12,
    weeklyRevenue: 8450,
    scheduledJobs: 28,
    clientSatisfaction: 4.8,
    recentActivities: [
      {
        id: 1,
        type: 'completed',
        title: 'Garden Installation - Smith Residence',
        time: 'Completed today at 3:30 PM'
      },
      {
        id: 2,
        type: 'scheduled',
        title: 'Equipment Maintenance',
        time: 'Scheduled for tomorrow at 8:00 AM'
      },
      {
        id: 3,
        type: 'new',
        title: 'New Quote Request - Johnson Property',
        time: 'Received 2 hours ago'
      }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // For now, we'll use static data
        // In the future, you can add real-time Firebase listeners here
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addActivity = async (activity) => {
    try {
      // Add to Firestore in the future
      setDashboardData(prev => ({
        ...prev,
        recentActivities: [activity, ...prev.recentActivities.slice(0, 2)]
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    dashboardData,
    loading,
    error,
    addActivity
  };
};