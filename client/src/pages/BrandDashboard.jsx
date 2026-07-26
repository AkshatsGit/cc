import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../components/layout/Sidebar';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import { EmptyState } from '../components/common/EmptyState';
import { StatusBadge, MatchBadge } from '../components/common/Badge';
import {
  Megaphone,
  Users,
  CheckCircle2,
  DollarSign,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Eye,
  Trash2,
  Edit3
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import toast from 'react-hot-toast';

export default function BrandDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ activeCampaigns: 0, totalCampaigns: 0, totalApplications: 0, selectedInfluencers: 0 });
  const [campaigns, setCampaigns] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get('/brands/dashboard');
      if (res.data.success) {
        setStats(res.data.stats);
        setCampaigns(res.data.campaigns);
        setRecentApplications(res.data.recentApplications);
      }
    } catch (e) {
      toast.error('Failed to load brand dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCampaign = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;
    try {
      const res = await api.delete(`/campaigns/${id}`);
      if (res.data.success) {
        toast.success('Campaign deleted successfully');
        setCampaigns(prev => prev.filter(c => c.id !== id));
      }
    } catch (e) {
      toast.error('Failed to delete campaign');
    }
  };

  const handleUpdateApplicantStatus = async (appId, status) => {
    try {
      const res = await api.put(`/applications/${appId}/status`, { status });
      if (res.data.success) {
        toast.success(`Applicant status updated to ${status}`);
        setRecentApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
      }
    } catch (e) {
      toast.error('Failed to update status');
    }
  };

  const analyticsChartData = campaigns.map(c => ({
    name: c.title.length > 15 ? c.title.slice(0, 15) + '...' : c.title,
    applications: c.applicationsCount || 0,
    budget: c.budget
  }));

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-8 max-w-7xl overflow-hidden">
        {/* HEADER & QUICK CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Brand Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Manage campaigns, evaluate creator applications, and track ROI.</p>
          </div>
          <Link
            to="/brand/campaigns/new"
            className="bg-[#6C63FF] hover:bg-[#5A52E0] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-purple-500/20 flex items-center gap-2"
          >
            <PlusCircle size={18} /> Create New Campaign
          </Link>
        </div>

        {/* METRICS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-creator p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Campaigns</span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] flex items-center justify-center">
                <Megaphone size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.activeCampaigns}</p>
            <p className="text-xs text-slate-400">Total: {stats.totalCampaigns} campaigns</p>
          </div>

          <div className="card-creator p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Applications</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                <Users size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalApplications}</p>
            <p className="text-xs text-slate-400">From verified creators</p>
          </div>

          <div className="card-creator p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Selected Creators</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.selectedInfluencers}</p>
            <p className="text-xs text-emerald-600 font-semibold">Active Collaborations</p>
          </div>

          <div className="card-creator p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Budget Allocated</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                <DollarSign size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              ${campaigns.reduce((sum, c) => sum + (c.budget || 0), 0).toLocaleString()}
            </p>
            <p className="text-xs text-slate-400">Across active sponsorships</p>
          </div>
        </div>

        {/* ANALYTICS CHART */}
        <div className="card-creator p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Campaign Applications & Demand</h3>
              <p className="text-xs text-slate-500">Applicant interest per active campaign</p>
            </div>
            <TrendingUp size={20} className="text-[#6C63FF]" />
          </div>

          <div className="h-64 w-full pt-4">
            {analyticsChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsChartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="applications" fill="#6C63FF" radius={[6, 6, 0, 0]} name="Applicants" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-slate-400 py-12 text-sm">No campaign data available yet</p>
            )}
          </div>
        </div>

        {/* ACTIVE CAMPAIGN LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Campaigns</h3>
            <Link to="/brand/campaigns" className="text-xs font-bold text-[#6C63FF] hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : campaigns.length === 0 ? (
            <EmptyState
              title="No campaigns created"
              description="Create your first marketing campaign to start matching with top social media influencers."
              actionText="Create Campaign"
              actionLink="/brand/campaigns/new"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map((camp) => (
                <div key={camp.id} className="card-creator p-6 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-base text-slate-900 dark:text-white leading-tight">{camp.title}</h4>
                      <StatusBadge status={camp.status} />
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{camp.description}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                        📂 {camp.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] font-bold">
                        💰 ${camp.budget}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                        🎯 {camp.preferredPlatform}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      👥 {camp.applicationsCount || 0} Applicants
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/brand/campaigns/${camp.id}/applicants`}
                        className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <Eye size={14} /> Applicants
                      </Link>
                      <button
                        onClick={() => handleDeleteCampaign(camp.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                        title="Delete campaign"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RECENT APPLICATIONS TABLE */}
        <div className="card-creator p-6 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Applications</h3>

          {recentApplications.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">No recent creator applications</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs uppercase">
                    <th className="py-3 px-4">Creator</th>
                    <th className="py-3 px-4">Match Score</th>
                    <th className="py-3 px-4">Proposed Rate</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img src={app.influencerAvatar} alt={app.influencerName} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white text-xs">{app.influencerName}</p>
                            <p className="text-[11px] text-slate-400">{app.influencerHandle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <MatchBadge score={app.matchScore || 90} />
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        ${app.proposedRate}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        {app.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleUpdateApplicantStatus(app.id, 'accepted')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleUpdateApplicantStatus(app.id, 'shortlist')}
                              className="px-2.5 py-1 rounded-lg bg-purple-100 text-[#6C63FF] text-xs font-bold hover:bg-purple-200 transition-colors"
                            >
                              Shortlist
                            </button>
                            <button
                              onClick={() => handleUpdateApplicantStatus(app.id, 'rejected')}
                              className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-700 text-xs font-bold hover:bg-rose-200 transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
