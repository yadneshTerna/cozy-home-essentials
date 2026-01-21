import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // TODO: Replace with your backend API call
  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - replace with actual API call
    // Example: const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful login
    if (email && password) {
      setUser({
        id: '1',
        name: 'John Doe',
        email: email,
        phone: '+1 234 567 8900',
      });
      return true;
    }
    return false;
  };

  // TODO: Replace with your backend API call
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock signup - replace with actual API call
    // Example: const response = await fetch('/api/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful signup
    if (name && email && password) {
      setUser({
        id: '1',
        name: name,
        email: email,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    // TODO: Call your backend logout endpoint if needed
    // Example: await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    // TODO: Replace with your backend API call
    // Example: await fetch('/api/user/profile', { method: 'PUT', body: JSON.stringify(data) });
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
