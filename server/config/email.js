const nodemailer = require('nodemailer');
const winston = require('../utils/logger');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
      text,
    });
    winston.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    winston.error(`Email sending failed: ${error.message}`);
    throw error;
  }
};

module.exports = { sendEmail };
