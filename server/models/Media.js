const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    secureUrl: { type: String, required: true },
    publicId: { type: String, required: true, unique: true },
    originalName: { type: String },
    alt: { type: String, default: '' },
    caption: { type: String, default: '' },
    mimeType: { type: String },
    size: { type: Number }, // bytes
    width: { type: Number },
    height: { type: Number },
    format: { type: String },
    folder: { type: String, default: 'cleaning-duck' },
    tags: [String],
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isCompressed: { type: Boolean, default: false },
    originalSize: { type: Number }, // Before compression
  },
  { timestamps: true }
);

mediaSchema.index({ folder: 1, createdAt: -1 });

module.exports = mongoose.model('Media', mediaSchema);
