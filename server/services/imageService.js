const sharp = require('sharp');
const cloudinary = require('../config/cloudinary');
const Media = require('../models/Media');
const winston = require('../utils/logger');
const { Readable } = require('stream');

const COMPRESSION_THRESHOLD_MB = 10;

/**
 * Upload a buffer to Cloudinary, optionally compressing with Sharp first.
 * @param {Buffer} buffer - File buffer from Multer memory storage
 * @param {Object} options - { folder, filename, alt, userId }
 */
const uploadImage = async (buffer, options = {}) => {
  const { folder = 'cleaning-duck', filename, alt = '', userId } = options;
  const originalSize = buffer.length;
  const originalSizeMB = originalSize / (1024 * 1024);
  let processedBuffer = buffer;
  let isCompressed = false;

  // Compress if file exceeds threshold
  if (originalSizeMB > COMPRESSION_THRESHOLD_MB) {
    winston.info(`Compressing image: ${originalSizeMB.toFixed(2)}MB exceeds ${COMPRESSION_THRESHOLD_MB}MB threshold`);
    processedBuffer = await sharp(buffer)
      .resize({ width: 2400, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
    isCompressed = true;
  }

  // Upload to Cloudinary as a stream
  const uploadResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename || undefined,
        resource_type: 'image',
        quality: 'auto',
        fetch_format: 'auto',
        flags: 'progressive',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    const readableStream = Readable.from(processedBuffer);
    readableStream.pipe(uploadStream);
  });

  // Save to Media collection
  const media = await Media.create({
    url: uploadResult.url,
    secureUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
    originalName: filename,
    alt,
    mimeType: uploadResult.format,
    size: processedBuffer.length,
    width: uploadResult.width,
    height: uploadResult.height,
    format: uploadResult.format,
    folder,
    isCompressed,
    originalSize,
    uploadedBy: userId,
  });

  return media;
};

/**
 * Delete an image from Cloudinary and the Media collection
 */
const deleteImage = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
  await Media.findOneAndDelete({ publicId });
};

module.exports = { uploadImage, deleteImage };
