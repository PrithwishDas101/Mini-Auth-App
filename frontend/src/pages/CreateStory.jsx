import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { createStory } from '../api/storyService.js';
import { createStorySchema } from '../api/schemas.js';
import { getErrorMessage, logError, formatValidationErrors } from '../api/errors.js';
import Alert, { FormField, Button, Card } from '../components/Alert.jsx';

/**
 * CreateStory Page - Create new story (authenticated only)
 * Includes form validation and error handling
 */
const CreateStory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
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
      const validatedData = createStorySchema.parse(formData);

      setLoading(true);
      const newStory = await createStory(validatedData);
      
      // Navigate to new story on success
      navigate(`/story/${newStory._id}`);
    } catch (err) {
      logError(err, 'CreateStory: handleSubmit');

      // Handle Zod validation errors
      if (err.name === 'ZodError') {
        setErrors(formatValidationErrors(err));
      } else {
        // Handle API errors
        setServerError(getErrorMessage(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Write a New Story
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Share your tale with readers around the world
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
              placeholder="Enter an engaging title"
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
                placeholder="Write your story here... (minimum 10 characters)"
                rows={16}
                maxLength={50000}
                className={`w-full px-4 py-3 rounded-lg border font-serif text-base transition ${
                  errors.content
                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
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
                loading={loading}
                disabled={loading}
              >
                Publish Story
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => navigate('/')}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        {/* Help Text */}
        <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
            Tips for Writing Great Stories
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>✓ Start with an engaging title that captures interest</li>
            <li>✓ Hook your readers in the first paragraph</li>
            <li>✓ Maintain consistent pacing throughout</li>
            <li>✓ Proofread before publishing</li>
            <li>✓ You can always edit or delete your story later</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
