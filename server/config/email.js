const { Resend } = require('resend');
const winston = require('../utils/logger');

const sendEmail = async ({ to, subject, html }) => {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is missing.');
    }
    const resend = new Resend(apiKey);

    const from = process.env.EMAIL_FROM || 'Cleaning Duck Australia <onboarding@resend.dev>';
    const recipient = to || process.env.EMAIL_NOTIFY || 'cleaningduckaustralia@gmail.com';

    const response = await resend.emails.send({
      from,
      to: recipient,
      subject,
      html,
    });

    if (response.error) {
      winston.error(`Resend API error: ${JSON.stringify(response.error)}`);
      throw new Error(response.error.message);
    }

    winston.info(`Email sent via Resend with ID: ${response.data.id}`);
    return response.data;
  } catch (error) {
    winston.error(`Email sending failed via Resend: ${error.message}`);
    throw error;
  }
};

module.exports = { sendEmail };
