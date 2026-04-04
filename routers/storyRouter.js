const express = require('express');
const storyController = require('../controllers/storyController');
const { identifier } = require('../middlewares/authorization');

const router = express.Router();

/**
 * Public Routes (No authentication required)
 */
router.get('/', storyController.getStories); // GET /stories - All published stories
router.get('/featured', storyController.getFeaturedStories); // GET /stories/featured - Featured stories
router.get('/search', storyController.searchStories); // GET /stories/search - Search stories
router.get('/author/:authorId', storyController.getStoriesByAuthor); // GET /stories/author/:id - Author's stories
router.get('/:id', storyController.getStoryById); // GET /stories/:id - Single story

/**
 * Authenticated Routes (Requires valid JWT token)
 */
router.post('/', identifier, storyController.createStory); // POST /stories - Create new story
router.patch('/:id', identifier, storyController.updateStory); // PATCH /stories/:id - Update story
router.delete('/:id', identifier, storyController.deleteStory); // DELETE /stories/:id - Delete story

/**
 * User-specific Routes (Authenticated)
 */
router.get('/user/my-stories', identifier, storyController.getUserStories); // GET /stories/user/my-stories

module.exports = router;
