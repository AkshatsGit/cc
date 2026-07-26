import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const DEMO_USERS = {
  brand: {
    id: 'user_brand_1',
    email: 'collabs@techpulse.com',
    name: 'TechPulse Gear',
    role: 'brand',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    verified: true
  },
  influencer: {
    id: 'user_influencer_1',
    email: 'alex.tech@creators.com',
    name: 'Alex Rivera',
    role: 'influencer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true
  },
  admin: {
    id: 'user_admin_1',
    email: 'admin@creatorcart.com',
    name: 'CreatorCart Admin',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('creatorcart_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.brand; // Default demo account for instant exploration
  });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('creatorcart_user', JSON.stringify(user));
      localStorage.setItem('creatorcart_token', user.id);
      fetchCurrentProfile(user);
    } else {
      localStorage.removeItem('creatorcart_user');
      localStorage.removeItem('creatorcart_token');
      setProfile(null);
    }
  }, [user]);

  const fetchCurrentProfile = async (currentUser) => {
    try {
      const res = await api.get('/auth/me');
      if (res.data.success) {
        setUser(res.data.user);
        setProfile(res.data.profile);
      }
    } catch (err) {
      console.warn('API sync fallback using local user session:', err.message);
    }
  };

  const login = async (email, password, role = 'influencer') => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, role });
      if (res.data.success) {
        setUser(res.data.user);
        setProfile(res.data.profile);
        toast.success(`Welcome back, ${res.data.user.name}!`);
        return res.data.user;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name, role) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, name, role });
      if (res.data.success) {
        setUser(res.data.user);
        setProfile(res.data.profile);
        toast.success(`Account created as ${role.toUpperCase()}!`);
        return res.data.user;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const switchDemoRole = (roleKey) => {
    const demoUser = DEMO_USERS[roleKey];
    if (demoUser) {
      setUser(demoUser);
      toast.success(`Switched to Demo ${roleKey.toUpperCase()} mode (${demoUser.name})`);
    }
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('creatorcart_user');
    localStorage.removeItem('creatorcart_token');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, signup, logout, switchDemoRole, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
