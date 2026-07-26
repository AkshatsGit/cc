import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export function VerificationBadge({ size = 16, className = "" }) {
  return (
    <span className={`inline-flex items-center text-[#6C63FF] ${className}`} title="Verified Account">
      <CheckCircle2 size={size} className="fill-[#6C63FF] text-white" />
    </span>
  );
}

export function MatchBadge({ score, reasons = [] }) {
  let color = "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800";
  if (score < 80 && score >= 70) {
    color = "bg-purple-100 text-[#6C63FF] border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800";
  } else if (score < 70) {
    color = "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800";
  }

  return (
    <div className="group relative inline-block">
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${color} shadow-xs`}>
        <Sparkles size={13} className="animate-pulse" />
        {score}% Match
      </span>
      {reasons.length > 0 && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-xs rounded-xl p-2.5 shadow-xl pointer-events-none z-50">
          <p className="font-semibold text-purple-300 mb-1">Match Reasons:</p>
          <ul className="space-y-0.5 list-disc list-inside text-[11px] text-slate-300">
            {reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400",
    accepted: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400",
    pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400",
    shortlisted: "bg-purple-50 text-[#6C63FF] border-purple-200 dark:bg-purple-950/40 dark:text-purple-300",
    rejected: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400",
    completed: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400",
    closed: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400"
  };

  const current = styles[status] || styles.active;

  return (
    <span className={`capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current}`}>
      {status}
    </span>
  );
}
