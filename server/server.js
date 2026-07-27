require('dotenv').config();
require('express-async-errors');

// Trigger nodemon reload to read updated .env variables
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const { generalLimiter } = require('./middlewares/rateLimiter');
const winston = require('./utils/logger');

// Route imports
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const faqRoutes = require('./routes/faqRoutes');
const blogRoutes = require('./routes/blogRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const contactRoutes = require('./routes/contactRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// Connect to database
connectDB();

const app = express();

// ─── Security Middleware ────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com', 'https://lh3.googleusercontent.com', 'https://lh5.googleusercontent.com'],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://cleaningduckaustralia.com.au',
    'https://www.cleaningduckaustralia.com.au',
    process.env.CLIENT_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(generalLimiter);
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Cleaning Duck Australia API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/settings', settingsRoutes);

// ─── Serve Frontend in Production ────────────────────────────────────────────
app.get('/', (req, res) => res.json({ message: 'Cleaning Duck Australia API is running' }));

// ─── 404 Handler ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  winston.info(`🦆 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  winston.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  winston.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

module.exports = app;
