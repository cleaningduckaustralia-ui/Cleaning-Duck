const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Blog title is required'], trim: true, maxlength: 200 },
    slug: { type: String, unique: true, lowercase: true },
    content: { type: String, required: [true, 'Blog content is required'] }, // Rich HTML from WYSIWYG
    excerpt: { type: String, maxlength: 400 },
    featuredImage: { url: String, alt: String, publicId: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tags: [{ type: String, trim: true }],
    category: { type: String, default: 'Cleaning Tips' },
    isPublished: { type: Boolean, default: false },
    publishedAt: Date,
    views: { type: Number, default: 0 },
    readTime: { type: Number, default: 5 }, // Minutes
    seo: {
      title: { type: String, maxlength: 70 },
      description: { type: String, maxlength: 160 },
      keywords: [String],
      ogImage: String,
      canonical: String,
      // AI SEO
      speakable: [String],
    },
    relatedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

blogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
  // Auto-calculate read time (avg 200 words/min)
  if (this.isModified('content')) {
    const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    this.readTime = Math.ceil(words / 200);
  }
  next();
});

blogSchema.index({ isPublished: 1, publishedAt: -1 });
blogSchema.index({ slug: 1 });
blogSchema.index({ tags: 1 });

module.exports = mongoose.model('Blog', blogSchema);
