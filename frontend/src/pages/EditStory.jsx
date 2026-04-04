import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getStoryById, updateStory } from '../api/storyService.js';
import { updateStorySchema } from '../api/schemas.js';
import { getErrorMessage, logError, formatValidationErrors } from '../api/errors.js';
import Alert, { FormField, Button, Card } from '../components/Alert.jsx';
import { LoadingSpinner } from '../components/LoadingStates.jsx';

/**
 * EditStory Page - Edit existing story (author only)
 * Includes ownership check and validation
 */
const EditStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [story, setStory] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // Load story on mount
  useEffect(() => {
    const loadStory = async () => {
      try {
        const data = await getStoryById(id);
        
        // Check ownership
        if (user && data.authorId !== user.id) {
          setServerError('You do not have permission to edit this story');
          navigate(`/story/${id}`);
          return;
        }
        
        setStory(data);
        setFormData({
          title: data.title,
          content: data.content,
        });
      } catch (err) {
        logError(err, 'EditStory: loadStory');
        setServerError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, [id, user, navigate]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setErrors({});

    try {
      // Validate with Zod
      const validatedData = updateStorySchema.parse({
        id,
        title: formData.title,
        content: formData.content,
      });

      setSubmitting(true);
      await updateStory(id, {
        title: validatedData.title,
        content: validatedData.content,
      });
      
      // Navigate back to story on success
      navigate(`/story/${id}`);
    } catch (err) {
      logError(err, 'EditStory: handleSubmit');

      // Handle Zod validation errors
      if (err.name === 'ZodError') {
        const fieldErrors = formatValidationErrors(err);
        // Remove id from field errors
        delete fieldErrors.id;
        setErrors(fieldErrors);
      } else {
        // Handle API errors
        setServerError(getErrorMessage(err));
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <LoadingSpinner message="Loading story..." />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert
            message={serverError || 'Story not found'}
            type="error"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Edit Story
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Update your story and republish
          </p>
        </div>

        {/* Form Card */}
        <Card>
          {serverError && (
            <Alert
              message={serverError}
              type="error"
              dismissible
              onDismiss={() => setServerError('')}
              className="mb-6"
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <FormField
              label="Story Title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Story title"
              error={errors.title}
              required
              maxLength={200}
              name="title"
            />

            {/* Content Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Story Content <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your story here..."
                rows={16}
                maxLength={50000}
                className={`w-full px-4 py-3 rounded-lg border font-serif text-base transition ${
                  errors.content
                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                    : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
                }`}
              />
              {errors.content && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {errors.content}
                </p>
              )}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {formData.content.length} / 50,000 characters
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={submitting}
                disabled={submitting}
              >
                Update Story
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => navigate(`/story/${id}`)}
                disabled={submitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditStory;
