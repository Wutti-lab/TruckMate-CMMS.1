import { User } from '@/lib/types/user-roles';
import { PendingUser, UserWithPassword } from './types';
import { calculateExpiryDate } from './utils';

// User Management Actions
export const userActions = (
  mockUsers: UserWithPassword[],
  pendingUsers: PendingUser[],
  setMockUsers: React.Dispatch<React.SetStateAction<UserWithPassword[]>>,
  setPendingUsers: React.Dispatch<React.SetStateAction<PendingUser[]>>,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
) => {
  // Account management functions
  const createUser = (newUser: UserWithPassword) => {
    // Set activation date and expiry date for new users
    const today = new Date().toISOString().split('T')[0];
    const userWithDates = {
      ...newUser,
      activationDate: today,
      expiryDate: calculateExpiryDate(today)
    };
    
    const updatedUsers = [...mockUsers, userWithDates];
    setMockUsers(updatedUsers);
    localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
  };
  
  const createPendingUser = (newPendingUser: PendingUser) => {
    const updatedPendingUsers = [...pendingUsers, newPendingUser];
    setPendingUsers(updatedPendingUsers);
    localStorage.setItem('pendingUsers', JSON.stringify(updatedPendingUsers));
  };

  const updateUserList = (updatedUser: User & { password?: string }) => {
    const updatedUsers = mockUsers.map(user => {
      if (user.id === updatedUser.id) {
        // If a new password is provided, update it, otherwise keep the existing one
        if (updatedUser.password && updatedUser.password.trim() !== "") {
          return {
            ...user,
            ...updatedUser,
            password: updatedUser.password
          };
        } else {
          // Keep existing password if none provided
          return {
            ...user,
            ...updatedUser
          };
        }
      }
      return user;
    });
    
    setMockUsers(updatedUsers);
    localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
    
    // If the updated user is the currently logged in user, update the session too
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (currentUser && currentUser.id === updatedUser.id) {
      const { password, ...userWithoutPassword } = updatedUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    }
  };

  const deleteUser = (id: string) => {
    const updatedUsers = mockUsers.filter(user => user.id !== id);
    setMockUsers(updatedUsers);
    localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
  };
  
  const approvePendingUser = (id: string) => {
    const pendingUser = pendingUsers.find(pu => pu.id === id);
    
    if (pendingUser) {
      const today = new Date().toISOString().split('T')[0];
      
      // Add to regular users with activation date and expiry date
      const newUser: UserWithPassword = {
        id: pendingUser.id,
        name: pendingUser.name,
        email: pendingUser.email,
        role: pendingUser.role,
        password: pendingUser.password,
        activationDate: today,
        expiryDate: calculateExpiryDate(today)
      };
      
      const updatedUsers = [...mockUsers, newUser];
      setMockUsers(updatedUsers);
      localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
      
      // Remove from pending users
      const updatedPendingUsers = pendingUsers.filter(pu => pu.id !== id);
      setPendingUsers(updatedPendingUsers);
      localStorage.setItem('pendingUsers', JSON.stringify(updatedPendingUsers));
    }
  };
  
  const rejectPendingUser = (id: string) => {
    const updatedPendingUsers = pendingUsers.map(pu => 
      pu.id === id ? { ...pu, approvalStatus: 'rejected' as const } : pu
    );
    setPendingUsers(updatedPendingUsers);
    localStorage.setItem('pendingUsers', JSON.stringify(updatedPendingUsers));
  };
  
  const getPendingUsersCount = () => {
    return pendingUsers.filter(pu => pu.approvalStatus === 'pending').length;
  };

  return {
    createUser,
    createPendingUser,
    updateUserList,
    deleteUser,
    approvePendingUser,
    rejectPendingUser,
    getPendingUsersCount
  };
};
