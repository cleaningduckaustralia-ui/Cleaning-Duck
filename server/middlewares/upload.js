const multer = require('multer');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');

const storage = multer.memoryStorage(); // Use memory storage; pass buffer to Sharp then Cloudinary

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) return cb(null, true);
  cb(new ErrorResponse('Only image files (jpeg, jpg, png, webp, gif, svg) are allowed', 400));
};

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
  fileFilter,
});

module.exports = upload;
