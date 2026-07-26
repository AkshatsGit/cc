import React from 'react';
import { Inbox, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EmptyState({ title = "No items found", description = "Try adjusting your filters or check back later.", actionText, actionLink, onAction }) {
  return (
    <div className="card-creator p-12 text-center flex flex-col items-center justify-center my-6">
      <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] flex items-center justify-center mb-4">
        <Inbox size={32} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">{description}</p>
      {actionText && actionLink && (
        <Link to={actionLink} className="inline-flex items-center gap-2 bg-[#6C63FF] hover:bg-[#5A52E0] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md">
          <Sparkles size={16} />
          {actionText}
        </Link>
      )}
      {actionText && onAction && !actionLink && (
        <button onClick={onAction} className="inline-flex items-center gap-2 bg-[#6C63FF] hover:bg-[#5A52E0] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md">
          <Sparkles size={16} />
          {actionText}
        </button>
      )}
    </div>
  );
}
