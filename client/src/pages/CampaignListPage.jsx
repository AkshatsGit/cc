import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import { EmptyState } from '../components/common/EmptyState';
import { MatchBadge, StatusBadge } from '../components/common/Badge';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Bookmark,
  Sparkles,
  ArrowRight,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CampaignListPage() {
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const debouncedSearch = useDebounce(searchQuery, 400);

  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [platform, setPlatform] = useState('All');
  const [minFollowers, setMinFollowers] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);

  const categories = ['All', 'Tech & Gadgets', 'Beauty & Skincare', 'Fitness & Health', 'Gaming', 'Fashion', 'Travel', 'Food & Dining'];
  const platforms = ['All', 'Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Facebook'];

  useEffect(() => {
    fetchCampaigns();
  }, [debouncedSearch, category, platform, minFollowers, minBudget, sortBy]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (category !== 'All') params.append('category', category);
      if (platform !== 'All') params.append('platform', platform);
      if (minFollowers) params.append('minFollowers', minFollowers);
      if (minBudget) params.append('minBudget', minBudget);
      if (sortBy) params.append('sortBy', sortBy);

      const res = await api.get(`/campaigns?${params.toString()}`);
      if (res.data.success) {
        setCampaigns(res.data.campaigns);
      }
    } catch (e) {
      toast.error('Failed to load campaigns');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Explore Marketing Campaigns</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Browse open sponsorship campaigns from top brands. Filter by niche, deliverables, and minimum followers.
        </p>
      </div>

      {/* ADVANCED FILTER & SEARCH CONTROLS */}
      <div className="card-creator p-6 space-y-6">
        {/* Search bar & Sort */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by campaign title, keywords, or brand..."
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#6C63FF]"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <SlidersHorizontal size={18} className="text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold py-2.5 px-3 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="highest_match">Sort: Highest Match Score</option>
              <option value="budget_high">Sort: Highest Budget</option>
              <option value="followers_high">Sort: Required Followers</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category / Niche</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl focus:outline-none"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Preferred Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl focus:outline-none"
            >
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Min Followers (Max limit)</label>
            <input
              type="number"
              value={minFollowers}
              onChange={(e) => setMinFollowers(e.target.value)}
              placeholder="e.g. 50000"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Min Budget ($)</label>
            <input
              type="number"
              value={minBudget}
              onChange={(e) => setMinBudget(e.target.value)}
              placeholder="e.g. 1000"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* CAMPAIGNS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : campaigns.length === 0 ? (
        <EmptyState
          title="No matching campaigns found"
          description="Try resetting your filters or search keywords to view available brand sponsorships."
          actionText="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setCategory('All');
            setPlatform('All');
            setMinFollowers('');
            setMinBudget('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp) => (
            <div key={camp.id} className="card-creator p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Brand & Match Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={camp.brandLogo} alt={camp.brandName} className="w-9 h-9 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{camp.brandName}</h4>
                      <p className="text-[10px] text-slate-400">Campaign ID: {camp.id}</p>
                    </div>
                  </div>
                  {camp.matchScore && <MatchBadge score={camp.matchScore} reasons={camp.matchReasons} />}
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">{camp.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{camp.description}</p>

                {/* Details Pills */}
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

                {/* Meta details */}
                <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                  <p><span className="font-semibold text-slate-600 dark:text-slate-300">Min Followers:</span> {(camp.requiredFollowers / 1000).toFixed(0)}K</p>
                  <p><span className="font-semibold text-slate-600 dark:text-slate-300">Location:</span> {camp.location}</p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleBookmarkToggle(camp.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-[#6C63FF] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Bookmark campaign"
                >
                  <Bookmark size={18} />
                </button>

                <Link
                  to={`/campaigns/${camp.id}`}
                  className="flex-1 text-center bg-[#6C63FF] hover:bg-[#5A52E0] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-purple-500/20"
                >
                  View Details & Apply
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
