import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export function VerificationBadge({ size = 15, className = "" }) {
  return (
    <span className={`inline-flex items-center text-teal-600 dark:text-teal-400 ${className}`} title="Verified Account">
      <CheckCircle2 size={size} className="fill-teal-600 dark:fill-teal-500 text-white" />
    </span>
  );
}

export function MatchBadge({ score, reasons = [] }) {
  let color = "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800";
  if (score < 80 && score >= 70) {
    color = "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800";
  } else if (score < 70) {
    color = "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800";
  }

  return (
    <div className="group relative inline-block">
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${color}`}>
        <Sparkles size={12} className="animate-pulse text-amber-500" />
        {score}% Match
      </span>
      {reasons.length > 0 && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-stone-900 text-white text-xs rounded-xl p-2.5 shadow-xl pointer-events-none z-50">
          <p className="font-semibold text-orange-400 mb-1">Match Reasons:</p>
          <ul className="space-y-0.5 list-disc list-inside text-[11px] text-stone-300">
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
    active: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
    accepted: "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800",
    pending: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
    shortlisted: "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800",
    rejected: "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800",
    completed: "bg-stone-100 text-stone-800 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700",
    closed: "bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-400"
  };

  const current = styles[status] || styles.active;

  return (
    <span className={`capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current}`}>
      {status}
    </span>
  );
}
