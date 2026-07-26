import React from 'react';
import { Sparkles, MessageSquare, ShieldCheck, Search, TrendingUp, DollarSign } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Platform Features</h1>
        <p className="text-slate-500 text-sm">Everything required to launch, scale, and measure viral influencer campaigns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-creator p-8 space-y-4">
          <Sparkles className="text-[#6C63FF]" size={32} />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Recommendation Engine</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Matches campaigns to creators with 95%+ accuracy based on historical engagement rate, preferred target platform, and category overlap.
          </p>
        </div>

        <div className="card-creator p-8 space-y-4">
          <MessageSquare className="text-[#6C63FF]" size={32} />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Real-Time In-App Chat</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Collaborate directly with creators, review draft reels, track read receipts, and exchange raw high-res campaign assets.
          </p>
        </div>

        <div className="card-creator p-8 space-y-4">
          <Search className="text-[#6C63FF]" size={32} />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Multi-Filter Campaign Search</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Search opportunities by category, minimum followers, campaign budget, target country, and preferred platform.
          </p>
        </div>

        <div className="card-creator p-8 space-y-4">
          <ShieldCheck className="text-[#6C63FF]" size={32} />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Verified Creator Badges</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Ensures authentic follower stats and verified rate card deliverables for high brand protection.
          </p>
        </div>
      </div>
    </div>
  );
}
