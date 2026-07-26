import React from 'react';

export function CardSkeleton() {
  return (
    <div className="card-creator p-6 animate-pulse space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
        </div>
      </div>
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
      <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-20"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-28"></div>
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-slate-100 dark:border-slate-800">
      <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-28"></div></td>
      <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div></td>
      <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div></td>
      <td className="p-4"><div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-24"></div></td>
      <td className="p-4"><div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-16"></div></td>
    </tr>
  );
}
