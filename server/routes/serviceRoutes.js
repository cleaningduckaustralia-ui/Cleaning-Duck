const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const {
  getServices, getService, createService, updateService, deleteService, reorderServices,
} = require('../controllers/serviceController');

// Public routes
router.get('/', getServices);
router.get('/:slug', getService);

// Admin routes
router.use(protect, authorize('admin', 'superadmin'));
router.post('/', upload.single('image'), createService);
router.put('/reorder', reorderServices);
router.put('/:id', upload.single('image'), updateService);
router.delete('/:id', deleteService);

module.exports = router;
