import { 
  collection, 
  addDoc, 
  getDocs, 
  doc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Collection reference
const CONTACTS_COLLECTION = 'contact_inquiries';

/**
 * Contact Service for Firebase operations
 */
export class ContactService {
  
  /**
   * Submit a contact form inquiry
   * @param {Object} contactData - Contact form data
   * @returns {Promise<string>} - Document ID
   */
  static async submitInquiry(contactData) {
    try {
      const inquiry = {
        name: contactData.name || '',
        email: contactData.email || '',
        phone: contactData.phone || '',
        service: contactData.service || '',
        message: contactData.message || '',
        status: 'new',
        createdAt: serverTimestamp(),
        followedUp: false
      };

      const docRef = await addDoc(collection(db, CONTACTS_COLLECTION), inquiry);
      console.log('Contact inquiry submitted with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error submitting contact inquiry:', error);
      throw new Error(`Failed to submit inquiry: ${error.message}`);
    }
  }

  /**
   * Get all contact inquiries (for admin dashboard)
   * @returns {Promise<Array>} - Array of contact inquiries
   */
  static async getInquiries() {
    try {
      const q = query(
        collection(db, CONTACTS_COLLECTION), 
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const inquiries = [];
      querySnapshot.forEach((doc) => {
        inquiries.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()?.toLocaleDateString() || 'Unknown'
        });
      });
      
      return inquiries;
    } catch (error) {
      console.error('Error getting contact inquiries:', error);
      throw new Error(`Failed to get inquiries: ${error.message}`);
    }
  }

  /**
   * Update inquiry status
   * @param {string} inquiryId - Document ID
   * @param {string} status - New status
   * @returns {Promise<void>}
   */
  static async updateInquiryStatus(inquiryId, status) {
    try {
      const inquiryRef = doc(db, CONTACTS_COLLECTION, inquiryId);
      await updateDoc(inquiryRef, {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating inquiry status:', error);
      throw error;
    }
  }
}

export default ContactService;