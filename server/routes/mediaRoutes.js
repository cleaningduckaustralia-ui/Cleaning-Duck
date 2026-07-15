const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { getMedia, uploadMedia, updateMedia, deleteMedia } = require('../controllers/mediaController');

router.use(protect, authorize('admin', 'superadmin'));
router.get('/', getMedia);
router.post('/upload', upload.single('image'), uploadMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

module.exports = router;
