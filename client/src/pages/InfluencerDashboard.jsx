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
  ArrowRight
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
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">Creator Dashboard</h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs">Discover brand campaigns matching your audience reach & Gen Z ratio.</p>
          </div>
          <Link
            to="/campaigns"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center gap-1.5"
          >
            <Sparkles size={16} /> Explore All Opportunities
          </Link>
        </div>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-creator p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Recommended Collabs</span>
              <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-950/50 text-orange-600 flex items-center justify-center border border-orange-200 dark:border-orange-800">
                <Sparkles size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white">{stats.recommendedCount}</p>
            <p className="text-[11px] text-orange-600 font-semibold">Matched by Audience Ratio</p>
          </div>

          <div className="card-creator p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Applied Campaigns</span>
              <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center border border-stone-200 dark:border-stone-700">
                <Briefcase size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white">{stats.appliedCount}</p>
            <p className="text-[11px] text-stone-400">Proposals submitted</p>
          </div>

          <div className="card-creator p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Active Collabs</span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center border border-teal-200 dark:border-teal-800">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white">{stats.activeCollabsCount}</p>
            <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">Accepted Collabs</p>
          </div>

          <div className="card-creator p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Earnings</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center border border-amber-200 dark:border-amber-800">
                <DollarSign size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white">${stats.totalEarnings.toLocaleString()}</p>
            <p className="text-[11px] text-stone-400">From accepted contracts</p>
          </div>
        </div>

        {/* RECOMMENDED OPPORTUNITIES GRID */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">Recommended Opportunities</h3>
            <Link to="/campaigns" className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1">
              Explore All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedCampaigns.map((camp) => (
              <div key={camp.id} className="card-creator p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={camp.brandLogo} alt={camp.brandName} className="w-7 h-7 rounded-lg object-cover" />
                      <span className="font-bold text-xs text-stone-800 dark:text-stone-200">{camp.brandName}</span>
                    </div>
                    <MatchBadge score={camp.matchScore} reasons={camp.matchReasons} />
                  </div>

                  <h4 className="font-bold text-sm text-stone-900 dark:text-white line-clamp-1">{camp.title}</h4>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{camp.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
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

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleBookmarkToggle(camp.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-orange-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    title="Save campaign"
                  >
                    <Bookmark size={16} />
                  </button>

                  <Link
                    to={`/campaigns/${camp.id}`}
                    className="flex-1 text-center bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    {camp.hasApplied ? 'View Status' : 'View & Apply'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
