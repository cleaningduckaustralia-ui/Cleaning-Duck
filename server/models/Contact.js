const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: { type: String, maxlength: 20 },
    subject: { type: String, maxlength: 200 },
    message: { type: String, required: [true, 'Message is required'], maxlength: 3000 },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
    adminReply: { type: String },
    repliedAt: Date,
    ipAddress: { type: String },
    emailNotificationSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

contactSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);
