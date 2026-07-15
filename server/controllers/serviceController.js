const Service = require('../models/Service');
const ErrorResponse = require('../utils/errorResponse');
const { uploadImage, deleteImage } = require('../services/imageService');

// @desc    Get all active services (public)
// @route   GET /api/services
exports.getServices = async (req, res) => {
  const filter = req.user ? {} : { isActive: true };
  const services = await Service.find(filter).sort('order').lean();
  res.status(200).json({ success: true, count: services.length, data: services });
};

// @desc    Get single service by slug (public)
// @route   GET /api/services/:slug
exports.getService = async (req, res, next) => {
  const service = await Service.findOne({ slug: req.params.slug, isActive: true }).lean();
  if (!service) return next(new ErrorResponse('Service not found', 404));
  res.status(200).json({ success: true, data: service });
};

// @desc    Create service (admin)
// @route   POST /api/services
exports.createService = async (req, res, next) => {
  const body = { ...req.body };
  if (req.file) {
    const media = await uploadImage(req.file.buffer, {
      folder: 'cleaning-duck/services',
      filename: body.slug || body.title?.toLowerCase().replace(/\s+/g, '-'),
      alt: body.title,
      userId: req.user._id,
    });
    body.image = { url: media.secureUrl, alt: body.title, publicId: media.publicId };
  }
  const service = await Service.create(body);
  res.status(201).json({ success: true, data: service });
};

// @desc    Update service (admin)
// @route   PUT /api/services/:id
exports.updateService = async (req, res, next) => {
  let service = await Service.findById(req.params.id);
  if (!service) return next(new ErrorResponse('Service not found', 404));

  const body = { ...req.body };
  if (req.file) {
    if (service.image?.publicId) await deleteImage(service.image.publicId);
    const media = await uploadImage(req.file.buffer, {
      folder: 'cleaning-duck/services',
      alt: body.title || service.title,
      userId: req.user._id,
    });
    body.image = { url: media.secureUrl, alt: body.title || service.title, publicId: media.publicId };
  }

  service = await Service.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
  res.status(200).json({ success: true, data: service });
};

// @desc    Delete service (admin)
// @route   DELETE /api/services/:id
exports.deleteService = async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  if (!service) return next(new ErrorResponse('Service not found', 404));
  if (service.image?.publicId) await deleteImage(service.image.publicId);
  await service.deleteOne();
  res.status(200).json({ success: true, message: 'Service deleted' });
};

// @desc    Reorder services (admin)
// @route   PUT /api/services/reorder
exports.reorderServices = async (req, res) => {
  const { order } = req.body; // [{ id, order }]
  await Promise.all(order.map(({ id, order: o }) => Service.findByIdAndUpdate(id, { order: o })));
  res.status(200).json({ success: true, message: 'Services reordered' });
};
