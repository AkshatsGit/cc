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
  Trash2
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
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">Brand Dashboard</h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs">Manage campaign requirements, review creator applications, and launch GRWM collabs.</p>
          </div>
          <Link
            to="/brand/campaigns/new"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center gap-1.5"
          >
            <PlusCircle size={16} /> Post New Campaign Requirement
          </Link>
        </div>

        {/* METRICS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-creator p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Active Campaigns</span>
              <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-950/50 text-orange-600 flex items-center justify-center border border-orange-200 dark:border-orange-800">
                <Megaphone size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white">{stats.activeCampaigns}</p>
            <p className="text-[11px] text-stone-400">Total: {stats.totalCampaigns} campaigns</p>
          </div>

          <div className="card-creator p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Total Applications</span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center border border-teal-200 dark:border-teal-800">
                <Users size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white">{stats.totalApplications}</p>
            <p className="text-[11px] text-stone-400">Gen Z creators applied</p>
          </div>

          <div className="card-creator p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Accepted Creators</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white">{stats.selectedInfluencers}</p>
            <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">Active Collabs</p>
          </div>

          <div className="card-creator p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Total Budget</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center border border-amber-200 dark:border-amber-800">
                <DollarSign size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white">
              ${campaigns.reduce((sum, c) => sum + (c.budget || 0), 0).toLocaleString()}
            </p>
            <p className="text-[11px] text-stone-400">Sunscreen & GenZ collabs</p>
          </div>
        </div>

        {/* ANALYTICS CHART */}
        <div className="card-creator p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">Campaign Applications & Demand</h3>
              <p className="text-xs text-stone-500">Applicant proposals received per campaign</p>
            </div>
            <TrendingUp size={18} className="text-orange-600" />
          </div>

          <div className="h-56 w-full pt-2">
            {analyticsChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsChartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#A8A29E" fontSize={11} />
                  <YAxis stroke="#A8A29E" fontSize={11} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E7E5E4', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="applications" fill="#EA580C" radius={[4, 4, 0, 0]} name="Applications" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-stone-400 py-12 text-xs">No active campaign data available</p>
            )}
          </div>
        </div>

        {/* ACTIVE CAMPAIGNS GRID */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">Your Campaign Requirements</h3>
            <Link to="/brand/campaigns" className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {campaigns.length === 0 ? (
            <EmptyState
              title="No campaigns posted"
              description="Post your first sponsorship requirement to match with top creators."
              actionText="Post Campaign"
              actionLink="/brand/campaigns/new"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaigns.map((camp) => (
                <div key={camp.id} className="card-creator p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-sm text-stone-900 dark:text-white leading-tight">{camp.title}</h4>
                      <StatusBadge status={camp.status} />
                    </div>
                    <p className="text-xs text-stone-500 line-clamp-2 mb-2">{camp.description}</p>
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                        {camp.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 font-bold border border-orange-200 dark:border-orange-800">
                        ${camp.budget}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                        {camp.preferredPlatform}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-500">
                      👥 {camp.applicationsCount || 0} Applicants
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/brand/campaigns/${camp.id}/applicants`}
                        className="px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 hover:bg-orange-600 hover:text-white text-xs font-bold transition-all flex items-center gap-1 border border-orange-200 dark:border-orange-800"
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
      </main>
    </div>
  );
}
