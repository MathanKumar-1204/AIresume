"use client"

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'recruiter' | 'applicant';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, role: 'recruiter' | 'applicant') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Implement actual authentication logic here
    setUser({
      id: '1',
      name: 'Test User',
      email,
      role: 'applicant'
    });
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (email: string, password: string, role: 'recruiter' | 'applicant') => {
    // Implement actual signup logic here
    setUser({
      id: '1',
      name: 'New User',
      email,
      role
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}