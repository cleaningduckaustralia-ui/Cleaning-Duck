const Media = require('../models/Media');
const ErrorResponse = require('../utils/errorResponse');
const { uploadImage, deleteImage } = require('../services/imageService');

exports.getMedia = async (req, res) => {
  const { folder, page = 1, limit = 30 } = req.query;
  const filter = folder ? { folder } : {};
  const total = await Media.countDocuments(filter);
  const media = await Media.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .lean();
  res.status(200).json({ success: true, total, data: media });
};

exports.uploadMedia = async (req, res, next) => {
  if (!req.file) return next(new ErrorResponse('No file provided', 400));
  const media = await uploadImage(req.file.buffer, {
    folder: req.body.folder || 'cleaning-duck/general',
    alt: req.body.alt || req.file.originalname,
    userId: req.user._id,
  });
  res.status(201).json({ success: true, data: media });
};

exports.updateMedia = async (req, res, next) => {
  const { alt, caption, tags } = req.body;
  const media = await Media.findByIdAndUpdate(
    req.params.id,
    { alt, caption, tags },
    { new: true }
  );
  if (!media) return next(new ErrorResponse('Media not found', 404));
  res.status(200).json({ success: true, data: media });
};

exports.deleteMedia = async (req, res, next) => {
  const media = await Media.findById(req.params.id);
  if (!media) return next(new ErrorResponse('Media not found', 404));
  await deleteImage(media.publicId);
  res.status(200).json({ success: true, message: 'Media deleted' });
};
