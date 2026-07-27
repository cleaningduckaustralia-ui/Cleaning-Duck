const axios = require('axios');
const winston = require('../utils/logger');

const sendEmail = async ({ to, subject, html }) => {
  try {
    const cpanelUrl = process.env.CPANEL_MAIL_URL || 'https://cleaningduckaustralia.com.au/api-mail.php';
    const secret = process.env.CPANEL_MAIL_SECRET || 'cda_mail_secret_2026_key';

    const response = await axios.post(
      cpanelUrl,
      { to, subject, html },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Mail-Secret': secret,
        },
        timeout: 10000,
      }
    );

    winston.info(`Email sent via cPanel relay to ${to}`);
    return response.data;
  } catch (error) {
    const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
    winston.error(`Email sending failed via cPanel relay: ${errorMsg}`);
    throw new Error(`Email sending failed: ${errorMsg}`);
  }
};

module.exports = { sendEmail };
