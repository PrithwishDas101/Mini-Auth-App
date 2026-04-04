const express = require('express');
const authController = require('../controllers/authController');
const { identifier } = require('../middlewares/authorization');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', identifier, authController.signout);
router.get('/me', identifier, authController.getCurrentUser);
router.patch('/set-username', identifier, authController.setUsername);

router.patch('/send-verification-code', authController.sendVerificationCode)
router.patch('/verify-verification-code', authController.verifyVerificationCode)

router.patch('/change-password', identifier, authController.changePassword)
router.patch('/send-forgot-password-Code', authController.sendForgotPasswordCode)
router.patch('/verify-forgot-password-Code', authController.verifyForgotPasswordCode)

module.exports = router;