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
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#0F172A]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-8 max-w-7xl overflow-hidden text-slate-100">
        {/* HEADER & QUICK CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Brand Dashboard</h1>
            <p className="text-slate-400 text-xs">Manage campaign requirements, review creator applications, and launch GRWM collabs.</p>
          </div>
          <Link
            to="/brand/campaigns/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center gap-1.5"
          >
            <PlusCircle size={16} /> Post Campaign Requirement
          </Link>
        </div>

        {/* METRICS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-creator p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Campaigns</span>
              <div className="w-8 h-8 rounded-lg bg-blue-950/80 text-blue-400 flex items-center justify-center border border-blue-800">
                <Megaphone size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{stats.activeCampaigns}</p>
            <p className="text-[11px] text-slate-400">Total: {stats.totalCampaigns} campaigns</p>
          </div>

          <div className="card-creator p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Applications</span>
              <div className="w-8 h-8 rounded-lg bg-blue-950/80 text-blue-400 flex items-center justify-center border border-blue-800">
                <Users size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{stats.totalApplications}</p>
            <p className="text-[11px] text-slate-400">Gen Z creators applied</p>
          </div>

          <div className="card-creator p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Accepted Creators</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 text-emerald-400 flex items-center justify-center border border-emerald-800">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{stats.selectedInfluencers}</p>
            <p className="text-[11px] text-emerald-400 font-semibold">Active Collabs</p>
          </div>

          <div className="card-creator p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Budget</span>
              <div className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-400 flex items-center justify-center border border-amber-800">
                <DollarSign size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-white">
              ${campaigns.reduce((sum, c) => sum + (c.budget || 0), 0).toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-400">Sunscreen & GenZ collabs</p>
          </div>
        </div>

        {/* ANALYTICS CHART */}
        <div className="card-creator p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Campaign Applications & Demand</h3>
              <p className="text-xs text-slate-400">Applicant proposals received per campaign</p>
            </div>
            <TrendingUp size={18} className="text-blue-400" />
          </div>

          <div className="h-56 w-full pt-2">
            {analyticsChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsChartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: '1px solid #334155', color: '#FFF' }} />
                  <Bar dataKey="applications" fill="#2563EB" radius={[4, 4, 0, 0]} name="Applications" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-slate-400 py-12 text-xs">No active campaign data available</p>
            )}
          </div>
        </div>

        {/* ACTIVE CAMPAIGNS GRID */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Your Campaign Requirements</h3>
            <Link to="/brand/campaigns" className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1">
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
                      <h4 className="font-bold text-sm text-white leading-tight">{camp.title}</h4>
                      <StatusBadge status={camp.status} />
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-2">{camp.description}</p>
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium border border-slate-700">
                        {camp.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 font-bold border border-blue-800">
                        ${camp.budget}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium border border-slate-700">
                        {camp.preferredPlatform}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                      👥 {camp.applicationsCount || 0} Applicants
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/brand/campaigns/${camp.id}/applicants`}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold transition-all flex items-center gap-1 shadow-xs"
                      >
                        <Eye size={14} /> Applicants
                      </Link>
                      <button
                        onClick={() => handleDeleteCampaign(camp.id)}
                        className="p-1.5 text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors"
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
