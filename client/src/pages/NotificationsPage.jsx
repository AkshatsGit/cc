import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../components/layout/Sidebar';
import { Bell, CheckCircle2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      if (res.data.success) {
        setNotifications(res.data.notifications);
      }
    } catch (e) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast.success('All notifications marked as read');
    } catch (e) {
      toast.error('Failed to mark notifications read');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Notifications Center</h1>
            <p className="text-xs text-slate-500">Real-time alerts for campaign invitations, application updates, and messages.</p>
          </div>
          <button
            onClick={handleMarkAllRead}
            className="text-xs font-bold text-[#6C63FF] hover:underline flex items-center gap-1"
          >
            <CheckCircle2 size={15} /> Mark All as Read
          </button>
        </div>

        <div className="card-creator p-6 space-y-3">
          {notifications.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No notifications yet</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  !n.read
                    ? 'bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{n.title}</h4>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{n.message}</p>
                  <p className="text-[10px] text-slate-400">{new Date(n.createdAt).toLocaleString()}</p>
                </div>

                {n.link && (
                  <Link
                    to={n.link}
                    className="px-3.5 py-1.5 rounded-xl bg-[#6C63FF] text-white text-xs font-bold hover:bg-[#5A52E0] transition-colors shrink-0"
                  >
                    View
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
