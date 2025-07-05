
import { User, UserRole } from '@/lib/types/user-roles';
import { LoginActivity, PendingUser, UserWithPassword } from './types';
import { calculateExpiryDate } from './utils';

// Authentication Actions
export const authActions = (
  mockUsers: UserWithPassword[],
  pendingUsers: PendingUser[],
  loginActivities: LoginActivity[],
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setMockUsers: React.Dispatch<React.SetStateAction<UserWithPassword[]>>,
  setPendingUsers: React.Dispatch<React.SetStateAction<PendingUser[]>>,
  setLoginActivities: React.Dispatch<React.SetStateAction<LoginActivity[]>>
) => {
  // Common function to handle successful login
  const handleSuccessfulLogin = (foundUser: UserWithPassword) => {
    // Set activation date if not already set
    if (!foundUser.activationDate) {
      const today = new Date().toISOString().split('T')[0];
      foundUser.activationDate = today;
      foundUser.expiryDate = calculateExpiryDate(today);
      
      // Update the user in the mockUsers array
      const updatedUsers = mockUsers.map(u => 
        u.id === foundUser.id ? foundUser : u
      );
      setMockUsers(updatedUsers);
      localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
    }
    
    const { password, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    // Add new login activity
    const newActivity: LoginActivity = {
      id: Date.now().toString(),
      userId: foundUser.id,
      userName: foundUser.full_name || foundUser.email,
      timestamp: new Date(),
      userRole: foundUser.role
    };
    
    const updatedActivities = [newActivity, ...loginActivities.slice(0, 9)]; // Keep only last 10
    setLoginActivities(updatedActivities);
    localStorage.setItem('loginActivities', JSON.stringify(updatedActivities));
  };

  // Simulated login function
  const login = async (email: string, password: string): Promise<void> => {
    // Simulates an API request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          handleSuccessfulLogin(foundUser);
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  // Simulated phone login function
  const loginWithPhone = async (phoneNumber: string, password: string): Promise<void> => {
    // Simulates an API request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.phoneNumber === phoneNumber && u.password === password);
        
        if (foundUser) {
          handleSuccessfulLogin(foundUser);
          resolve();
        } else {
          reject(new Error('Invalid phone number or password'));
        }
      }, 500);
    });
  };

  // Simulated Google login function
  const loginWithGoogle = async (): Promise<void> => {
    // In a real app, this would redirect to Google OAuth
    // Here we simulate finding a user with a Google ID
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful Google authentication and receiving a Google ID
        const simulatedGoogleId = "google-user-123";
        const foundUser = mockUsers.find(u => u.googleId === simulatedGoogleId);
        
        if (foundUser) {
          handleSuccessfulLogin(foundUser);
          resolve();
        } else {
          reject(new Error('No user found associated with this Google account'));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check if user has a specific role
  const hasRole = (user: User | null, roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    
    return user.role === roles;
  };

  // Get filtered login activities based on user role
  const getFilteredLoginActivities = (user: User | null): LoginActivity[] => {
    if (!user) return [];

    // Admin and Fleet Manager can see all login activities
    if (user.role === UserRole.ADMIN || user.role === UserRole.DEV_ADMIN || user.role === UserRole.FLEET_MANAGER) {
      return loginActivities;
    }
    
    // Drivers can only see their own logins and other drivers' logins
    if (user.role === UserRole.DRIVER) {
      return loginActivities.filter(activity => 
        activity.userId === user.id || activity.userRole === UserRole.DRIVER
      );
    }
    
    // Mechanics can only see their own logins and other mechanics' logins
    if (user.role === UserRole.MECHANIC) {
      return loginActivities.filter(activity => 
        activity.userId === user.id || activity.userRole === UserRole.MECHANIC
      );
    }
    
    // Default: only see own logins
    return loginActivities.filter(activity => activity.userId === user.id);
  };

  return {
    login,
    loginWithPhone,
    loginWithGoogle,
    logout,
    hasRole,
    getFilteredLoginActivities
  };
};
