import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Megaphone,
  Users,
  MessageSquare,
  Bell,
  Settings,
  PlusCircle,
  Bookmark,
  Sparkles,
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const role = user.role;

  const brandNav = [
    { label: 'Dashboard', path: '/brand/dashboard', icon: LayoutDashboard },
    { label: 'My Campaigns', path: '/brand/campaigns', icon: Megaphone },
    { label: 'Create Campaign', path: '/brand/campaigns/new', icon: PlusCircle },
    { label: 'Applicants', path: '/brand/applicants', icon: Users },
    { label: 'Messages', path: '/messages', icon: MessageSquare },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Brand Profile', path: '/profile', icon: Settings }
  ];

  const influencerNav = [
    { label: 'Dashboard', path: '/influencer/dashboard', icon: LayoutDashboard },
    { label: 'Find Campaigns', path: '/campaigns', icon: Sparkles },
    { label: 'Saved Campaigns', path: '/saved-campaigns', icon: Bookmark },
    { label: 'Messages', path: '/messages', icon: MessageSquare },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Creator Profile', path: '/profile', icon: Settings }
  ];

  const adminNav = [
    { label: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'User Management', path: '/admin/users', icon: Users },
    { label: 'Campaign Moderation', path: '/admin/campaigns', icon: Megaphone },
    { label: 'Reports & Flagged', path: '/admin/reports', icon: FileText },
    { label: 'Verification Badges', path: '/admin/verification', icon: ShieldCheck }
  ];

  let items = brandNav;
  if (role === 'influencer') items = influencerNav;
  if (role === 'admin') items = adminNav;

  return (
    <aside className="w-64 shrink-0 hidden lg:block bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-4rem)] p-4 transition-colors">
      <div className="mb-6 px-3 py-2 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-900/50 flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-[#6C63FF]"
        />
        <div className="overflow-hidden">
          <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{user.name}</p>
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#6C63FF] bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
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
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isActive
                  ? 'bg-[#6C63FF] text-white shadow-md shadow-purple-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
