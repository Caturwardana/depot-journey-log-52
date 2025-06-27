
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  fullname: string;
  role: 'driver' | 'supervisor' | 'fuelman' | 'glpama' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Mock authentication - in real app, this would call your API
    const mockUsers = [
      { id: '1', username: 'driver1', password: 'pass123', fullname: 'John Driver', role: 'driver' as const },
      { id: '2', username: 'supervisor1', password: 'pass123', fullname: 'Jane Supervisor', role: 'supervisor' as const },
      { id: '3', username: 'fuelman1', password: 'pass123', fullname: 'Mike Fuelman', role: 'fuelman' as const },
      { id: '4', username: 'glpama1', password: 'pass123', fullname: 'Sarah PAMA', role: 'glpama' as const },
      { id: '5', username: 'admin1', password: 'pass123', fullname: 'Admin User', role: 'admin' as const },
    ];

    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('userRole', userWithoutPassword.role);
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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
