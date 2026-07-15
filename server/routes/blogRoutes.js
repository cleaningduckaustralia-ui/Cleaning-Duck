const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

router.get('/', getBlogs);
router.get('/:slug', getBlog);
router.use(protect, authorize('admin', 'superadmin'));
router.post('/', upload.single('image'), createBlog);
router.put('/:id', upload.single('image'), updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
