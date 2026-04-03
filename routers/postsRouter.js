const express = require('express');
const { identifier } = require('../middlewares/authorization');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/all-posts', postsController.getPosts);
/* router.get('/single-posts', authController.signin);
router.post('/create-posts', identifier, authController.signout);

router.put(
    '/update-post', 
    identifier, 
    authController.sendVerificationCode
);

router.delete(
    '/delete-post', 
    identifier, 
    authController.verifyVerificationCode
)
*/

module.exports = router; 