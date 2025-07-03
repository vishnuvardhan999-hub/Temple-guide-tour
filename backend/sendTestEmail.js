require('dotenv').config();
const nodemailer = require('nodemailer');

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE, // should be 'sendgrid'
      auth: {
        user: 'apikey',                  // required for SendGrid
        pass: process.env.EMAIL_PASS,    // your actual SendGrid API key
      },
      tls: {
        rejectUnauthorized: false,       // avoid self-signed error during development
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,                  // your verified sender
      to: 'your_email@example.com',                  // change to your real email for testing
      subject: 'TempleGuide Test Email',
      text: 'This is a test email sent from TempleGuide backend using SendGrid and Nodemailer!',
    });

    console.log('✅ Test email sent:', info.response);
  } catch (error) {
    console.error('❌ Failed to send test email:', error);
  }
})();
