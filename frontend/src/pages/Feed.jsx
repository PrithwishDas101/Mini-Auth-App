import React, { useState, useEffect } from 'react';
import { getStories } from '../api/storyService.js';
import { getErrorMessage, logError } from '../api/errors.js';
import StoryCard from '../components/StoryCard.jsx';
import Alert from '../components/Alert.jsx';
import { SkeletonGrid, LoadingSpinner } from '../components/LoadingStates.jsx';

/**
 * Feed Page - Display all published stories in a grid
 * Public access - anyone can read
 */
const Feed = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const STORIES_PER_PAGE = 12;

  // Load stories on mount and when page changes
  useEffect(() => {
    const loadStories = async () => {
      try {
        setLoading(true);
        setError('');
        
        const data = await getStories(page, STORIES_PER_PAGE, '-createdAt');
        
        setStories(data.stories || []);
        setTotalPages(data.pages || 1);
      } catch (err) {
        logError(err, 'Feed: loadStories');
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadStories();
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            Tales
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Discover stories from writers around the world
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error Alert */}
        {error && (
          <Alert 
            message={error} 
            type="error" 
            dismissible 
            onDismiss={() => setError('')}
            className="mb-8"
          />
        )}

        {/* Loading State */}
        {loading ? (
          <div>
            <SkeletonGrid count={STORIES_PER_PAGE} />
          </div>
        ) : stories.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
              No stories yet. Be the first to write one!
            </p>
          </div>
        ) : (
          // Stories Grid
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {stories.map((story) => (
                <StoryCard key={story._id} story={story} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                
                <div className="text-slate-600 dark:text-slate-400 text-sm">
                  Page <span className="font-medium">{page}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </div>
                
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Feed;
