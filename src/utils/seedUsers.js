import UserService from '../services/userService';

/**
 * Seed initial users into Firebase
 * This should only be run once during initial setup
 */
export const seedInitialUsers = async () => {
  console.log('Seeding initial users...');
  
  const initialUsers = [
    {
      name: 'Admin User',
      email: 'admin@gdlandscaping.com',
      password: 'admin123',
      role: 'admin',
      permissions: ['all'],
      assignedJobs: []
    },
    {
      name: 'Mike Rodriguez',
      email: 'manager@gdlandscaping.com',
      password: 'manager123',
      role: 'manager',
      permissions: ['dashboard', 'schedule', 'clients', 'equipment', 'reports'],
      assignedJobs: [1, 2]
    },
    {
      name: 'Sarah Johnson',
      email: 'employee@gdlandscaping.com',
      password: 'employee123',
      role: 'employee',
      permissions: ['schedule', 'equipment'],
      assignedJobs: [1, 3]
    }
  ];

  try {
    for (const user of initialUsers) {
      await UserService.addUser(user);
      console.log(`Added user: ${user.name}`);
    }
    console.log('✅ All initial users seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  }
};

// Check if users exist and seed if needed
export const checkAndSeedUsers = async () => {
  try {
    const existingUsers = await UserService.getUsers();
    
    if (existingUsers.length === 0) {
      console.log('No users found. Seeding initial users...');
      await seedInitialUsers();
    } else {
      console.log(`Found ${existingUsers.length} existing users. Skipping seed.`);
    }
  } catch (error) {
    console.error('Error checking existing users:', error);
  }
};

export default { seedInitialUsers, checkAndSeedUsers };