import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, User, Briefcase, Megaphone, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialRole = searchParams.get('role') || 'brand';
  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      return toast.error('Please complete all registration fields');
    }
    const user = await signup(email, password, name, role);
    if (user) {
      if (role === 'brand') navigate('/brand/dashboard');
      else navigate('/influencer/dashboard');
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
            Create Your Account
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Join Creator Cart as a Brand or Social Media Influencer.
          </p>
        </div>

        {/* ROLE SELECTION */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('brand')}
            className={`py-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
              role === 'brand' ? 'bg-[#6C63FF] text-white shadow-md' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Briefcase size={16} /> Brand / Agency
          </button>
          <button
            type="button"
            onClick={() => setRole('influencer')}
            className={`py-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
              role === 'influencer' ? 'bg-[#6C63FF] text-white shadow-md' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Megaphone size={16} /> Creator / Influencer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {role === 'brand' ? 'Company / Brand Name' : 'Full Name'}
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'brand' ? 'Acme Inc.' : 'Jane Doe'}
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#6C63FF]"
              />
            </div>
          </div>

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
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#6C63FF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6C63FF] hover:bg-[#5A52E0] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-purple-500/20 flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Account...' : `Register as ${role.toUpperCase()}`}
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-[#6C63FF] font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
