const FAQ = require('../models/FAQ');
const ErrorResponse = require('../utils/errorResponse');

exports.getFAQs = async (req, res) => {
  const filter = req.user ? {} : { isActive: true };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === 'true') filter.isFeatured = true;
  const faqs = await FAQ.find(filter).sort('order').populate('relatedService', 'title slug').lean();
  res.status(200).json({ success: true, count: faqs.length, data: faqs });
};

exports.createFAQ = async (req, res) => {
  const faq = await FAQ.create(req.body);
  res.status(201).json({ success: true, data: faq });
};

exports.updateFAQ = async (req, res, next) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!faq) return next(new ErrorResponse('FAQ not found', 404));
  res.status(200).json({ success: true, data: faq });
};

exports.deleteFAQ = async (req, res, next) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  if (!faq) return next(new ErrorResponse('FAQ not found', 404));
  res.status(200).json({ success: true, message: 'FAQ deleted' });
};

exports.reorderFAQs = async (req, res) => {
  const { order } = req.body;
  await Promise.all(order.map(({ id, order: o }) => FAQ.findByIdAndUpdate(id, { order: o })));
  res.status(200).json({ success: true, message: 'FAQs reordered' });
};
