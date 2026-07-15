const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const { quoteLimiter } = require('../middlewares/rateLimiter');
const { submitQuote, getQuotes, getQuote, updateQuote, deleteQuote, getStats } = require('../controllers/quoteController');

// Public
router.post('/', quoteLimiter, submitQuote);

// Admin
router.use(protect, authorize('admin', 'superadmin'));
router.get('/', getQuotes);
router.get('/stats', getStats);
router.get('/:id', getQuote);
router.put('/:id', updateQuote);
router.delete('/:id', deleteQuote);

module.exports = router;
