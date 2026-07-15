const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, required: true, maxlength: 200 },
    content: { type: String }, // Rich HTML content
    sections: { type: Object, default: {} }, // Flexible JSON for page sections
    isActive: { type: Boolean, default: true },
    template: {
      type: String,
      enum: ['home', 'about', 'services', 'contact', 'legal', 'custom'],
      default: 'custom',
    },
    seo: {
      title: { type: String, maxlength: 70 },
      description: { type: String, maxlength: 160 },
      keywords: [String],
      ogImage: String,
      canonical: String,
      noIndex: { type: Boolean, default: false },
      // AI SEO - Speakable schema for voice search
      speakable: [String],
      // Structured data
      structuredDataType: {
        type: String,
        enum: ['WebPage', 'AboutPage', 'ContactPage', 'ServicePage', 'FAQPage', 'None'],
        default: 'WebPage',
      },
    },
    breadcrumb: [{ name: String, url: String }],
    lastEditedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Page', pageSchema);
