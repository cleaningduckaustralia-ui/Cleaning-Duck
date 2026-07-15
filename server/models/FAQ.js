const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, 'Question is required'], trim: true, maxlength: 500 },
    answer: { type: String, required: [true, 'Answer is required'], maxlength: 3000 },
    category: {
      type: String,
      enum: ['general', 'services', 'pricing', 'booking', 'areas', 'other'],
      default: 'general',
    },
    relatedService: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false }, // Show on homepage
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

faqSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('FAQ', faqSchema);
