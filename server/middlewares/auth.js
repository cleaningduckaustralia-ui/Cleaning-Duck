const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check httpOnly cookie
    else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      return next(new ErrorResponse('User no longer exists or has been deactivated', 401));
    }

    // Check if password changed after token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      return next(new ErrorResponse('Password recently changed. Please log in again.', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new ErrorResponse('Invalid token', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new ErrorResponse('Token expired', 401));
    }
    return next(new ErrorResponse('Authentication failed', 401));
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(`Role '${req.user.role}' is not authorized to access this route`, 403));
    }
    next();
  };
};
