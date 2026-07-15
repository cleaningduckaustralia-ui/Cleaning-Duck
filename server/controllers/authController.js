const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const winston = require('../utils/logger');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

const signRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

const sendTokens = async (user, statusCode, res) => {
  const accessToken = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  // Save refresh token to user
  user.refreshToken = refreshToken;
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  res
    .cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
    .cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
    .status(statusCode)
    .json({
      success: true,
      accessToken,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorResponse('Please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password +refreshToken');
  if (!user || !(await user.comparePassword(password)))
    return next(new ErrorResponse('Invalid credentials', 401));

  if (!user.isActive)
    return next(new ErrorResponse('Account is deactivated. Contact support.', 403));

  winston.info(`Admin login: ${user.email}`);
  await sendTokens(user, 200, res);
};

// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  req.user.refreshToken = undefined;
  await req.user.save({ validateBeforeSave: false });
  res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .status(200)
    .json({ success: true, message: 'Logged out successfully' });
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (with valid refresh cookie)
exports.refresh = async (req, res, next) => {
  const token = req.cookies?.refreshToken;
  if (!token) return next(new ErrorResponse('No refresh token', 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id).select('+refreshToken');
    if (!user || user.refreshToken !== token)
      return next(new ErrorResponse('Invalid refresh token', 401));

    await sendTokens(user, 200, res);
  } catch (err) {
    return next(new ErrorResponse('Invalid or expired refresh token', 401));
  }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role, lastLogin: req.user.lastLogin },
  });
};
