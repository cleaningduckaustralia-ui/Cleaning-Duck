const Testimonial = require('../models/Testimonial');
const ErrorResponse = require('../utils/errorResponse');

exports.getTestimonials = async (req, res) => {
  const filter = req.user ? {} : { isActive: true };
  const testimonials = await Testimonial.find(filter).sort('order').lean();
  res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
};

exports.createTestimonial = async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: testimonial });
};

exports.updateTestimonial = async (req, res, next) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!testimonial) return next(new ErrorResponse('Testimonial not found', 404));
  res.status(200).json({ success: true, data: testimonial });
};

exports.deleteTestimonial = async (req, res, next) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) return next(new ErrorResponse('Testimonial not found', 404));
  res.status(200).json({ success: true, message: 'Testimonial deleted' });
};

exports.reorderTestimonials = async (req, res) => {
  const { order } = req.body;
  await Promise.all(order.map(({ id, order: o }) => Testimonial.findByIdAndUpdate(id, { order: o })));
  res.status(200).json({ success: true, message: 'Testimonials reordered' });
};
