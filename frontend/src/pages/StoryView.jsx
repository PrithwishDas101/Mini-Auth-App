import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getStoryById, deleteStory } from '../api/storyService.js';
import { getErrorMessage, logError } from '../api/errors.js';
import Alert, { Button } from '../components/Alert.jsx';
import { LoadingSpinner } from '../components/LoadingStates.jsx';

/**
 * StoryView - Single story reading page
 * Optimized for long-form reading with editorial typography
 */
const StoryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadStory = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getStoryById(id);
        setStory(data);
      } catch (err) {
        logError(err, 'StoryView: loadStory');
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(true);
      await deleteStory(id);
      navigate('/');
    } catch (err) {
      logError(err, 'StoryView: deleteStory');
      setError(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  // Check ownership for edit/delete controls
  const isOwner = user && story && user.id === story.authorId;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <LoadingSpinner message="Loading story..." />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 inline-flex items-center gap-2"
          >
            ← Back to Stories
          </Link>
          <Alert
            message={error || 'Story not found'}
            type="error"
          />
        </div>
      </div>
    );
  }

  const publishDate = new Date(story.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Story Container - Editorial reading width */}
      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Link */}
        <Link
          to="/"
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm mb-8 inline-flex items-center gap-2 transition"
        >
          ← Back to Stories
        </Link>

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

        {/* Story Header */}
        <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
          {/* Title - Display font for editorial feel */}
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            {story.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <p className="mb-1">By <span className="font-medium text-slate-900 dark:text-white">{story.author}</span></p>
              <time dateTime={story.createdAt} className="font-mono">
                {publishDate}
              </time>
            </div>

            {/* Ownership Controls */}
            {isOwner && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={() => navigate(`/edit/${id}`)}
                  variant="secondary"
                  size="sm"
                >
                  ✎ Edit
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="danger"
                  size="sm"
                  loading={deleting}
                >
                  🗑 Delete
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Story Content - Prose styling for readability */}
        <div className="prose dark:prose-invert prose-sm md:prose-base max-w-none mb-12">
          <div
            className="text-slate-800 dark:text-slate-200 leading-8 text-base md:text-lg space-y-4"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
        </div>

        {/* Author Info Footer */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Written by</p>
            <Link
              to={`/author/${story.authorId}`}
              className="inline-block"
            >
              <div className="text-lg font-semibold text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-200 transition">
                {story.author}
              </div>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default StoryView;
