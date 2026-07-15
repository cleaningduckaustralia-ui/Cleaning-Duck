const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Reviewer name is required'], trim: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    review: { type: String, required: [true, 'Review text is required'], maxlength: 2000 },
    service: { type: String },
    location: { type: String },
    profileImage: { type: String, default: '' },
    source: {
      type: String,
      enum: ['Google', 'Facebook', 'Direct', 'Other'],
      default: 'Google',
    },
    sourceUrl: { type: String },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    reviewDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

testimonialSchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
