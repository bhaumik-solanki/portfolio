import { Resend } from 'resend';

export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields are required' }),
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const notification = await resend.emails.send({
      from: `${name} <onboarding@resend.dev>`,
      to: [process.env.TO_EMAIL || 'bhaumiksolanki04@gmail.com'],
      subject: `Portfolio Contact: ${subject}`,
      reply_to: email,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: "Segoe UI", sans-serif; color: #333; background: #f4f4f7; padding: 30px; }
              .container { max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05); overflow: hidden; }
              .header { background-color: #f0a01a; color: #fff; padding: 24px; text-align: center; }
              .content { padding: 24px; }
              .field { margin-bottom: 16px; }
              .label { font-size: 12px; color: #888; font-weight: 600; text-transform: uppercase; margin-bottom: 4px; }
              .value { font-size: 15px; line-height: 1.5; }
              .message { white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-radius: 6px; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Message</h2>
                <p>You've received a message via your portfolio website</p>
              </div>
              <div class="content">
                <div class="field"><div class="label">Name</div><div class="value">${name}</div></div>
                <div class="field"><div class="label">Email</div><div class="value">${email}</div></div>
                <div class="field"><div class="label">Subject</div><div class="value">${subject}</div></div>
                <div class="field"><div class="label">Message</div><div class="message">${message.replace(/\n/g, '<br />')}</div></div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `New message from portfolio\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
    });

    console.log('Email sent:', notification.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Email sent successfully!' }),
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
    };
  }
}
