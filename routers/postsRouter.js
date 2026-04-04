const express = require('express');
const { identifier } = require('../middlewares/authorization');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/all-posts', postsController.getPosts);

router.get('/single-post/:id', postsController.singlePost);

router.post('/create-posts', identifier, postsController.createPosts);

router.put('/update-post/:id', identifier, postsController.updatePost);

// router.delete('/delete-post/:id', identifier, postsController.deletePost);

module.exports = router;