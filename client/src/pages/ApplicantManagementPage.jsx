import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../components/layout/Sidebar';
import { StatusBadge, MatchBadge, VerificationBadge } from '../components/common/Badge';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import { EmptyState } from '../components/common/EmptyState';
import {
  Users,
  CheckCircle2,
  XCircle,
  Bookmark,
  MessageSquare,
  ArrowLeft,
  DollarSign,
  Briefcase
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ApplicantManagementPage() {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState(null);
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchApplicants();
  }, [campaignId]);

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/applications/campaign/${campaignId}`);
      if (res.data.success) {
        setCampaign(res.data.campaign);
        setApplications(res.data.applications);
      }
    } catch (e) {
      toast.error('Failed to load campaign applicants');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      const res = await api.put(`/applications/${appId}/status`, { status: newStatus });
      if (res.data.success) {
        toast.success(`Application marked as ${newStatus}`);
        setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
      }
    } catch (e) {
      toast.error('Failed to update applicant status');
    }
  };

  const filteredApps = statusFilter === 'all'
    ? applications
    : applications.filter(a => a.status === statusFilter);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} /> Back to Campaigns
        </button>

        {/* CAMPAIGN TITLE BAR */}
        <div className="card-creator p-6 space-y-2">
          <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">Applicant Management</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {campaign?.title || 'Campaign Applicants'}
          </h1>
          <p className="text-xs text-slate-400">Total Applicants: {applications.length} creators</p>
        </div>

        {/* STATUS FILTER TABS */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          {['all', 'pending', 'shortlisted', 'accepted', 'rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`capitalize text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                statusFilter === st
                  ? 'bg-[#6C63FF] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {st} ({st === 'all' ? applications.length : applications.filter(a => a.status === st).length})
            </button>
          ))}
        </div>

        {/* APPLICANTS GRID / LIST */}
        {loading ? (
          <div className="space-y-4">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : filteredApps.length === 0 ? (
          <EmptyState
            title="No applicants found"
            description="No creator applications match the selected filter."
          />
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app) => (
              <div key={app.id} className="card-creator p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <img src={app.influencerAvatar} alt={app.influencerName} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#6C63FF]/20" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-base text-slate-900 dark:text-white">{app.influencerName}</h4>
                        <VerificationBadge />
                      </div>
                      <p className="text-xs text-slate-400 font-medium">{app.influencerHandle}</p>
                      {app.influencerProfile && (
                        <p className="text-[11px] text-[#6C63FF] font-semibold mt-0.5">
                          {app.influencerProfile.niche} • {(app.influencerProfile.metrics?.totalFollowers / 1000).toFixed(0)}K Followers • {app.influencerProfile.metrics?.engagementRate}% Eng Rate
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MatchBadge score={app.matchScore || 90} />
                    <StatusBadge status={app.status} />
                  </div>
                </div>

                {/* PITCH NOTE */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Creator Pitch Note</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                    "{app.pitch}"
                  </p>
                </div>

                {/* RATE & DELIVERABLES */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
                  <div>
                    <span className="text-slate-400">Proposed Compensation: </span>
                    <span className="font-black text-slate-900 dark:text-white text-sm">${app.proposedRate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Deliverables: </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{app.deliverablesProposed}</span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to="/messages"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6C63FF] hover:underline"
                  >
                    <MessageSquare size={15} /> Message Creator
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateStatus(app.id, 'shortlisted')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        app.status === 'shortlisted' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-[#6C63FF] hover:bg-purple-100'
                      }`}
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(app.id, 'rejected')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        app.status === 'rejected' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      }`}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(app.id, 'accepted')}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                        app.status === 'accepted' ? 'bg-emerald-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      Accept Application
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
