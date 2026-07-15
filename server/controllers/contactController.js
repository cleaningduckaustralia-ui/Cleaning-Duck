const Contact = require('../models/Contact');
const ErrorResponse = require('../utils/errorResponse');
const { sendContactNotification } = require('../services/emailService');
const winston = require('../utils/logger');

exports.submitContact = async (req, res) => {
  const contactData = { ...req.body, ipAddress: req.ip };
  const contact = await Contact.create(contactData);

  sendContactNotification(contact).catch((err) =>
    winston.error('Contact notification email failed:', err.message)
  );

  res.status(201).json({
    success: true,
    message: "Thank you for your message! We'll get back to you within 24 hours.",
  });
};

exports.getContacts = async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = status && status !== 'all' ? { status } : {};
  const total = await Contact.countDocuments(filter);
  const contacts = await Contact.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .lean();
  res.status(200).json({ success: true, total, data: contacts });
};

exports.updateContact = async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!contact) return next(new ErrorResponse('Contact not found', 404));
  res.status(200).json({ success: true, data: contact });
};

exports.deleteContact = async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) return next(new ErrorResponse('Contact not found', 404));
  res.status(200).json({ success: true, message: 'Contact deleted' });
};
