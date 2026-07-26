import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../components/layout/Sidebar';
import { Megaphone, Plus, Trash2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CampaignFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tech & Gadgets',
    budget: 1500,
    requiredFollowers: 25000,
    preferredPlatform: 'Instagram',
    deliverables: ['1 Reel (60s)', '2 Instagram Stories'],
    deadline: '2026-09-30',
    location: 'Global / Worldwide',
    tags: ['Tech', 'Sponsorship']
  });

  const [newDeliverable, setNewDeliverable] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchCampaignToEdit();
    }
  }, [id]);

  const fetchCampaignToEdit = async () => {
    try {
      const res = await api.get(`/campaigns/${id}`);
      if (res.data.success) {
        setFormData(res.data.campaign);
      }
    } catch (e) {
      toast.error('Failed to load campaign data');
    }
  };

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return;
    setFormData(prev => ({
      ...prev,
      deliverables: [...prev.deliverables, newDeliverable.trim()]
    }));
    setNewDeliverable('');
  };

  const handleRemoveDeliverable = (index) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      return toast.error('Please enter campaign title and description');
    }

    setLoading(true);
    try {
      let res;
      if (isEditing) {
        res = await api.put(`/campaigns/${id}`, formData);
      } else {
        res = await api.post('/campaigns', formData);
      }

      if (res.data.success) {
        toast.success(isEditing ? 'Campaign updated!' : 'Campaign created successfully!');
        navigate('/brand/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 max-w-4xl space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="card-creator p-6 sm:p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              {isEditing ? 'Edit Marketing Campaign' : 'Create New Campaign'}
            </h1>
            <p className="text-xs text-slate-500">Fill in campaign parameters to broadcast your sponsorship offer to creators.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Campaign Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Launch Campaign: ANC Studio Headphones v2"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#6C63FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Campaign Brief & Description</label>
              <textarea
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your brand goals, target aesthetic, unboxing details, and content tone..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#6C63FF]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Category / Niche</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none"
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
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Preferred Platform</label>
                <select
                  value={formData.preferredPlatform}
                  onChange={(e) => setFormData({ ...formData, preferredPlatform: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Budget ($)</label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#6C63FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Minimum Required Followers</label>
                <input
                  type="number"
                  value={formData.requiredFollowers}
                  onChange={(e) => setFormData({ ...formData, requiredFollowers: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#6C63FF]"
                />
              </div>
            </div>

            {/* DELIVERABLES MANAGER */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Deliverables Checklist</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  placeholder="e.g. 1 Instagram Reel with brand swipe-up link"
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="bg-[#6C63FF] hover:bg-[#5A52E0] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Plus size={16} /> Add
                </button>
              </div>

              <div className="space-y-2">
                {formData.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs font-semibold">
                    <span>• {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDeliverable(idx)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Deadline Date</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Target Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Global, US, UK, Canada"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6C63FF] hover:bg-[#5A52E0] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-purple-500/20"
            >
              {loading ? 'Saving Campaign...' : isEditing ? 'Update Campaign' : 'Publish Campaign'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
