import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../components/layout/Sidebar';
import { StatusBadge, VerificationBadge } from '../components/common/Badge';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import {
  ShieldAlert,
  Users,
  Megaphone,
  CheckCircle2,
  Trash2,
  Ban,
  FileText,
  Lock,
  Unlock,
  BadgeCheck
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, brandsCount: 0, influencersCount: 0, totalCampaigns: 0, totalApplications: 0 });
  const [users, setUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const res = await api.get('/admin/stats');
      if (res.data.success) {
        setStats(res.data.stats);
        setUsers(res.data.users);
        setCampaigns(res.data.campaigns);
        setReports(res.data.reports);
      }
    } catch (e) {
      toast.error('Failed to load admin stats');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBan = async (userId, currentBanned) => {
    try {
      const res = await api.put(`/admin/users/${userId}/ban`, { banned: !currentBanned });
      if (res.data.success) {
        toast.success(`User ${!currentBanned ? 'banned' : 'unbanned'} successfully`);
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, banned: !currentBanned } : u));
      }
    } catch (e) {
      toast.error('Failed to update ban status');
    }
  };

  const handleToggleVerification = async (userId, role, currentVerified) => {
    try {
      const res = await api.put(`/admin/verify/${userId}`, { type: role, verified: !currentVerified });
      if (res.data.success) {
        toast.success('Verification badge updated');
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, verified: !currentVerified } : u));
      }
    } catch (e) {
      toast.error('Failed to update verification badge');
    }
  };

  const handleDeleteCampaignAdmin = async (id) => {
    if (!window.confirm('Admin action: Delete this campaign?')) return;
    try {
      await api.delete(`/campaigns/${id}`);
      toast.success('Campaign deleted by admin');
      setCampaigns(prev => prev.filter(c => c.id !== id));
    } catch (e) {
      toast.error('Failed to delete campaign');
    }
  };

  const handleModerateReport = async (reportId, status) => {
    try {
      const res = await api.put(`/admin/reports/${reportId}`, { status });
      if (res.data.success) {
        toast.success(`Report marked as ${status}`);
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status } : r));
      }
    } catch (e) {
      toast.error('Failed to update report status');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-8 max-w-7xl overflow-hidden">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert size={28} className="text-amber-500" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">System Administration Panel</h1>
          </div>
          <p className="text-xs text-slate-500">Platform moderation, verified creator badges, user suspension, and analytics.</p>
        </div>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-creator p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Users</span>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalUsers}</p>
            <p className="text-xs text-slate-400">{stats.brandsCount} Brands, {stats.influencersCount} Creators</p>
          </div>
          <div className="card-creator p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Campaigns</span>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalCampaigns}</p>
            <p className="text-xs text-slate-400">Total active & completed</p>
          </div>
          <div className="card-creator p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Applications</span>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalApplications}</p>
            <p className="text-xs text-slate-400">Submitted proposals</p>
          </div>
          <div className="card-creator p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Pending Reports</span>
            <p className="text-3xl font-black text-amber-600">{reports.filter(r => r.status === 'pending').length}</p>
            <p className="text-xs text-slate-400">Requires moderation</p>
          </div>
        </div>

        {/* USER MANAGEMENT TABLE */}
        <div className="card-creator p-6 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">User Management & Verification</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase">
                  <th className="p-3">User</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Verified Badge</th>
                  <th className="p-3">Account Status</th>
                  <th className="p-3 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <p>{u.name}</p>
                          <p className="text-[10px] text-slate-400 font-normal">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 uppercase font-bold text-[#6C63FF]">{u.role}</td>
                    <td className="p-3">
                      {u.verified ? <VerificationBadge /> : <span className="text-slate-400">Unverified</span>}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${u.banned ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {u.banned ? 'BANNED' : 'ACTIVE'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleToggleVerification(u.id, u.role, u.verified)}
                        className="px-2 py-1 rounded bg-purple-50 text-[#6C63FF] font-bold hover:bg-purple-100"
                      >
                        <BadgeCheck size={14} className="inline" /> Badge
                      </button>
                      <button
                        onClick={() => handleToggleBan(u.id, u.banned)}
                        className={`px-2 py-1 rounded font-bold text-white ${u.banned ? 'bg-emerald-600' : 'bg-rose-600'}`}
                      >
                        {u.banned ? 'Unban' : 'Ban'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CAMPAIGN MODERATION TABLE */}
        <div className="card-creator p-6 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Campaign Moderation</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase">
                  <th className="p-3">Campaign Title</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{c.title}</td>
                    <td className="p-3">{c.brandName}</td>
                    <td className="p-3 font-bold text-emerald-600">${c.budget}</td>
                    <td className="p-3"><StatusBadge status={c.status} /></td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteCampaignAdmin(c.id)}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
