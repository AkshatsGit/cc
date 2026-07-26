import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Megaphone,
  Users,
  MessageSquare,
  Settings,
  PlusCircle,
  Sparkles,
  Bookmark
} from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const role = user.role;

  const brandNav = [
    { label: 'Dashboard', path: '/brand/dashboard', icon: LayoutDashboard },
    { label: 'Post Campaign', path: '/brand/campaigns/new', icon: PlusCircle },
    { label: 'View Applicants', path: '/brand/applicants', icon: Users },
    { label: 'Direct Messages', path: '/messages', icon: MessageSquare },
    { label: 'Brand Profile', path: '/profile', icon: Settings }
  ];

  const influencerNav = [
    { label: 'Dashboard', path: '/influencer/dashboard', icon: LayoutDashboard },
    { label: 'Find Campaigns', path: '/campaigns', icon: Sparkles },
    { label: 'Saved Campaigns', path: '/saved-campaigns', icon: Bookmark },
    { label: 'Direct Messages', path: '/messages', icon: MessageSquare },
    { label: 'Creator Profile', path: '/profile', icon: Settings }
  ];

  const items = role === 'influencer' ? influencerNav : brandNav;

  return (
    <aside className="w-56 shrink-0 hidden lg:block bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 min-h-[calc(100vh-4rem)] p-4 transition-colors">
      <div className="mb-6 px-3 py-2.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover ring-1 ring-orange-500"
        />
        <div className="overflow-hidden">
          <p className="font-bold text-xs text-stone-900 dark:text-white truncate">{user.name}</p>
          <span className="text-[10px] font-semibold text-orange-600 uppercase tracking-wider">
            {role}
          </span>
        </div>
      </div>

      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold text-xs transition-all ${
                isActive
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
