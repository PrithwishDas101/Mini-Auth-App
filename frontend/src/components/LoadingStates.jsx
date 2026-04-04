import React from 'react';

/**
 * Skeleton Loaders - Display placeholder content while loading
 * Improves perceived performance
 */

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 animate-pulse">
    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4" />
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-3" />
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-4" />
    <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mt-4" />
  </div>
);

export const SkeletonParagraph = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-3" />
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-3" />
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/5 mb-3" />
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
  </div>
);

export const SkeletonGrid = ({ count = 12 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const SkeletonList = ({ count = 5 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 p-4 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
        </div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mt-2" />
      </div>
    ))}
  </div>
);

/**
 * Loading Spinner - Animated loading indicator
 */
export const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} border-2 border-slate-300 dark:border-slate-600 border-t-slate-900 dark:border-t-slate-100 rounded-full animate-spin`} />
      {message && <p className="text-slate-600 dark:text-slate-400 text-sm">{message}</p>}
    </div>
  );
};

export default {
  SkeletonCard,
  SkeletonParagraph,
  SkeletonGrid,
  SkeletonList,
  LoadingSpinner,
};
