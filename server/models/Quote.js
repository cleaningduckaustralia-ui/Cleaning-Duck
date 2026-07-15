const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, 'Full name is required'], trim: true, maxlength: 100 },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: { type: String, required: [true, 'Phone number is required'], maxlength: 20 },
    service: { type: String, required: [true, 'Service is required'] },
    propertyType: {
      type: String,
      enum: ['house', 'apartment', 'townhouse', 'commercial', 'other'],
      required: true,
    },
    bedrooms: { type: Number, min: 0, max: 20 },
    bathrooms: { type: Number, min: 0, max: 20 },
    preferredDate: { type: Date },
    address: { type: String, maxlength: 500 },
    message: { type: String, maxlength: 2000 },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled'],
      default: 'new',
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    adminNotes: { type: String },
    emailNotificationSent: { type: Boolean, default: false },
    ipAddress: { type: String },
    source: { type: String, default: 'website' },
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
  },
  { timestamps: true }
);

// Index for efficient querying
quoteSchema.index({ status: 1, createdAt: -1 });
quoteSchema.index({ email: 1 });

module.exports = mongoose.model('Quote', quoteSchema);
