import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Star,
  Users,
  Sun,
  Flame,
  Heart
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
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-12 lg:pt-16 lg:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-[#6C63FF] font-semibold text-xs mb-6 shadow-xs">
            <Sparkles size={14} />
            <span>Beta Release v1.0 • Minimalist Influencer Marketplace</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight max-w-3xl mx-auto leading-[1.15] mb-6">
            Post Your Requirement. <br className="hidden sm:inline" />
            Match <span className="text-gradient-purple">Gen Z Creators</span> Fast.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-normal leading-relaxed mb-8">
            The ultra-clean platform where brands launch targeted campaign briefs—like finding Gen Z TikTok creators for daily SPF 50 sunscreen—and get instant matched proposals.
          </p>

          {/* MINIMAL SEARCH BAR */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
            <div className="card-creator p-2 flex items-center gap-2 shadow-xl">
              <div className="relative flex-1 flex items-center pl-3">
                <Search size={18} className="text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., Sunscreen GRWM TikTok, Gen Z Skincare..."
                  className="w-full bg-transparent border-none text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none placeholder-slate-400 py-2"
                />
              </div>

              <button
                type="submit"
                className="bg-[#6C63FF] hover:bg-[#5A52E0] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5 shrink-0"
              >
                <span>Find Campaigns</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/signup?role=brand"
              className="bg-[#6C63FF] hover:bg-[#5A52E0] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-purple-500/20"
            >
              Post Requirement (Brand)
            </Link>
            <Link
              to="/signup?role=influencer"
              className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 px-6 py-3 rounded-xl font-bold text-sm border border-slate-200 dark:border-slate-700"
            >
              Apply as Influencer
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED USE CASE: SUNSCREEN GENZ CAMPAIGN */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-creator p-6 sm:p-10 space-y-8 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 dark:from-slate-900 dark:to-purple-950/20 border border-purple-100 dark:border-purple-900/50 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-purple-100 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-bold text-xs mb-3">
                <Sun size={14} /> Featured Campaign Match
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                AURA SPF 50 Daily Sunscreen Launch
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Requirement: Looking for a Gen Z creator to film an aesthetic morning GRWM applying non-greasy SPF 50.
              </p>
            </div>
            <MatchBadge score={98} reasons={["88% Gen Z Audience", "High Engagement (5.8%)", "Skincare Niche Fit"]} />
          </div>

          {/* TWO COLUMN MATCH SHOWCASE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* BRAND REQUIREMENT CARD */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800 group">
                <img
                  src="/sunscreen-campaign.png"
                  alt="Sunscreen Product"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Brand Requirement</span>
                  <p className="text-base font-bold">AURA SPF 50 Oil-Free Defense</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-slate-400 font-semibold">Budget</p>
                  <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">$1,800</p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-slate-400 font-semibold">Target Audience</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">Gen Z (18-24)</p>
                </div>
              </div>
            </div>

            {/* MATCHED GENZ CREATOR CARD */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800 group">
                <img
                  src="/genz-creator.png"
                  alt="GenZ Influencer Mia Chen"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-bold">Mia Chen</span>
                    <VerificationBadge size={16} />
                  </div>
                  <p className="text-xs text-purple-200">@miaglows • 320k TikTok Followers</p>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Gen Z Audience Ratio:</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">88%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Engagement Rate:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">5.8% (High)</span>
                </div>
                <Link
                  to="/campaigns/camp_sunscreen_1"
                  className="block text-center mt-3 bg-[#6C63FF] hover:bg-[#5A52E0] text-white py-2 rounded-xl text-xs font-bold transition-all"
                >
                  View Sunscreen Campaign & Apply
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMALIST 3-STEP FLOW */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Ultra-Clean 3 Step Workflow</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-creator p-6 space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] flex items-center justify-center font-bold text-base">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Post Requirement</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Describe your target audience (e.g. GenZ), product type (e.g. SPF 50 Sunscreen), and deliverables budget.
            </p>
          </div>

          <div className="card-creator p-6 space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] flex items-center justify-center font-bold text-base">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">AI Audience Match</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our algorithm ranks creators with verified GenZ follower demographics and high skincare engagement rates.
            </p>
          </div>

          <div className="card-creator p-6 space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] flex items-center justify-center font-bold text-base">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Direct Chat & Launch</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Accept proposals, exchange product shipping addresses in chat, review content drafts, and launch your campaign.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
