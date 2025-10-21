import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  onSnapshot,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { COLLECTIONS, DEFAULTS, ACTIVITY_TYPES } from '../utils/constants';

export class DashboardService {
  
  static async getDashboardStats() {
    try {
      const [projects, jobs, activities] = await Promise.all([
        this.getActiveProjects(),
        this.getJobs(),
        this.getRecentActivities()
      ]);

      const completedJobs = jobs.filter(job => job.status === 'completed');
      const scheduledJobs = jobs.filter(job => job.status === 'scheduled').length;
      
      const weeklyRevenue = completedJobs
        .filter(job => this.isThisWeek(job.completedDate))
        .reduce((sum, job) => sum + (job.revenue || 0), 0);

      return {
        activeProjects: projects.length,
        weeklyRevenue,
        scheduledJobs,
        clientSatisfaction: DEFAULTS.CLIENT_SATISFACTION,
        recentActivities: activities
      };
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      // Return fallback data
      return this.getFallbackStats();
    }
  }

  static async getActiveProjects() {
    try {
      const q = query(
        collection(db, COLLECTIONS.PROJECTS),
        where('status', 'in', ['active', 'in-progress']),
        orderBy('updatedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const projects = [];
      
      querySnapshot.forEach((doc) => {
        projects.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return projects;
    } catch (error) {
      console.error('Error getting active projects:', error);
      return [];
    }
  }

  static async getJobs() {
    try {
      const q = query(
        collection(db, COLLECTIONS.JOBS),
        orderBy('scheduledDate', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const jobs = [];
      
      querySnapshot.forEach((doc) => {
        jobs.push({
          id: doc.id,
          ...doc.data(),
          scheduledDate: doc.data().scheduledDate?.toDate(),
          completedDate: doc.data().completedDate?.toDate()
        });
      });
      
      return jobs;
    } catch (error) {
      console.error('Error getting jobs:', error);
      return [];
    }
  }

  static async getRecentActivities() {
    try {
      const q = query(
        collection(db, COLLECTIONS.ACTIVITIES),
        orderBy('createdAt', 'desc'),
        limit(DEFAULTS.ACTIVITIES_LIMIT)
      );
      
      const querySnapshot = await getDocs(q);
      const activities = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        activities.push({
          id: doc.id,
          ...data,
          time: this.formatActivityTime(data.createdAt?.toDate())
        });
      });
      
      return activities;
    } catch (error) {
      console.error('Error getting recent activities:', error);
      return this.getFallbackActivities();
    }
  }

  static async addActivity(activityData) {
    try {
      const activity = {
        type: activityData.type || ACTIVITY_TYPES.INFO,
        title: activityData.title || '',
        description: activityData.description || '',
        userId: activityData.userId || null,
        relatedId: activityData.relatedId || null,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, COLLECTIONS.ACTIVITIES), activity);
      return docRef.id;
    } catch (error) {
      console.error('Error adding activity:', error);
      throw new Error(`Failed to add activity: ${error.message}`);
    }
  }

  static subscribeToDashboardData(callback) {
    try {
      // Subscribe to recent activities
      const activitiesQuery = query(
        collection(db, COLLECTIONS.ACTIVITIES),
        orderBy('createdAt', 'desc'),
        limit(5)
      );

      return onSnapshot(activitiesQuery, async (snapshot) => {
        try {
          const activities = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            activities.push({
              id: doc.id,
              ...data,
              time: this.formatActivityTime(data.createdAt?.toDate())
            });
          });

          // Get other dashboard stats
          const stats = await this.getDashboardStats();
          
          callback({
            ...stats,
            recentActivities: activities
          });
        } catch (error) {
          console.error('Error in dashboard subscription callback:', error);
          callback(this.getFallbackStats());
        }
      }, (error) => {
        console.error('Error in dashboard subscription:', error);
        callback(this.getFallbackStats());
      });
    } catch (error) {
      console.error('Error setting up dashboard subscription:', error);
      return () => {};
    }
  }

  // Utility methods
  static isThisWeek(date) {
    if (!date) return false;
    
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);
    
    return date >= startOfWeek;
  }

  static formatActivityTime(date) {
    if (!date) return 'Unknown time';
    
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  }

  static getFallbackStats() {
    return {
      activeProjects: 12,
      weeklyRevenue: 8450,
      scheduledJobs: 28,
      clientSatisfaction: DEFAULTS.CLIENT_SATISFACTION,
      recentActivities: this.getFallbackActivities()
    };
  }

  static getFallbackActivities() {
    return [
      {
        id: 'fallback-1',
        type: 'completed',
        title: 'Garden Installation - Smith Residence',
        time: 'Completed today at 3:30 PM'
      },
      {
        id: 'fallback-2',
        type: 'scheduled',
        title: 'Equipment Maintenance',
        time: 'Scheduled for tomorrow at 8:00 AM'
      },
      {
        id: 'fallback-3',
        type: 'new',
        title: 'New Quote Request - Johnson Property',
        time: 'Received 2 hours ago'
      }
    ];
  }
}

export default DashboardService;