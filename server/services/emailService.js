const { sendEmail } = require('../config/email');

const quoteNotificationTemplate = (quote) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
  .header { background: linear-gradient(135deg, #0B1F45, #1a3a6b); color: white; padding: 30px; text-align: center; }
  .header img { width: 60px; margin-bottom: 10px; }
  .header h1 { margin: 0; font-size: 22px; }
  .body { padding: 30px; }
  .field { margin-bottom: 16px; border-bottom: 1px solid #f0f0f0; padding-bottom: 16px; }
  .label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .value { font-size: 16px; color: #222; font-weight: 500; }
  .badge { display: inline-block; background: #D62828; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #888; }
  .cta { display: inline-block; background: #0B1F45; color: white; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 20px 0; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <h1>🦆 New Quote Request</h1>
    <p style="margin:8px 0 0;opacity:0.85">Cleaning Duck Australia</p>
  </div>
  <div class="body">
    <div class="field"><div class="label">Client Name</div><div class="value">${quote.fullName}</div></div>
    <div class="field"><div class="label">Email</div><div class="value">${quote.email}</div></div>
    <div class="field"><div class="label">Phone</div><div class="value">${quote.phone}</div></div>
    <div class="field"><div class="label">Service Required</div><div class="value"><span class="badge">${quote.service}</span></div></div>
    <div class="field"><div class="label">Property Type</div><div class="value">${quote.propertyType} — ${quote.bedrooms || 0} bed, ${quote.bathrooms || 0} bath</div></div>
    ${quote.address ? `<div class="field"><div class="label">Address</div><div class="value">${quote.address}</div></div>` : ''}
    ${quote.preferredDate ? `<div class="field"><div class="label">Preferred Date</div><div class="value">${new Date(quote.preferredDate).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div></div>` : ''}
    ${quote.message ? `<div class="field"><div class="label">Additional Notes</div><div class="value">${quote.message}</div></div>` : ''}
    <p style="margin-top:24px;color:#555">Received: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' })} AEST</p>
    <a href="mailto:${quote.email}" class="cta">Reply to Client</a>
  </div>
  <div class="footer">Cleaning Duck Australia · ABN 89 383 045 240 · Brisbane, QLD</div>
</div>
</body></html>`;

const quoteConfirmationTemplate = (quote) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
  .header { background: linear-gradient(135deg, #0B1F45, #1a3a6b); color: white; padding: 40px 30px; text-align: center; }
  .header h1 { margin: 0 0 8px; font-size: 24px; }
  .body { padding: 30px; }
  .highlight { background: #f0f4ff; border-left: 4px solid #0B1F45; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 20px 0; }
  .phone { font-size: 22px; font-weight: 700; color: #0B1F45; }
  .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #888; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <h1>✅ Quote Request Received!</h1>
    <p style="margin:0;opacity:0.85">Thank you, ${quote.fullName}</p>
  </div>
  <div class="body">
    <p>Hi <strong>${quote.fullName}</strong>,</p>
    <p>We've received your quote request for <strong>${quote.service}</strong> and our team will be in touch shortly to provide a personalised quote.</p>
    <div class="highlight">
      <p style="margin:0 0 8px;font-weight:600;">Need to speak to us urgently?</p>
      <div class="phone">📞 0412 664 540 or 0430 614 643</div>
    </div>
    <p><strong>What happens next?</strong></p>
    <ol>
      <li>Our team reviews your request (usually within 2 business hours)</li>
      <li>We call or email you with a personalised quote</li>
      <li>You confirm and we schedule your service</li>
    </ol>
    <p style="color:#555;font-size:14px;">This is an automated confirmation. Please do not reply to this email.</p>
  </div>
  <div class="footer">
    Cleaning Duck Australia · ABN 89 383 045 240<br>
    Brisbane, Logan, Ipswich, Gold Coast, Sunshine Coast<br>
    <a href="https://cleaningduckaustralia.com.au">cleaningduckaustralia.com.au</a>
  </div>
</div>
</body></html>`;

const contactNotificationTemplate = (contact) => `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
  body { font-family: Arial, sans-serif; background:#f4f6f9; padding:20px; }
  .card { max-width:580px; margin:0 auto; background:#fff; border-radius:10px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,.08); }
  .hdr { background:#0B1F45; color:#fff; padding:24px; }
  .body { padding:24px; }
  .row { margin-bottom:14px; border-bottom:1px solid #f0f0f0; padding-bottom:14px; }
  .lbl { font-size:11px; color:#999; text-transform:uppercase; margin-bottom:3px; }
  .val { font-size:15px; color:#222; }
</style></head>
<body><div class="card">
  <div class="hdr"><h2 style="margin:0">New Contact Message</h2><p style="margin:4px 0 0;opacity:.8">Cleaning Duck Australia Website</p></div>
  <div class="body">
    <div class="row"><div class="lbl">From</div><div class="val">${contact.name}</div></div>
    <div class="row"><div class="lbl">Email</div><div class="val"><a href="mailto:${contact.email}">${contact.email}</a></div></div>
    ${contact.phone ? `<div class="row"><div class="lbl">Phone</div><div class="val">${contact.phone}</div></div>` : ''}
    ${contact.subject ? `<div class="row"><div class="lbl">Subject</div><div class="val">${contact.subject}</div></div>` : ''}
    <div class="row"><div class="lbl">Message</div><div class="val" style="white-space:pre-wrap">${contact.message}</div></div>
    <p style="font-size:12px;color:#999">Received: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' })} AEST</p>
  </div>
</div></body></html>`;

exports.sendQuoteNotification = async (quote) => {
  await sendEmail({
    to: process.env.EMAIL_NOTIFY,
    subject: `🦆 New Quote Request: ${quote.service} — ${quote.fullName}`,
    html: quoteNotificationTemplate(quote),
  });
};

exports.sendQuoteConfirmation = async (quote) => {
  await sendEmail({
    to: quote.email,
    subject: 'Your Quote Request — Cleaning Duck Australia',
    html: quoteConfirmationTemplate(quote),
  });
};

exports.sendContactNotification = async (contact) => {
  await sendEmail({
    to: process.env.EMAIL_NOTIFY,
    subject: `New Contact Message from ${contact.name}`,
    html: contactNotificationTemplate(contact),
  });
};
