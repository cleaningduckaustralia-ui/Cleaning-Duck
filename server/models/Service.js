const mongoose = require('mongoose');
const slugify = require('slugify');

const seoSchema = new mongoose.Schema({
  title: { type: String, maxlength: 100 },
  description: { type: String, maxlength: 160 },
  keywords: [String],
  ogImage: String,
  canonical: String,
  noIndex: { type: Boolean, default: false },
  // AI SEO fields
  speakable: [String],  // CSS selectors for speakable content (AI assistants)
  faqSchema: { type: Boolean, default: false },
  howToSchema: { type: Boolean, default: false },
  localBusinessSchema: { type: Boolean, default: true },
}, { _id: false });

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Service title is required'], trim: true, maxlength: 100 },
    slug: { type: String, unique: true, lowercase: true },
    shortDescription: { type: String, required: true, maxlength: 300 },
    longDescription: { type: String },
    features: [{ type: String }],
    benefits: [{ type: String }],
    icon: { type: String, default: 'fa-broom' },
    image: { url: String, alt: String, publicId: String },
    pricing: {
      from: String,
      displayText: String,
      included: [String],
    },
    serviceAreas: [{ type: String }],
    faq: [{ question: String, answer: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    seo: seoSchema,
    structuredData: { type: Object }, // Custom JSON-LD override
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Auto-generate slug from title
serviceSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Service', serviceSchema);
