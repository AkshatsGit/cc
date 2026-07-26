import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import { VerificationBadge } from '../components/common/Badge';
import {
  User,
  Briefcase,
  Megaphone,
  Globe,
  MapPin,
  Mail,
  Phone,
  DollarSign,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Video,
  Tv,
  Share2
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, profile, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  // Brand profile fields
  const [brandForm, setBrandForm] = useState({
    companyName: '',
    logo: '',
    industry: '',
    website: '',
    about: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: ''
  });

  // Influencer profile fields
  const [influencerForm, setInfluencerForm] = useState({
    fullName: '',
    username: '',
    bio: '',
    niche: 'Tech & Gadgets',
    country: 'United States',
    languages: ['English'],
    socialMedia: {
      instagram: { handle: '', followers: 0, link: '' },
      youtube: { handle: '', subscribers: 0, link: '' },
      tiktok: { handle: '', followers: 0, link: '' },
      linkedIn: { handle: '', followers: 0, link: '' }
    },
    metrics: {
      totalFollowers: 100000,
      averageReach: 25000,
      engagementRate: 4.5,
      averageViews: 20000
    },
    pricing: {
      story: 200,
      reel: 600,
      post: 450,
      shorts: 500,
      dedicatedVideo: 1500
    },
    portfolio: []
  });

  useEffect(() => {
    fetchProfileData();
  }, [user]);

  const fetchProfileData = async () => {
    if (!user) return;
    try {
      if (user.role === 'brand') {
        const res = await api.get(`/brands/profile/${user.id}`);
        if (res.data.success && res.data.brand) {
          setBrandForm(res.data.brand);
        }
      } else if (user.role === 'influencer') {
        const res = await api.get(`/influencers/profile/${user.id}`);
        if (res.data.success && res.data.influencer) {
          setInfluencerForm(res.data.influencer);
        }
      }
    } catch (e) {
      console.warn('Using local profile data fallback');
    }
  };

  const handleSaveBrand = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put('/brands/profile', brandForm);
      if (res.data.success) {
        toast.success('Brand profile updated successfully');
        setProfile(res.data.brand);
      }
    } catch (err) {
      toast.error('Failed to update brand profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveInfluencer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put('/influencers/profile', influencerForm);
      if (res.data.success) {
        toast.success('Creator profile & rate card updated');
        setProfile(res.data.influencer);
      }
    } catch (err) {
      toast.error('Failed to update creator profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Profile Settings & Media Kit</h1>
            <p className="text-xs text-slate-500">Manage public credentials, social media metrics, and deliverable rate cards.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] text-xs font-bold border border-purple-200 dark:border-purple-800">
            <CheckCircle2 size={14} /> Role: {user?.role?.toUpperCase()}
          </span>
        </div>

        {/* BRAND PROFILE FORM */}
        {user?.role === 'brand' && (
          <form onSubmit={handleSaveBrand} className="card-creator p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Company Brand Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                <input
                  type="text"
                  value={brandForm.companyName}
                  onChange={(e) => setBrandForm({ ...brandForm, companyName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Industry</label>
                <input
                  type="text"
                  value={brandForm.industry}
                  onChange={(e) => setBrandForm({ ...brandForm, industry: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Logo Image URL</label>
              <input
                type="text"
                value={brandForm.logo}
                onChange={(e) => setBrandForm({ ...brandForm, logo: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">About Company</label>
              <textarea
                rows={4}
                value={brandForm.about}
                onChange={(e) => setBrandForm({ ...brandForm, about: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={brandForm.contactPerson}
                  onChange={(e) => setBrandForm({ ...brandForm, contactPerson: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={brandForm.email}
                  onChange={(e) => setBrandForm({ ...brandForm, email: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={brandForm.location}
                  onChange={(e) => setBrandForm({ ...brandForm, location: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#6C63FF] hover:bg-[#5A52E0] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-purple-500/20 flex items-center gap-2"
            >
              <Save size={16} /> Save Brand Profile
            </button>
          </form>
        )}

        {/* INFLUENCER PROFILE FORM */}
        {(user?.role === 'influencer' || user?.role === 'admin') && (
          <form onSubmit={handleSaveInfluencer} className="space-y-6">
            {/* Bio & Basics */}
            <div className="card-creator p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Creator Bio & Identity</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={influencerForm.fullName}
                    onChange={(e) => setInfluencerForm({ ...influencerForm, fullName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Username Handle</label>
                  <input
                    type="text"
                    value={influencerForm.username}
                    onChange={(e) => setInfluencerForm({ ...influencerForm, username: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Bio / Media Kit Summary</label>
                <textarea
                  rows={3}
                  value={influencerForm.bio}
                  onChange={(e) => setInfluencerForm({ ...influencerForm, bio: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Niche</label>
                  <select
                    value={influencerForm.niche}
                    onChange={(e) => setInfluencerForm({ ...influencerForm, niche: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm"
                  >
                    <option value="Tech & Gadgets">Tech & Gadgets</option>
                    <option value="Beauty & Skincare">Beauty & Skincare</option>
                    <option value="Fitness & Health">Fitness & Health</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Travel">Travel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Country</label>
                  <input
                    type="text"
                    value={influencerForm.country}
                    onChange={(e) => setInfluencerForm({ ...influencerForm, country: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="card-creator p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Audience Metrics</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Total Followers</label>
                  <input
                    type="number"
                    value={influencerForm.metrics?.totalFollowers || 0}
                    onChange={(e) => setInfluencerForm({
                      ...influencerForm,
                      metrics: { ...influencerForm.metrics, totalFollowers: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Avg Reach</label>
                  <input
                    type="number"
                    value={influencerForm.metrics?.averageReach || 0}
                    onChange={(e) => setInfluencerForm({
                      ...influencerForm,
                      metrics: { ...influencerForm.metrics, averageReach: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Eng Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={influencerForm.metrics?.engagementRate || 0}
                    onChange={(e) => setInfluencerForm({
                      ...influencerForm,
                      metrics: { ...influencerForm.metrics, engagementRate: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Avg Views</label>
                  <input
                    type="number"
                    value={influencerForm.metrics?.averageViews || 0}
                    onChange={(e) => setInfluencerForm({
                      ...influencerForm,
                      metrics: { ...influencerForm.metrics, averageViews: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Deliverable Pricing Rate Card */}
            <div className="card-creator p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Deliverables Rate Card ($)</h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Story ($)</label>
                  <input
                    type="number"
                    value={influencerForm.pricing?.story || 0}
                    onChange={(e) => setInfluencerForm({
                      ...influencerForm,
                      pricing: { ...influencerForm.pricing, story: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-[#6C63FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Reel ($)</label>
                  <input
                    type="number"
                    value={influencerForm.pricing?.reel || 0}
                    onChange={(e) => setInfluencerForm({
                      ...influencerForm,
                      pricing: { ...influencerForm.pricing, reel: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-[#6C63FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Post ($)</label>
                  <input
                    type="number"
                    value={influencerForm.pricing?.post || 0}
                    onChange={(e) => setInfluencerForm({
                      ...influencerForm,
                      pricing: { ...influencerForm.pricing, post: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-[#6C63FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Shorts ($)</label>
                  <input
                    type="number"
                    value={influencerForm.pricing?.shorts || 0}
                    onChange={(e) => setInfluencerForm({
                      ...influencerForm,
                      pricing: { ...influencerForm.pricing, shorts: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-[#6C63FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Dedicated Video ($)</label>
                  <input
                    type="number"
                    value={influencerForm.pricing?.dedicatedVideo || 0}
                    onChange={(e) => setInfluencerForm({
                      ...influencerForm,
                      pricing: { ...influencerForm.pricing, dedicatedVideo: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-[#6C63FF]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#6C63FF] hover:bg-[#5A52E0] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md shadow-purple-500/20 flex items-center gap-2"
            >
              <Save size={16} /> Save Creator Profile & Rate Card
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
