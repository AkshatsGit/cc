import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export function VerificationBadge({ size = 15, className = "" }) {
  return (
    <span className={`inline-flex items-center text-blue-400 ${className}`} title="Verified Account">
      <CheckCircle2 size={size} className="fill-blue-500 text-slate-900" />
    </span>
  );
}

export function MatchBadge({ score, reasons = [] }) {
  let color = "bg-blue-950/80 text-blue-300 border-blue-800";
  if (score < 80 && score >= 70) {
    color = "bg-sky-950/80 text-sky-300 border-sky-800";
  } else if (score < 70) {
    color = "bg-amber-950/80 text-amber-300 border-amber-800";
  }

  return (
    <div className="group relative inline-block">
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${color}`}>
        <Sparkles size={12} className="animate-pulse text-blue-400" />
        {score}% Match
      </span>
      {reasons.length > 0 && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-xs rounded-xl p-2.5 border border-slate-700 shadow-xl pointer-events-none z-50">
          <p className="font-semibold text-blue-400 mb-1">Match Reasons:</p>
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
    active: "bg-emerald-950/80 text-emerald-300 border-emerald-800",
    accepted: "bg-blue-950/80 text-blue-300 border-blue-800",
    pending: "bg-amber-950/80 text-amber-300 border-amber-800",
    shortlisted: "bg-sky-950/80 text-sky-300 border-sky-800",
    rejected: "bg-rose-950/80 text-rose-300 border-rose-800",
    completed: "bg-slate-800 text-slate-300 border-slate-700",
    closed: "bg-slate-800 text-slate-400 border-slate-700"
  };

  const current = styles[status] || styles.active;

  return (
    <span className={`capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current}`}>
      {status}
    </span>
  );
}
