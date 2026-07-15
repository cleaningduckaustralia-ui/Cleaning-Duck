const rateLimit = require('express-rate-limit');

const createLimiter = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    message: { success: false, message },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
  });

exports.generalLimiter = createLimiter(15 * 60 * 1000, 100, 'Too many requests, please try again in 15 minutes.');
exports.authLimiter = createLimiter(15 * 60 * 1000, 10, 'Too many login attempts, please try again in 15 minutes.');
exports.quoteLimiter = createLimiter(60 * 60 * 1000, 5, 'Too many quote requests, please try again in 1 hour.');
exports.contactLimiter = createLimiter(60 * 60 * 1000, 5, 'Too many contact submissions, please try again in 1 hour.');
