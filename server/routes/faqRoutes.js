const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const { getFAQs, createFAQ, updateFAQ, deleteFAQ, reorderFAQs } = require('../controllers/faqController');

router.get('/', getFAQs);
router.use(protect, authorize('admin', 'superadmin'));
router.post('/', createFAQ);
router.put('/reorder', reorderFAQs);
router.put('/:id', updateFAQ);
router.delete('/:id', deleteFAQ);

module.exports = router;
