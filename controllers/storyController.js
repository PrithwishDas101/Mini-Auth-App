const Story = require('../models/storyModel');
const User = require('../models/usersModel');

/**
 * Get all published stories (paginated)
 * Public endpoint
 */
const getStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sort = req.query.sort || '-createdAt';

    const skip = (page - 1) * limit;

    const stories = await Story.find({ published: true })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Story.countDocuments({ published: true });

    res.json({
      stories,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Failed to fetch stories' });
  }
};

/**
 * Get a single story by ID
 * Public endpoint
 */
const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!story || !story.published) {
      return res.status(404).json({ message: 'Story not found' });
    }

    res.json(story);
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ message: 'Failed to fetch story' });
  }
};

/**
 * Get all stories by a specific author
 * Public endpoint
 */
const getStoriesByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const skip = (page - 1) * limit;

    const stories = await Story.find({
      authorId,
      published: true,
    })
      .sort('-createdAt')
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Story.countDocuments({
      authorId,
      published: true,
    });

    res.json({
      stories,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching author stories:', error);
    res.status(500).json({ message: 'Failed to fetch author stories' });
  }
};

/**
 * Get current user's stories (authenticated)
 */
const getUserStories = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const stories = await Story.find({ authorId: userId })
      .sort('-createdAt')
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Story.countDocuments({ authorId: userId });

    res.json({
      stories,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching user stories:', error);
    res.status(500).json({ message: 'Failed to fetch your stories' });
  }
};

/**
 * Create a new story (authenticated)
 */
const createStory = async (req, res) => {
  try {
    const { title, content, tags, featured } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: 'Title and content are required' });
    }

    if (title.length < 3 || title.length > 200) {
      return res
        .status(400)
        .json({ message: 'Title must be 3-200 characters' });
    }

    if (content.length < 10 || content.length > 50000) {
      return res
        .status(400)
        .json({ message: 'Content must be 10-50,000 characters' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const story = new Story({
      title: title.trim(),
      content: content.trim(),
      author: user.username || user.email,
      authorId: userId,
      tags: tags || [],
      featured: featured || false,
    });

    await story.save();

    res.status(201).json({
      message: 'Story created successfully',
      story,
    });
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ message: 'Failed to create story' });
  }
};

/**
 * Update a story (authenticated, author only)
 */
const updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const userId = req.user.id;

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    if (story.authorId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: 'You can only edit your own stories' });
    }

    if (title) {
      if (title.length < 3 || title.length > 200) {
        return res
          .status(400)
          .json({ message: 'Title must be 3-200 characters' });
      }
      story.title = title.trim();
    }

    if (content) {
      if (content.length < 10 || content.length > 50000) {
        return res
          .status(400)
          .json({ message: 'Content must be 10-50,000 characters' });
      }
      story.content = content.trim();
    }

    if (tags) {
      story.tags = tags;
    }

    await story.save();

    res.json({
      message: 'Story updated successfully',
      story,
    });
  } catch (error) {
    console.error('Error updating story:', error);
    res.status(500).json({ message: 'Failed to update story' });
  }
};

/**
 * Delete a story (authenticated, author only)
 */
const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    if (story.authorId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: 'You can only delete your own stories' });
    }

    await Story.findByIdAndDelete(id);

    res.json({ message: 'Story deleted successfully' });
  } catch (error) {
    console.error('Error deleting story:', error);
    res.status(500).json({ message: 'Failed to delete story' });
  }
};

/**
 * Get featured stories
 * Public endpoint
 */
const getFeaturedStories = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const stories = await Story.find({
      published: true,
      featured: true,
    })
      .sort('-createdAt')
      .limit(limit)
      .lean();

    res.json(stories);
  } catch (error) {
    console.error('Error fetching featured stories:', error);
    res.status(500).json({ message: 'Failed to fetch featured stories' });
  }
};

/**
 * Search stories
 * Public endpoint
 */
const searchStories = async (req, res) => {
  try {
    const { q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    if (!q || q.trim().length < 2) {
      return res
        .status(400)
        .json({ message: 'Search query must be at least 2 characters' });
    }

    const skip = (page - 1) * limit;

    const stories = await Story.find(
      {
        $text: { $search: q },
        published: true,
      },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Story.countDocuments({
      $text: { $search: q },
      published: true,
    });

    res.json({
      stories,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error searching stories:', error);
    res.status(500).json({ message: 'Failed to search stories' });
  }
};

module.exports = {
  getStories,
  getStoryById,
  getStoriesByAuthor,
  getUserStories,
  createStory,
  updateStory,
  deleteStory,
  getFeaturedStories,
  searchStories,
};
