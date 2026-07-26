import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../components/layout/Sidebar';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import { EmptyState } from '../components/common/EmptyState';
import { StatusBadge, MatchBadge } from '../components/common/Badge';
import {
  Sparkles,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Bookmark,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function InfluencerDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ appliedCount: 0, activeCollabsCount: 0, totalEarnings: 0, recommendedCount: 0 });
  const [recommendedCampaigns, setRecommendedCampaigns] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [activeCollaborations, setActiveCollaborations] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get('/influencers/dashboard');
      if (res.data.success) {
        setStats(res.data.stats);
        setRecommendedCampaigns(res.data.recommendedCampaigns);
        setMyApplications(res.data.myApplications);
        setActiveCollaborations(res.data.activeCollaborations);
      }
    } catch (e) {
      toast.error('Failed to load creator dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkToggle = async (campaignId) => {
    try {
      const res = await api.post('/campaigns/bookmark', { campaignId });
      if (res.data.success) {
        toast.success(res.data.bookmarked ? 'Saved to bookmarks' : 'Removed from bookmarks');
      }
    } catch (e) {
      toast.error('Failed to update bookmark');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-8 max-w-7xl overflow-hidden">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Creator Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Discover high-converting brand campaigns tailored to your niche & reach.</p>
          </div>
          <Link
            to="/campaigns"
            className="bg-[#6C63FF] hover:bg-[#5A52E0] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-purple-500/20 flex items-center gap-2"
          >
            <Sparkles size={18} /> Explore All Opportunities
          </Link>
        </div>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-creator p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recommended Opportunities</span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] flex items-center justify-center">
                <Sparkles size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.recommendedCount}</p>
            <p className="text-xs text-[#6C63FF] font-semibold">Matched by AI Niche Score</p>
          </div>

          <div className="card-creator p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applied Campaigns</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                <Briefcase size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.appliedCount}</p>
            <p className="text-xs text-slate-400">Proposals submitted</p>
          </div>

          <div className="card-creator p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Collaborations</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.activeCollabsCount}</p>
            <p className="text-xs text-emerald-600 font-semibold">Accepted Brand Collabs</p>
          </div>

          <div className="card-creator p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Earnings</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                <DollarSign size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">${stats.totalEarnings.toLocaleString()}</p>
            <p className="text-xs text-slate-400">From accepted contracts</p>
          </div>
        </div>

        {/* AI RECOMMENDED CAMPAIGN FEED */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Recommended Campaigns</h3>
                <p className="text-xs text-slate-400">Ranked by your niche, reach, platform & rate fit</p>
              </div>
            </div>
            <Link to="/campaigns" className="text-xs font-bold text-[#6C63FF] hover:underline flex items-center gap-1">
              View All Opportunities <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : recommendedCampaigns.length === 0 ? (
            <EmptyState
              title="No recommendations found"
              description="Explore all open brand campaigns and update your profile niche settings."
              actionText="Browse Campaigns"
              actionLink="/campaigns"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCampaigns.map((camp) => (
                <div key={camp.id} className="card-creator p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={camp.brandLogo} alt={camp.brandName} className="w-8 h-8 rounded-lg object-cover" />
                        <span className="font-bold text-xs text-slate-700 dark:text-slate-300">{camp.brandName}</span>
                      </div>
                      <MatchBadge score={camp.matchScore} reasons={camp.matchReasons} />
                    </div>

                    <h4 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">{camp.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{camp.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                        📂 {camp.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] text-[11px] font-bold">
                        💰 ${camp.budget}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                        🎯 {camp.preferredPlatform}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleBookmarkToggle(camp.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-[#6C63FF] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Save campaign"
                    >
                      <Bookmark size={18} />
                    </button>

                    <Link
                      to={`/campaigns/${camp.id}`}
                      className="flex-1 text-center bg-[#6C63FF] hover:bg-[#5A52E0] text-white py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-purple-500/20"
                    >
                      {camp.hasApplied ? 'View Status' : 'Apply Now'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ACTIVE COLLABORATIONS & APPLIED TRACKER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Collaborations */}
          <div className="card-creator p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Collaborations</h3>
              <Link to="/messages" className="text-xs font-bold text-[#6C63FF] hover:underline flex items-center gap-1">
                Open Chat <MessageSquare size={14} />
              </Link>
            </div>

            {activeCollaborations.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No active brand collaborations yet</p>
            ) : (
              <div className="space-y-3">
                {activeCollaborations.map((app) => (
                  <div key={app.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-xs">Accepted Sponsorship</p>
                      <p className="text-[11px] text-slate-500">Rate: ${app.proposedRate}</p>
                    </div>
                    <Link
                      to="/messages"
                      className="px-3 py-1.5 rounded-lg bg-[#6C63FF] text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                    >
                      <MessageSquare size={14} /> Chat Brand
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Applied Campaigns Status Tracker */}
          <div className="card-creator p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Applied Campaigns</h3>

            {myApplications.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">You haven't applied to any campaigns yet</p>
            ) : (
              <div className="space-y-3">
                {myApplications.map((app) => (
                  <div key={app.id} className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900 dark:text-white text-xs">Campaign ID: {app.campaignId}</p>
                      <p className="text-[11px] text-slate-400">Proposed Rate: ${app.proposedRate}</p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
