import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe, Share2, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-stone-200 dark:border-stone-800">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-base shadow-xs">
                C
              </div>
              <span className="text-xl font-black tracking-tight text-stone-900 dark:text-white">
                Creator<span className="text-orange-600">Cart</span>
              </span>
            </div>
            <p className="text-stone-500 dark:text-stone-400 text-xs max-w-sm leading-relaxed">
              Influencer collaboration marketplace connecting Gen Z brands with creators having verified audience demographics.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xs text-stone-900 dark:text-white mb-4 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs text-stone-500 dark:text-stone-400 font-medium">
              <li><Link to="/campaigns" className="hover:text-orange-600">Browse Campaigns</Link></li>
              <li><Link to="/features" className="hover:text-orange-600">Audience Matching</Link></li>
              <li><Link to="/pricing" className="hover:text-orange-600">Pricing Plans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs text-stone-900 dark:text-white mb-4 uppercase tracking-wider">Brands</h4>
            <ul className="space-y-2 text-xs text-stone-500 dark:text-stone-400 font-medium">
              <li><Link to="/signup?role=brand" className="hover:text-orange-600">Post Requirement</Link></li>
              <li><Link to="/brand/dashboard" className="hover:text-orange-600">Brand Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs text-stone-900 dark:text-white mb-4 uppercase tracking-wider">Creators</h4>
            <ul className="space-y-2 text-xs text-stone-500 dark:text-stone-400 font-medium">
              <li><Link to="/signup?role=influencer" className="hover:text-orange-600">Join as Creator</Link></li>
              <li><Link to="/influencer/dashboard" className="hover:text-orange-600">Creator Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} CreatorCart. College Project Build.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
