import React from 'react';
import { Sparkles, ShieldCheck, Zap, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] font-semibold text-xs">
          <Sparkles size={14} /> Our Mission
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Reinventing Influencer Marketing for Visionary Brands & Creators
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
          Creator Cart is built on transparency, AI-powered niche scoring, and instant contract execution to make brand collaborations seamless and profitable for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card-creator p-6 space-y-3">
          <ShieldCheck size={28} className="text-[#6C63FF]" />
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">100% Vetted Creators</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Every influencer profile undergoes follower authenticity checks and engagement rate verification.</p>
        </div>
        <div className="card-creator p-6 space-y-3">
          <Zap size={28} className="text-[#6C63FF]" />
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">AI Match Score</h3>
          <p className="text-xs text-slate-500 leading-relaxed">7-point recommendation engine calculating niche alignment, audience reach, and rate card compatibility.</p>
        </div>
        <div className="card-creator p-6 space-y-3">
          <Award size={28} className="text-[#6C63FF]" />
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Zero Placement Markup</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Direct connection between brand marketers and creators without middleman agency commissions.</p>
        </div>
      </div>
    </div>
  );
}
