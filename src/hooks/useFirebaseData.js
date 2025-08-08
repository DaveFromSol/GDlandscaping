import { useState, useEffect } from 'react';
import DashboardService from '../services/dashboardService';

export const useFirebaseData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const stats = await DashboardService.getDashboardStats();
        setDashboardData(stats);
        setLoading(false);
      } catch (err) {
        console.error('Error loading initial dashboard data:', err);
        setError(err.message);
        // Set fallback data
        setDashboardData(DashboardService.getFallbackStats());
        setLoading(false);
      }
    };

    // Load initial data
    loadInitialData();

    // Set up real-time subscription
    const unsubscribe = DashboardService.subscribeToDashboardData((newData) => {
      setDashboardData(newData);
      setError(null);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const addActivity = async (activity) => {
    try {
      await DashboardService.addActivity(activity);
      // Data will be updated via the real-time subscription
    } catch (err) {
      console.error('Error adding activity:', err);
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