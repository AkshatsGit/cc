import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Transparent Pricing</h1>
        <p className="text-slate-500 text-sm">Free for creators. Flexible plans for ambitious brands scaling marketing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Creator Free */}
        <div className="card-creator p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white">Creator Starter</h3>
            <p className="text-xs text-slate-400">For influencers seeking brand deals</p>
            <p className="text-4xl font-black text-slate-900 dark:text-white">$0<span className="text-xs text-slate-400 font-normal"> / forever</span></p>

            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2"><Check size={16} className="text-[#6C63FF]" /> Unlimited Campaign Applications</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-[#6C63FF]" /> AI Match Recommendations</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-[#6C63FF]" /> Media Kit Portfolio Page</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-[#6C63FF]" /> Direct In-App Chat</li>
            </ul>
          </div>

          <Link to="/signup?role=influencer" className="w-full text-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white py-3 rounded-xl font-bold text-xs">
            Join as Influencer
          </Link>
        </div>

        {/* Brand Growth */}
        <div className="card-creator p-8 space-y-6 flex flex-col justify-between border-2 border-[#6C63FF] relative shadow-xl">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6C63FF] text-white text-[10px] uppercase font-black px-3 py-1 rounded-full">
            Most Popular
          </span>
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white">Brand Growth</h3>
            <p className="text-xs text-slate-400">For scaling DTC brands & agencies</p>
            <p className="text-4xl font-black text-slate-900 dark:text-white">$149<span className="text-xs text-slate-400 font-normal"> / month</span></p>

            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2"><Check size={16} className="text-[#6C63FF]" /> Launch Up to 10 Campaigns</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-[#6C63FF]" /> Unlimited Creator Applications</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-[#6C63FF]" /> Advanced AI Match Scoring</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-[#6C63FF]" /> Priority Chat Support</li>
            </ul>
          </div>

          <Link to="/signup?role=brand" className="w-full text-center bg-[#6C63FF] hover:bg-[#5A52E0] text-white py-3 rounded-xl font-bold text-xs shadow-md">
            Start 14-Day Free Trial
          </Link>
        </div>

        {/* Brand Enterprise */}
        <div className="card-creator p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white">Enterprise Agency</h3>
            <p className="text-xs text-slate-400">For large networks & agencies</p>
            <p className="text-4xl font-black text-slate-900 dark:text-white">$399<span className="text-xs text-slate-400 font-normal"> / month</span></p>

            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2"><Check size={16} className="text-[#6C63FF]" /> Unlimited Campaigns & Teammates</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-[#6C63FF]" /> Dedicated Campaign Manager</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-[#6C63FF]" /> Custom API & CRM Export</li>
            </ul>
          </div>

          <Link to="/signup?role=brand" className="w-full text-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white py-3 rounded-xl font-bold text-xs">
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
}
