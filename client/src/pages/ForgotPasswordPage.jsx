import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email address');
    setSent(true);
    toast.success('Password reset instructions sent to your email!');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 card-creator p-8 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-purple items-center justify-center text-white shadow-lg mb-2">
            <Sparkles size={24} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Reset Password
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Enter your registered email address to receive password reset instructions.
          </p>
        </div>

        {sent ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-3">
            <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
              Reset Link Sent!
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              We sent an email to <span className="font-bold">{email}</span> with instructions to reset your password.
            </p>
            <Link to="/login" className="inline-block text-xs font-bold text-[#6C63FF] hover:underline pt-2">
              Return to Login
            </Link>
          </div>
        ) : (
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

            <button
              type="submit"
              className="w-full bg-[#6C63FF] hover:bg-[#5A52E0] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-purple-500/20 flex items-center justify-center gap-2"
            >
              Send Reset Link <ArrowRight size={16} />
            </button>
          </form>
        )}

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Remembered your password?{' '}
          <Link to="/login" className="text-[#6C63FF] font-bold hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
