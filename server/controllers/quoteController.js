const Quote = require('../models/Quote');
const ErrorResponse = require('../utils/errorResponse');
const { sendQuoteNotification, sendQuoteConfirmation } = require('../services/emailService');
const winston = require('../utils/logger');

// @desc    Submit quote request (public)
// @route   POST /api/quotes
exports.submitQuote = async (req, res, next) => {
  const quoteData = {
    ...req.body,
    ipAddress: req.ip,
    source: 'website',
    utmSource: req.query.utm_source,
    utmMedium: req.query.utm_medium,
    utmCampaign: req.query.utm_campaign,
  };

  const quote = await Quote.create(quoteData);

  // Send notifications (non-blocking)
  Promise.all([
    sendQuoteNotification(quote).catch((err) => winston.error('Quote admin email failed:', err.message)),
    sendQuoteConfirmation(quote).catch((err) => winston.error('Quote confirm email failed:', err.message)),
  ]).then(async () => {
    await Quote.findByIdAndUpdate(quote._id, { emailNotificationSent: true });
  });

  res.status(201).json({
    success: true,
    message: "Thank you! We've received your quote request and will be in touch shortly.",
    data: { id: quote._id },
  });
};

// @desc    Get all quotes (admin)
// @route   GET /api/quotes
exports.getQuotes = async (req, res) => {
  const { status, page = 1, limit = 20, search } = req.query;
  const filter = {};
  if (status && status !== 'all') filter.status = status;
  if (search) {
    filter.$or = [
      { fullName: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { phone: new RegExp(search, 'i') },
    ];
  }

  const total = await Quote.countDocuments(filter);
  const quotes = await Quote.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .lean();

  res.status(200).json({
    success: true,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: quotes,
  });
};

// @desc    Get single quote (admin)
// @route   GET /api/quotes/:id
exports.getQuote = async (req, res, next) => {
  const quote = await Quote.findById(req.params.id);
  if (!quote) return next(new ErrorResponse('Quote not found', 404));
  res.status(200).json({ success: true, data: quote });
};

// @desc    Update quote status/notes (admin)
// @route   PUT /api/quotes/:id
exports.updateQuote = async (req, res, next) => {
  const { status, adminNotes, assignedTo } = req.body;
  const quote = await Quote.findByIdAndUpdate(
    req.params.id,
    { status, adminNotes, assignedTo },
    { new: true, runValidators: true }
  );
  if (!quote) return next(new ErrorResponse('Quote not found', 404));
  res.status(200).json({ success: true, data: quote });
};

// @desc    Delete quote (admin)
// @route   DELETE /api/quotes/:id
exports.deleteQuote = async (req, res, next) => {
  const quote = await Quote.findByIdAndDelete(req.params.id);
  if (!quote) return next(new ErrorResponse('Quote not found', 404));
  res.status(200).json({ success: true, message: 'Quote deleted' });
};

// @desc    Get dashboard stats (admin)
// @route   GET /api/quotes/stats
exports.getStats = async (req, res) => {
  const stats = await Quote.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  const total = await Quote.countDocuments();
  const thisMonth = await Quote.countDocuments({
    createdAt: { $gte: new Date(new Date().setDate(1)) },
  });
  res.status(200).json({ success: true, data: { stats, total, thisMonth } });
};
