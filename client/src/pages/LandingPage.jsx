import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Sun,
  Sparkles
} from 'lucide-react';
import { VerificationBadge, MatchBadge } from '../components/common/Badge';

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/campaigns?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* HEADER HERO */}
      <div className="text-center space-y-4">
        <span className="inline-block text-xs font-bold px-3.5 py-1 bg-blue-950/80 text-blue-300 rounded-full border border-blue-800 shadow-xs">
          Beta v1.0 • GenZ Collab Demo
        </span>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl mx-auto">
          Post your requirement. <br />
          Match <span className="text-gradient-blue">Gen Z Creators</span> fast.
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Example: Brand posts a requirement for an SPF 50 Sunscreen launch targeting Gen Z on TikTok — and gets matched with creators whose audience actually matches.
        </p>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto pt-2">
          <div className="card-creator p-1.5 flex items-center gap-2 shadow-lg">
            <Search size={16} className="text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sunscreen, Gen Z GRWM, TikTok..."
              className="w-full bg-transparent border-none text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none py-1.5"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all shrink-0"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/signup?role=brand"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-600/30"
          >
            Post Campaign Requirement
          </Link>
          <Link
            to="/signup?role=influencer"
            className="bg-slate-800 text-slate-200 hover:bg-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs border border-slate-700"
          >
            Apply as Creator
          </Link>
        </div>
      </div>

      {/* CORE SHOWCASE: SUNSCREEN GENZ CAMPAIGN */}
      <div className="card-creator p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-md mb-1.5 border border-amber-800">
              <Sun size={12} className="text-amber-400" /> Featured Collab Demo Case
            </span>
            <h2 className="text-xl font-extrabold text-white">
              Aura SPF 50 Daily Sunscreen Gen Z TikTok Launch
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Requirement: Brand wants a Gen Z creator (18-24 audience) for a non-greasy SPF 50 sunscreen GRWM TikTok review.
            </p>
          </div>
          <MatchBadge score={98} reasons={["88% Gen Z Audience Overlap", "High Engagement Rate (5.8%)", "Beauty Niche Fit"]} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* BRAND REQUIREMENT ITEM */}
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden border border-slate-700">
              <img
                src="/sunscreen-campaign.png"
                alt="Aura Sunscreen Product"
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950/90 to-transparent text-white">
                <p className="text-xs font-bold">Aura Skincare • SPF 50 Hydrating Sunscreen</p>
                <p className="text-[11px] text-blue-300">Budget: $1,800 • Platform: TikTok</p>
              </div>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl text-xs space-y-1 border border-slate-700">
              <p className="font-semibold text-white">Deliverables Required:</p>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                <li>1 TikTok GRWM video (30-60s) showing sunscreen application</li>
                <li>2 Instagram Stories with product swipe-up link</li>
              </ul>
            </div>
          </div>

          {/* MATCHED CREATOR CARD */}
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden border border-slate-700">
              <img
                src="/genz-creator.png"
                alt="Gen Z Creator Mia Chen"
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950/90 to-transparent text-white">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold">Mia Chen (@miaglows)</p>
                  <VerificationBadge size={14} />
                </div>
                <p className="text-[11px] text-blue-300">320k TikTok Followers • 88% Gen Z Audience</p>
              </div>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl text-xs space-y-2 border border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-400">Proposed Rate:</span>
                <span className="font-bold text-white">$1,800</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-blue-400">Accepted & Address Exchanged</span>
              </div>
              <Link
                to="/campaigns/camp_sunscreen_1"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                View Campaign Details & Proposal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SIMPLE 3-STEP EXPLANATION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-creator p-5 space-y-2 text-left">
          <span className="w-7 h-7 rounded-lg bg-blue-950/80 text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-800">1</span>
          <h3 className="font-bold text-sm text-white">Brand Posts Requirement</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Specify your product (e.g., SPF 50 sunscreen), target audience (Gen Z), and deliverables budget.
          </p>
        </div>

        <div className="card-creator p-5 space-y-2 text-left">
          <span className="w-7 h-7 rounded-lg bg-blue-950/80 text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-800">2</span>
          <h3 className="font-bold text-sm text-white">Audience Match</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Matching engine highlights creators with verified Gen Z audience demographics (e.g., 88% Gen Z ratio).
          </p>
        </div>

        <div className="card-creator p-5 space-y-2 text-left">
          <span className="w-7 h-7 rounded-lg bg-blue-950/80 text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-800">3</span>
          <h3 className="font-bold text-sm text-white">Direct Chat & Collab</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Accept proposals, exchange shipping address for sunscreen samples, and chat directly in app.
          </p>
        </div>
      </div>
    </div>
  );
}
