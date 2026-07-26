import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Sun,
  Moon,
  Bell,
  MessageSquare,
  ChevronDown,
  Briefcase,
  Megaphone,
  Sparkles
} from 'lucide-react';
import api from '../../services/api';

export default function Navbar() {
  const { user, logout, switchDemoRole } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user, location.pathname]);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      if (res.data.success) {
        setNotifications(res.data.notifications);
        setUnreadCount(res.data.notifications.filter(n => !n.read).length);
      }
    } catch (e) {}
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'brand') return '/brand/dashboard';
    if (user.role === 'influencer') return '/influencer/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    return '/';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-base shadow-xs">
                C
              </div>
              <span className="text-lg font-extrabold tracking-tight text-stone-900 dark:text-white">
                Creator<span className="text-orange-600">Cart</span>
              </span>
            </Link>

            <span className="hidden sm:inline-block text-[11px] font-semibold text-stone-500 bg-stone-100 dark:bg-stone-800 dark:text-stone-400 px-2.5 py-0.5 rounded-full">
              Beta v1.0 • GenZ Collab Demo
            </span>
          </div>

          {/* Role Switcher & Controls */}
          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => switchDemoRole('brand')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    user.role === 'brand' ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  <Briefcase size={12} /> Brand View
                </button>
                <button
                  onClick={() => switchDemoRole('influencer')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    user.role === 'influencer' ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  <Megaphone size={12} /> Creator View
                </button>
              </div>
            )}

            {/* Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <>
                <Link
                  to="/messages"
                  className="p-2 rounded-xl text-stone-500 hover:text-orange-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
                  title="Direct Messages"
                >
                  <MessageSquare size={18} />
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-orange-500"
                    />
                    <span className="text-xs font-bold text-stone-900 dark:text-white hidden md:inline">{user.name}</span>
                    <ChevronDown size={14} className="text-stone-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 p-1.5 z-50">
                      <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-800 mb-1">
                        <p className="font-bold text-xs text-stone-900 dark:text-white">{user.name}</p>
                        <p className="text-[11px] text-stone-400 capitalize">{user.role} Account</p>
                      </div>

                      <Link
                        to={getDashboardLink()}
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-3 py-2 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-3 py-2 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                      >
                        Edit Profile & Media Kit
                      </Link>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                          navigate('/login');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/login" className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs">
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
