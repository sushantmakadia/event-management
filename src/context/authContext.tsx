"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { LocalStorageService } from '../utils/localStorage';
import { AuthContextType, User } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const {getDecrypted,setEncrypted,remove} = LocalStorageService;

  useEffect(() => {
    // restore data
    const savedUser = getDecrypted('currentUser');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false); 
  }, []);

  const login = (username: string, password: string) => {
    const users = JSON.parse(getDecrypted('users') || '[]') as User[];
    const existingUser = users.find(u => u.username === username && u.password === password);
    if (existingUser) {
      setEncrypted('currentUser', JSON.stringify(existingUser));
      setUser(existingUser);
      return true;
    }
    return false;
  };

  const signup = (username: string, password: string) => {
    const users = JSON.parse(getDecrypted('users') || '[]') as User[];
    if (users.some(u => u.username === username)) return false;
    const newUser = { username, password };
    users.push(newUser);
    setEncrypted('users', JSON.stringify(users));
    setEncrypted('currentUser', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    remove('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};