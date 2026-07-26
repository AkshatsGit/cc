import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Sparkles,
  Sun,
  Moon,
  Bell,
  MessageSquare,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  ShieldAlert,
  Briefcase,
  Megaphone
} from 'lucide-react';
import api from '../../services/api';

export default function Navbar() {
  const { user, logout, switchDemoRole } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    } catch (e) {
      // Ignore background notification fetch error
    }
  };

  const handleMarkNotificationsRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (e) {
      // Ignore
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'brand') return '/brand/dashboard';
    if (user.role === 'influencer') return '/influencer/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    return '/';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <Sparkles size={20} />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Creator<span className="text-[#6C63FF]">Cart</span>
              </span>
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link to="/campaigns" className="hover:text-[#6C63FF] transition-colors">Explore Campaigns</Link>
              <Link to="/features" className="hover:text-[#6C63FF] transition-colors">Features</Link>
              <Link to="/pricing" className="hover:text-[#6C63FF] transition-colors">Pricing</Link>
              <Link to="/about" className="hover:text-[#6C63FF] transition-colors">About Us</Link>
            </nav>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Demo Role Switcher Quick Pill */}
            {user && (
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => switchDemoRole('brand')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${user.role === 'brand' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  <Briefcase size={12} className="inline mr-1" /> Brand
                </button>
                <button
                  onClick={() => switchDemoRole('influencer')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${user.role === 'influencer' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  <Megaphone size={12} className="inline mr-1" /> Creator
                </button>
                <button
                  onClick={() => switchDemoRole('admin')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${user.role === 'admin' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  <ShieldAlert size={12} className="inline mr-1" /> Admin
                </button>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle theme"
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {user ? (
              <>
                {/* Messages icon */}
                <Link
                  to="/messages"
                  className="p-2 rounded-xl text-slate-500 hover:text-[#6C63FF] dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                  title="Messages"
                >
                  <MessageSquare size={19} />
                </Link>

                {/* Notifications Bell */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setNotificationsOpen(!notificationsOpen);
                      if (!notificationsOpen && unreadCount > 0) handleMarkNotificationsRead();
                    }}
                    className="p-2 rounded-xl text-slate-500 hover:text-[#6C63FF] dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                    title="Notifications"
                  >
                    <Bell size={19} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                    )}
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
                    )}
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Notifications</h4>
                        <Link to="/notifications" onClick={() => setNotificationsOpen(false)} className="text-xs text-[#6C63FF] hover:underline">
                          View all
                        </Link>
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-slate-400 text-center py-4">No notifications yet</p>
                        ) : (
                          notifications.slice(0, 4).map(n => (
                            <div key={n.id} className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-xs">
                              <p className="font-semibold text-slate-900 dark:text-white mb-0.5">{n.title}</p>
                              <p className="text-slate-500 dark:text-slate-400">{n.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-[#6C63FF]/30"
                    />
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{user.name}</p>
                      <p className="text-[10px] text-[#6C63FF] uppercase font-semibold tracking-wider">{user.role}</p>
                    </div>
                    <ChevronDown size={14} className="text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                        <p className="font-bold text-sm text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      </div>

                      <Link
                        to={getDashboardLink()}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Briefcase size={16} /> Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <User size={16} /> My Profile
                      </Link>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      >
                        <LogOut size={16} /> Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#6C63FF]">
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#6C63FF] hover:bg-[#5A52E0] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-purple-500/20"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400"
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3">
          <Link to="/campaigns" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium py-2">Explore Campaigns</Link>
          <Link to="/features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium py-2">Features</Link>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium py-2">Pricing</Link>

          {user ? (
            <>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <Link to={getDashboardLink()} onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-[#6C63FF] py-2">Dashboard</Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium py-2">My Profile</Link>
                <Link to="/messages" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium py-2">Messages</Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block text-sm font-semibold text-rose-600 py-2">Log Out</button>
              </div>
            </>
          ) : (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center w-full py-2 font-semibold">Log In</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="text-center w-full py-2.5 bg-[#6C63FF] text-white rounded-xl font-semibold">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
