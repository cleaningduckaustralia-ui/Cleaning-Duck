const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const { getPublicSettings, getAllSettings, updateSettings } = require('../controllers/settingsController');

router.get('/public', getPublicSettings);
router.use(protect, authorize('admin', 'superadmin'));
router.get('/', getAllSettings);
router.put('/', updateSettings);

module.exports = router;
