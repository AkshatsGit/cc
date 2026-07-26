import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe, Share2, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-slate-100 dark:border-slate-800">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-purple flex items-center justify-center text-white shadow-md">
                <Sparkles size={18} />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Creator<span className="text-[#6C63FF]">Cart</span>
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
              The modern marketplace matching visionary Brands with influential Social Media Creators for high-ROI marketing collaborations.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#6C63FF] transition-colors"><Globe size={18} /></a>
              <a href="#" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#6C63FF] transition-colors"><Share2 size={18} /></a>
              <a href="#" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#6C63FF] transition-colors"><MessageCircle size={18} /></a>
              <a href="#" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#6C63FF] transition-colors"><Heart size={18} /></a>
            </div>
          </div>

          {/* Column 1 */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <li><Link to="/campaigns" className="hover:text-[#6C63FF]">Browse Campaigns</Link></li>
              <li><Link to="/features" className="hover:text-[#6C63FF]">AI Match Engine</Link></li>
              <li><Link to="/pricing" className="hover:text-[#6C63FF]">Pricing Plans</Link></li>
              <li><Link to="/about" className="hover:text-[#6C63FF]">Success Stories</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-4">For Brands</h4>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <li><Link to="/signup?role=brand" className="hover:text-[#6C63FF]">Post a Campaign</Link></li>
              <li><Link to="/features" className="hover:text-[#6C63FF]">Creator Vetting</Link></li>
              <li><Link to="/pricing" className="hover:text-[#6C63FF]">Enterprise Collabs</Link></li>
              <li><Link to="/brand/dashboard" className="hover:text-[#6C63FF]">Brand Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-4">For Creators</h4>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <li><Link to="/signup?role=influencer" className="hover:text-[#6C63FF]">Join as Influencer</Link></li>
              <li><Link to="/campaigns" className="hover:text-[#6C63FF]">Find Sponsorships</Link></li>
              <li><Link to="/influencer/dashboard" className="hover:text-[#6C63FF]">Creator Analytics</Link></li>
              <li><Link to="/about" className="hover:text-[#6C63FF]">Creator Guidelines</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Creator Cart Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
