import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { MatchBadge, StatusBadge, VerificationBadge } from '../components/common/Badge';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import {
  CheckCircle2,
  Send,
  X,
  ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState(null);
  const [brand, setBrand] = useState(null);
  const [matchInfo, setMatchInfo] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);

  // Application Modal state
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [pitch, setPitch] = useState('');
  const [proposedRate, setProposedRate] = useState('');
  const [deliverablesProposed, setDeliverablesProposed] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCampaignDetails();
  }, [id]);

  const fetchCampaignDetails = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/campaigns/${id}`);
      if (res.data.success) {
        setCampaign(res.data.campaign);
        setBrand(res.data.brand);
        setMatchInfo(res.data.matchInfo);
        setHasApplied(res.data.hasApplied);
        setProposedRate(res.data.campaign.budget || '');
      }
    } catch (e) {
      toast.error('Campaign not found');
      navigate('/campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!pitch) return toast.error('Please write a pitch to the brand');
    setSubmitting(true);
    try {
      const res = await api.post('/applications/apply', {
        campaignId: id,
        pitch,
        proposedRate: Number(proposedRate) || campaign.budget,
        deliverablesProposed: deliverablesProposed || campaign.deliverables.join(', ')
      });

      if (res.data.success) {
        toast.success('Application submitted successfully!');
        setHasApplied(true);
        setApplyModalOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} /> Back to Campaigns
      </button>

      {/* HEADER CARD */}
      <div className="card-creator p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-700">
          <div className="flex items-center gap-4">
            <img src={brand?.logo || campaign.brandLogo} alt={campaign.brandName} className="w-14 h-14 rounded-xl object-cover ring-1 ring-blue-500" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">{brand?.companyName || campaign.brandName}</h3>
                <VerificationBadge />
              </div>
              <p className="text-xs text-slate-300 font-medium">{brand?.industry || 'Brand Advertiser'}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">📍 {campaign.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {matchInfo && <MatchBadge score={matchInfo.score} reasons={matchInfo.reasons} />}
            <StatusBadge status={campaign.status} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {campaign.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-xl bg-blue-950/80 text-blue-300 font-bold border border-blue-800">
              💰 Budget: ${campaign.budget}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
              📂 Category: {campaign.category}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
              🎯 Platform: {campaign.preferredPlatform}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
              👥 Min Followers: {(campaign.requiredFollowers / 1000).toFixed(0)}K
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
              📅 Deadline: {campaign.deadline}
            </span>
          </div>
        </div>

        {/* APPLY BUTTON BAR */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Campaign Status</p>
            <p className="text-sm font-bold text-white">
              {hasApplied ? '✅ Application Submitted' : 'Accepting Proposals from Gen Z Creators'}
            </p>
          </div>

          {user?.role === 'influencer' && (
            <button
              onClick={() => {
                if (hasApplied) {
                  toast.error('You have already applied to this campaign');
                } else {
                  setApplyModalOpen(true);
                }
              }}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                hasApplied
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
              }`}
            >
              <Send size={15} />
              {hasApplied ? 'Already Applied' : 'Submit Proposal'}
            </button>
          )}

          {user?.role === 'brand' && user.id === campaign.brandId && (
            <Link
              to={`/brand/campaigns/${campaign.id}/applicants`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs"
            >
              Manage Applicants ({campaign.applicationsCount || 0})
            </Link>
          )}
        </div>
      </div>

      {/* DESCRIPTION & DELIVERABLES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-creator p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Campaign Brief & Requirements</h3>
            <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-line">
              {campaign.description}
            </p>
          </div>

          <div className="card-creator p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Deliverables Required</h3>
            <ul className="space-y-2">
              {campaign.deliverables?.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BRAND SIDEBAR INFO */}
        <div className="space-y-6">
          <div className="card-creator p-6 space-y-3">
            <h3 className="text-base font-bold text-white">About the Brand</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{brand?.about || 'Formulating non-greasy SPF 50 sunscreen for Gen Z.'}</p>

            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-700">
              <p><span className="font-bold text-white">Website:</span> <a href={brand?.website} target="_blank" rel="noreferrer" className="text-blue-400 underline">{brand?.website || 'auraskincare.com'}</a></p>
              <p><span className="font-bold text-white">Contact:</span> {brand?.contactPerson || 'Elena Vance'}</p>
              <p><span className="font-bold text-white">Location:</span> {brand?.location || 'Los Angeles, CA'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* APPLICATION PROPOSAL MODAL */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="card-creator p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative bg-slate-900 border border-slate-700 text-white">
            <button
              onClick={() => setApplyModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Apply to Campaign</h3>
              <p className="text-xs text-slate-400">Submit your pitch and deliverables proposal to Aura Skincare.</p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Proposed Rate ($)</label>
                <input
                  type="number"
                  value={proposedRate}
                  onChange={(e) => setProposedRate(e.target.value)}
                  placeholder={campaign.budget}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Pitch Note</label>
                <textarea
                  rows={4}
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  placeholder="Tell Aura Skincare why your Gen Z audience matches this daily sunscreen GRWM launch..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
