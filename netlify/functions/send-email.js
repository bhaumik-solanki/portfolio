import { Resend } from "resend";

export async function handler(event, context) {
    // Enable CORS
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
    };

    // Handle preflight
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    // Only allow POST
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: "Method not allowed" }),
        };
    }

    try {
        const { name, email, subject, message } = JSON.parse(event.body);

        // Validate
        if (!name || !email || !subject || !message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: "All fields are required" }),
            };
        }

        console.log("Processing form submission from:", email);

        // Initialize Resend
        const resend = new Resend(process.env.RESEND_API_KEY);

        // 1. Send notification email to you
        console.log("Sending notification email to:", process.env.TO_EMAIL);
        const notificationEmail = await resend.emails.send({
            from: `${name} <onboarding@resend.dev>`,
            to: [process.env.TO_EMAIL || "bhaumik.solanki@gmail.com"],
            subject: `Portfolio Contact: ${subject}`,
            reply_to: email,
            html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: "Segoe UI", sans-serif;
              color: #333;
              background: #f4f4f7;
              padding: 30px;
            }
            .container {
              max-width: 600px;
              margin: auto;
              background: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
              overflow: hidden;
            }
            .header {
              background-color: #8b5cf6;
              color: #fff;
              padding: 24px;
              text-align: center;
            }
            .content {
              padding: 24px;
            }
            .field {
              margin-bottom: 16px;
            }
            .label {
              font-size: 12px;
              color: #888;
              font-weight: 600;
              text-transform: uppercase;
              margin-bottom: 4px;
            }
            .value {
              font-size: 15px;
              line-height: 1.5;
            }
            .message {
              white-space: pre-wrap;
              background: #f9f9f9;
              padding: 16px;
              border-radius: 6px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Message</h2>
              <p>You've received a message via your portfolio website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message">${message.replace(/\n/g, "<br />")}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
            text: `
      New message received on Portfolio website
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message:
      ${message}
      `,
        });
        console.log("Notification email full response:", notificationEmail);
        console.log(
            "Notification email sent successfully:",
            notificationEmail.id,
        );

        // // 2. Send auto-reply - with error handling
        // let autoReplyStatus = "not_sent";
        // let autoReplyError = null;

        // try {
        //   console.log("Attempting to send auto-reply to:", email);

        //   const autoReplyEmail = await resend.emails.send({
        //     from: "Bhaumik Solanki <onboarding@resend.dev>",
        //     to: [email], // Changed from array to string
        //     subject: `Thank you for reaching out, ${name}!`,
        //     reply_to: [process.env.TO_EMAIL || "bhaumik.solanki@gmail.com"],
        //     html: `
        //     <!DOCTYPE html>
        //     <html>
        //       <head>
        //         <style>
        //           body {
        //             font-family: "Segoe UI", sans-serif;
        //             color: #333;
        //             background: #f8f9fa;
        //             padding: 30px;
        //           }
        //           .container {
        //             max-width: 600px;
        //             margin: auto;
        //             background: #fff;
        //             border-radius: 10px;
        //             overflow: hidden;
        //             box-shadow: 0 0 12px rgba(0, 0, 0, 0.06);
        //           }
        //           .header {
        //             background: linear-gradient(135deg, #7c3aed, #a78bfa);
        //             color: #fff;
        //             text-align: center;
        //             padding: 40px 20px;
        //           }
        //           .content {
        //             padding: 30px 20px;
        //           }
        //           .footer {
        //             background: #f1f3f5;
        //             padding: 20px;
        //             text-align: center;
        //             font-size: 13px;
        //             color: #666;
        //           }
        //         </style>
        //       </head>
        //       <body>
        //         <div class="container">
        //           <div class="header">
        //             <h1>Thanks for reaching out, ${name}!</h1>
        //           </div>
        //           <div class="content">
        //             <p>Hi ${name},</p>
        //             <p>
        //               Thank you for contacting me. I've received your message and I
        //               appreciate you taking the time to reach out. I'll get back to you as
        //               soon as possible.
        //             </p>
        //             <p>Here's a quick summary of what you shared:</p>
        //             <strong>Subject:</strong> ${subject}
        //             <p>
        //               If you have any urgent matters, please don't hesitate to reach out
        //               again.
        //             </p>
        //             <p>Looking forward to connecting with you!</p>
        //             <p>
        //               Best regards,<br />
        //               <strong>Bhaumik Solanki</strong>
        //             </p>
        //           </div>
        //           <div class="footer">
        //             This is an automated confirmation that your message was received.<br />
        //             Please don't reply directly to this email.
        //           </div>
        //         </div>
        //       </body>
        //     </html>
        //     `,
        //     text: `
        //       Hi ${name},

        //       Thank you for contacting me. I've received your message and I appreciate you taking the time to reach out. I'll get back to you as soon as possible.

        //       Here's a quick summary of what you shared:
        //       Subject: ${subject}

        //       If you have any urgent matters, please don't hesitate to reach out again.

        //       Looking forward to connecting with you!

        //       Best regards,
        //       Bhaumik Solanki
        //     `,
        //   });
        //   console.log("Auto-reply email full response:", autoReplyEmail);
        //   console.log("Auto-reply sent successfully:", autoReplyEmail.id);
        //   autoReplyStatus = "sent";
        // } catch (autoError) {
        //   console.error("Auto-reply failed:", autoError);
        //   autoReplyError = autoError.message;
        //   autoReplyStatus = "failed";
        //   // Don't throw - we still want to return success if notification was sent
        // }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: "Email sent successfully!",
                details: {
                    notification: "sent",
                    // autoReply: autoReplyStatus,
                    // autoReplyError: autoReplyError,
                },
            }),
        };
    } catch (error) {
        console.error("Email send error:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: "Failed to send email",
                details: error.message,
            }),
        };
    }
}
