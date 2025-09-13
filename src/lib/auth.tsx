import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';

interface AuthSession {
  userId: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  session: AuthSession | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedSession = localStorage.getItem('mind2care_session');
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock authentication - in real app, call API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const mockSession: AuthSession = {
        userId: '1',
        name: 'Alex Johnson',
        email,
        avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
      };
      
      setSession(mockSession);
      localStorage.setItem('mind2care_session', JSON.stringify(mockSession));
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSession: AuthSession = {
        userId: '1',
        name,
        email,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=E5BABF&color=5E616B`
      };
      
      setSession(mockSession);
      localStorage.setItem('mind2care_session', JSON.stringify(mockSession));
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setSession(null);
    localStorage.removeItem('mind2care_session');
  };

  return (
    <AuthContext.Provider value={{ session, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}