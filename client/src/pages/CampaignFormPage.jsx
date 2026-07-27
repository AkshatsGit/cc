import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../components/layout/Sidebar';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CampaignFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Beauty & Skincare',
    budget: 1800,
    requiredFollowers: 25000,
    preferredPlatform: 'TikTok',
    targetAudience: 'Gen Z (18-24 y/o)',
    deliverables: ['1 TikTok GRWM Video (30-60s) showing sunscreen application', '2 Instagram Stories with product tag & link'],
    deadline: '2026-08-30',
    location: 'United States',
    tags: ['GenZ', 'Sunscreen', 'SPF50']
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
        toast.success(isEditing ? 'Campaign updated!' : 'Campaign published successfully!');
        navigate('/brand/dashboard');
      }
    } catch (err) {
      toast.error('Failed to save campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#0F172A]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 max-w-4xl space-y-6 text-slate-100">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="card-creator p-6 sm:p-8 space-y-6">
          <div>
            <h1 className="text-xl font-black text-white">
              {isEditing ? 'Edit Marketing Campaign' : 'Post Campaign Requirement'}
            </h1>
            <p className="text-xs text-slate-400">Describe your product (e.g., SPF 50 sunscreen), Gen Z target audience, and deliverables budget.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Campaign Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Aura SPF 50 Daily Sunscreen GenZ TikTok Campaign"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Campaign Requirement Brief</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your product application, Gen Z skin benefits, GRWM style, and tone..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Category / Niche</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Beauty & Skincare">Beauty & Skincare</option>
                  <option value="Tech & Gadgets">Tech & Gadgets</option>
                  <option value="Fitness & Health">Fitness & Health</option>
                  <option value="Fashion">Fashion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Preferred Platform</label>
                <select
                  value={formData.preferredPlatform}
                  onChange={(e) => setFormData({ ...formData, preferredPlatform: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Deliverables Budget ($)</label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Minimum Followers</label>
                <input
                  type="number"
                  value={formData.requiredFollowers}
                  onChange={(e) => setFormData({ ...formData, requiredFollowers: Number(e.target.value) })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            {/* DELIVERABLES */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Deliverables Required</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  placeholder="e.g. 1 TikTok GRWM Video (30-60s)"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Plus size={16} /> Add
                </button>
              </div>

              <div className="space-y-1.5">
                {formData.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl text-xs border border-slate-700">
                    <span className="text-slate-200">• {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDeliverable(idx)}
                      className="text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-xs transition-all shadow-md shadow-blue-600/30"
            >
              {loading ? 'Saving Campaign...' : isEditing ? 'Update Campaign' : 'Publish Requirement'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
