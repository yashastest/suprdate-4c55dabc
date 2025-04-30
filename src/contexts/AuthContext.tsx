
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types/user';
import { mockUsers } from '../data/mockData';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string) => Promise<void>;
  verifyOTP: (phoneNumber: string, otp: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (phoneNumber: string): Promise<void> => {
    try {
      setIsLoading(true);
      // Simulate sending OTP
      console.log(`Sending OTP to ${phoneNumber}`);
      
      // In a real app, you would call an API to send OTP
      // For now, we just simulate success after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${phoneNumber}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (phoneNumber: string, otp: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // In a real app, verify OTP with backend
      // For now, we accept any 6-digit OTP
      if (otp.length === 6) {
        // Find user with this phone number or create a new one
        let user = mockUsers.find(u => u.phoneNumber === phoneNumber);
        
        if (!user) {
          // Create a new user
          user = {
            id: Date.now().toString(),
            username: "",
            phoneNumber,
            gender: "Boy", // Default, will be set during onboarding
            photos: [],
            interests: [],
            verified: false,
            trustScore: 0
          };
        }
        
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (userData: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    verifyOTP,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
