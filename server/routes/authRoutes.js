const express = require('express');
const router = express.Router();
const { login, logout, refresh, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { authLimiter } = require('../middlewares/rateLimiter');

router.post('/login', authLimiter, login);
router.post('/logout', protect, logout);
router.post('/refresh', refresh);
router.get('/me', protect, getMe);

module.exports = router;
