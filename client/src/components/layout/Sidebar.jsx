import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
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
    <aside className="w-56 shrink-0 hidden lg:block bg-[#0F172A] border-r border-slate-800 min-h-[calc(100vh-4rem)] p-4 transition-colors">
      <div className="mb-6 px-3 py-2.5 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-500"
        />
        <div className="overflow-hidden">
          <p className="font-bold text-xs text-white truncate">{user.name}</p>
          <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
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
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
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
