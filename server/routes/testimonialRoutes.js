const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, reorderTestimonials } = require('../controllers/testimonialController');

router.get('/', getTestimonials);
router.use(protect, authorize('admin', 'superadmin'));
router.post('/', createTestimonial);
router.put('/reorder', reorderTestimonials);
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);

module.exports = router;
