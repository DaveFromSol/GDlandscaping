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
import { db } from '../firebase';

const EMPLOYEES_COLLECTION = 'employees';

export class EmployeeService {
  
  static async addEmployee(employeeData) {
    try {
      const employee = {
        name: employeeData.name || '',
        hourlyRate: employeeData.hourlyRate || 0,
        role: employeeData.role || 'employee',
        status: 'active',
        skills: employeeData.skills || [],
        phoneNumber: employeeData.phoneNumber || '',
        email: employeeData.email || '',
        hireDate: employeeData.hireDate || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, EMPLOYEES_COLLECTION), employee);
      return docRef.id;
    } catch (error) {
      console.error('Error adding employee:', error);
      throw new Error(`Failed to add employee: ${error.message}`);
    }
  }

  static async updateEmployee(employeeId, updates) {
    try {
      const employeeRef = doc(db, EMPLOYEES_COLLECTION, employeeId);
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(employeeRef, updateData);
    } catch (error) {
      console.error('Error updating employee:', error);
      throw new Error(`Failed to update employee: ${error.message}`);
    }
  }

  static async deleteEmployee(employeeId) {
    try {
      const employeeRef = doc(db, EMPLOYEES_COLLECTION, employeeId);
      await deleteDoc(employeeRef);
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw new Error(`Failed to delete employee: ${error.message}`);
    }
  }

  static async getEmployees() {
    try {
      const q = query(
        collection(db, EMPLOYEES_COLLECTION), 
        orderBy('name', 'asc')
      );
      const querySnapshot = await getDocs(q);
      
      const employees = [];
      querySnapshot.forEach((doc) => {
        employees.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()?.toLocaleDateString() || 'Unknown'
        });
      });
      
      return employees;
    } catch (error) {
      console.error('Error getting employees:', error);
      throw new Error(`Failed to get employees: ${error.message}`);
    }
  }

  static subscribeToEmployees(callback) {
    try {
      const q = query(
        collection(db, EMPLOYEES_COLLECTION), 
        orderBy('name', 'asc')
      );
      
      return onSnapshot(q, (querySnapshot) => {
        const employees = [];
        querySnapshot.forEach((doc) => {
          employees.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()?.toLocaleDateString() || 'Unknown'
          });
        });
        callback(employees);
      }, (error) => {
        console.error('Error in employee subscription:', error);
        callback([]);
      });
    } catch (error) {
      console.error('Error setting up employee subscription:', error);
      return () => {};
    }
  }

  static async updateEmployeeStatus(employeeId, newStatus) {
    try {
      await this.updateEmployee(employeeId, { status: newStatus });
    } catch (error) {
      console.error('Error updating employee status:', error);
      throw error;
    }
  }

  // Seed initial employees (for development/testing)
  static async seedInitialEmployees() {
    try {
      const existingEmployees = await this.getEmployees();
      if (existingEmployees.length > 0) {
        console.log('Employees already exist, skipping seed');
        return;
      }

      const initialEmployees = [
        {
          name: 'Mike Rodriguez',
          hourlyRate: 25,
          role: 'manager',
          skills: ['landscaping', 'project-management', 'equipment-operation'],
          phoneNumber: '(555) 123-4567',
          email: 'mike@gdlandscaping.com'
        },
        {
          name: 'Sarah Johnson',
          hourlyRate: 22,
          role: 'senior-employee',
          skills: ['landscaping', 'irrigation', 'tree-care'],
          phoneNumber: '(555) 234-5678',
          email: 'sarah@gdlandscaping.com'
        },
        {
          name: 'Tom Wilson',
          hourlyRate: 20,
          role: 'employee',
          skills: ['lawn-maintenance', 'hardscaping'],
          phoneNumber: '(555) 345-6789',
          email: 'tom@gdlandscaping.com'
        },
        {
          name: 'Lisa Chen',
          hourlyRate: 28,
          role: 'specialist',
          skills: ['garden-design', 'plant-care', 'irrigation'],
          phoneNumber: '(555) 456-7890',
          email: 'lisa@gdlandscaping.com'
        }
      ];

      for (const employee of initialEmployees) {
        await this.addEmployee(employee);
      }
      
      console.log('Initial employees seeded successfully');
    } catch (error) {
      console.error('Error seeding employees:', error);
    }
  }
}

export default EmployeeService;