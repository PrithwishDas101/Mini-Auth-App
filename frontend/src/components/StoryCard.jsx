import React from 'react';
import { Link } from 'react-router-dom';

/**
 * StoryCard - Displays story summary in feed grid
 * Shows title, author, excerpt, and publication date
 */
const StoryCard = ({ story }) => {
  if (!story) return null;

  const {
    _id,
    title,
    content,
    author: authorName,
    authorId,
    createdAt,
  } = story;

  // Create excerpt from content (first 150 characters)
  const excerpt = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 150)
    .concat(content.length > 150 ? '...' : '');

  // Format date
  const publishDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      to={`/story/${_id}`}
      className="group bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 h-full flex flex-col"
    >
      {/* Title - Using display font for editorial feel */}
      <h2 className="font-display text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-3 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition">
        {title}
      </h2>

      {/* Excerpt */}
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
        {excerpt}
      </p>

      {/* Author and Date */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="text-sm">
          <p className="text-slate-500 dark:text-slate-400">By</p>
          <Link
            to={`/author/${authorId}`}
            onClick={(e) => e.stopPropagation()}
            className="text-slate-900 dark:text-white font-medium hover:text-slate-700 dark:hover:text-slate-200 transition"
          >
            {authorName || 'Unknown'}
          </Link>
        </div>
        <time className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          {publishDate}
        </time>
      </div>
    </Link>
  );
};

export default StoryCard;
