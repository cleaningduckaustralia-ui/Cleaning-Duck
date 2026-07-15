require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const Media = require('../models/Media');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMedia = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected.');

    const jsonPath = path.join(__dirname, '../../client/src/data/galleryImages.json');
    const images = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    console.log(`Found ${images.length} images to upload.`);

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const localFilePath = path.join(__dirname, '../../client/public', img.src);
      
      if (!fs.existsSync(localFilePath)) {
        console.log(`[${i+1}/${images.length}] Skipped (file not found): ${localFilePath}`);
        continue;
      }

      console.log(`[${i+1}/${images.length}] Uploading ${img.src}...`);
      
      try {
        const result = await cloudinary.uploader.upload(localFilePath, {
          folder: 'cleaning-duck/gallery',
        });

        await Media.create({
          publicId: result.public_id,
          url: result.url,
          secureUrl: result.secure_url,
          originalName: img.src.split('/').pop(),
          mimeType: 'image/' + result.format,
          format: result.format,
          size: result.bytes,
          width: result.width,
          height: result.height,
          folder: 'cleaning-duck/gallery',
          alt: img.src.split('/').pop(),
          tags: [img.category],
          uploadedBy: null
        });

        console.log(`  -> Success!`);
      } catch (err) {
        console.error(`  -> Failed:`, err.message);
      }
    }

    console.log('✅ All media seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

uploadMedia();
