import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight, Briefcase, Megaphone } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('brand');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please fill in all fields');
    }
    const user = await login(email, password, role);
    if (user) {
      if (user.role === 'brand') navigate('/brand/dashboard');
      else if (user.role === 'influencer') navigate('/influencer/dashboard');
      else navigate('/admin/dashboard');
    }
  };

  const handleQuickDemoLogin = async (demoRole) => {
    setRole(demoRole);
    let demoEmail = 'collabs@techpulse.com';
    if (demoRole === 'influencer') demoEmail = 'alex.tech@creators.com';
    if (demoRole === 'admin') demoEmail = 'admin@creatorcart.com';

    const user = await login(demoEmail, 'password123', demoRole);
    if (user) {
      if (user.role === 'brand') navigate('/brand/dashboard');
      else if (user.role === 'influencer') navigate('/influencer/dashboard');
      else navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 card-creator p-8 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-purple items-center justify-center text-white shadow-lg mb-2">
            <Sparkles size={24} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome back
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Sign in to manage your campaigns and collaborations.
          </p>
        </div>

        {/* ROLE SELECTION */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('brand')}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              role === 'brand' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Briefcase size={14} /> Brand Login
          </button>
          <button
            type="button"
            onClick={() => setRole('influencer')}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              role === 'influencer' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Megaphone size={14} /> Creator Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#6C63FF]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
              <Link to="/forgot-password" className="text-xs text-[#6C63FF] hover:underline font-medium">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#6C63FF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6C63FF] hover:bg-[#5A52E0] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-purple-500/20 flex items-center justify-center gap-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* DEMO QUICK PRESETS */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Instant Demo Mode Sign In</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleQuickDemoLogin('brand')}
              className="text-xs font-semibold px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              Demo Brand
            </button>
            <button
              onClick={() => handleQuickDemoLogin('influencer')}
              className="text-xs font-semibold px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              Demo Influencer
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="text-xs font-semibold px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-lg border border-amber-200 dark:border-amber-800"
            >
              Demo Admin
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#6C63FF] font-bold hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
