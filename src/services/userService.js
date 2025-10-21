import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db, auth } from '../firebase';

// Collection reference
const USERS_COLLECTION = 'users';

/**
 * User Service for Firebase operations
 */
export class UserService {
  
  /**
   * Add a new user to Firebase
   * @param {Object} userData - User data object
   * @returns {Promise<string>} - Document ID
   */
  static async addUser(userData) {
    try {
      // Create user in Firebase Auth if password is provided
      let authUser = null;
      if (userData.password && userData.email) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth, 
            userData.email, 
            userData.password
          );
          authUser = userCredential.user;
          
          // Update display name
          if (userData.name) {
            await updateProfile(authUser, {
              displayName: userData.name
            });
          }
        } catch (authError) {
          console.warn('Auth user creation failed, continuing with Firestore:', authError.message);
        }
      }

      // Add user to Firestore
      const userDoc = {
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'employee',
        permissions: userData.permissions || [],
        assignedJobs: userData.assignedJobs || [],
        status: 'active',
        authUid: authUser?.uid || null,
        createdAt: serverTimestamp(),
        lastLogin: null,
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, USERS_COLLECTION), userDoc);
      console.log('User added with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error(`Failed to add user: ${error.message}`);
    }
  }

  /**
   * Update an existing user
   * @param {string} userId - Document ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<void>}
   */
  static async updateUser(userId, updates) {
    try {
      const userRef = doc(db, USERS_COLLECTION, userId);
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(userRef, updateData);
      console.log('User updated:', userId);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  /**
   * Delete a user
   * @param {string} userId - Document ID
   * @returns {Promise<void>}
   */
  static async deleteUser(userId) {
    try {
      const userRef = doc(db, USERS_COLLECTION, userId);
      await deleteDoc(userRef);
      console.log('User deleted:', userId);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  /**
   * Get all users (one-time fetch)
   * @returns {Promise<Array>} - Array of user objects with IDs
   */
  static async getUsers() {
    try {
      const q = query(
        collection(db, USERS_COLLECTION), 
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamps to readable dates
          createdAt: doc.data().createdAt?.toDate()?.toISOString()?.split('T')[0] || 'Unknown',
          lastLogin: doc.data().lastLogin?.toDate()?.toISOString()?.split('T')[0] || 'Never'
        });
      });
      
      return users;
    } catch (error) {
      console.error('Error getting users:', error);
      throw new Error(`Failed to get users: ${error.message}`);
    }
  }

  /**
   * Subscribe to real-time user updates
   * @param {Function} callback - Callback function to handle updates
   * @returns {Function} - Unsubscribe function
   */
  static subscribeToUsers(callback) {
    try {
      const q = query(
        collection(db, USERS_COLLECTION), 
        orderBy('createdAt', 'desc')
      );
      
      return onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            ...doc.data(),
            // Convert Firestore timestamps to readable dates
            createdAt: doc.data().createdAt?.toDate()?.toISOString()?.split('T')[0] || 'Unknown',
            lastLogin: doc.data().lastLogin?.toDate()?.toISOString()?.split('T')[0] || 'Never'
          });
        });
        callback(users);
      }, (error) => {
        console.error('Error in user subscription:', error);
        callback([]);
      });
    } catch (error) {
      console.error('Error setting up user subscription:', error);
      return () => {}; // Return empty unsubscribe function
    }
  }

  /**
   * Update user's last login time
   * @param {string} userId - Document ID
   * @returns {Promise<void>}
   */
  static async updateLastLogin(userId) {
    try {
      const userRef = doc(db, USERS_COLLECTION, userId);
      await updateDoc(userRef, {
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating last login:', error);
      // Don't throw error for login time update
    }
  }

  /**
   * Toggle user status (active/inactive)
   * @param {string} userId - Document ID
   * @param {string} newStatus - New status
   * @returns {Promise<void>}
   */
  static async toggleUserStatus(userId, newStatus) {
    try {
      await this.updateUser(userId, { status: newStatus });
    } catch (error) {
      console.error('Error toggling user status:', error);
      throw error;
    }
  }

  /**
   * Assign jobs to a user
   * @param {string} userId - Document ID
   * @param {Array} jobIds - Array of job IDs
   * @returns {Promise<void>}
   */
  static async assignJobs(userId, jobIds) {
    try {
      await this.updateUser(userId, { assignedJobs: jobIds });
    } catch (error) {
      console.error('Error assigning jobs:', error);
      throw error;
    }
  }

  /**
   * Update user permissions
   * @param {string} userId - Document ID
   * @param {Array} permissions - Array of permission strings
   * @returns {Promise<void>}
   */
  static async updatePermissions(userId, permissions) {
    try {
      await this.updateUser(userId, { permissions });
    } catch (error) {
      console.error('Error updating permissions:', error);
      throw error;
    }
  }
}

export default UserService;