const Blog = require('../models/Blog');
const ErrorResponse = require('../utils/errorResponse');
const { uploadImage, deleteImage } = require('../services/imageService');

exports.getBlogs = async (req, res) => {
  const { page = 1, limit = 10, tag, category } = req.query;
  const filter = req.user ? {} : { isPublished: true };
  if (tag) filter.tags = { $in: [tag] };
  if (category) filter.category = category;

  const total = await Blog.countDocuments(filter);
  const blogs = await Blog.find(filter)
    .sort({ publishedAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .select('-content')
    .populate('author', 'name')
    .lean();

  res.status(200).json({ success: true, total, data: blogs });
};

exports.getBlog = async (req, res, next) => {
  const blog = await Blog.findOne({ slug: req.params.slug })
    .populate('author', 'name')
    .populate('relatedServices', 'title slug')
    .lean();
  if (!blog) return next(new ErrorResponse('Blog post not found', 404));
  await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
  res.status(200).json({ success: true, data: blog });
};

exports.createBlog = async (req, res) => {
  const body = { ...req.body, author: req.user._id };
  if (req.file) {
    const media = await uploadImage(req.file.buffer, {
      folder: 'cleaning-duck/blogs',
      alt: body.title,
      userId: req.user._id,
    });
    body.featuredImage = { url: media.secureUrl, alt: body.title, publicId: media.publicId };
  }
  const blog = await Blog.create(body);
  res.status(201).json({ success: true, data: blog });
};

exports.updateBlog = async (req, res, next) => {
  let blog = await Blog.findById(req.params.id);
  if (!blog) return next(new ErrorResponse('Blog post not found', 404));

  const body = { ...req.body };
  if (req.file) {
    if (blog.featuredImage?.publicId) await deleteImage(blog.featuredImage.publicId);
    const media = await uploadImage(req.file.buffer, {
      folder: 'cleaning-duck/blogs',
      alt: body.title || blog.title,
      userId: req.user._id,
    });
    body.featuredImage = { url: media.secureUrl, alt: body.title || blog.title, publicId: media.publicId };
  }

  blog = await Blog.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
  res.status(200).json({ success: true, data: blog });
};

exports.deleteBlog = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return next(new ErrorResponse('Blog post not found', 404));
  if (blog.featuredImage?.publicId) await deleteImage(blog.featuredImage.publicId);
  await blog.deleteOne();
  res.status(200).json({ success: true, message: 'Blog deleted' });
};
