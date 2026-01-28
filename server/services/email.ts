import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type { ContactFormData } from '../routes/contact.js';

interface EmailResult {
  success: boolean;
  error?: string;
}

// Lazy-loaded transporter
let transporter: Transporter | null | undefined;

function getTransporter(): Transporter | null {
  // Return cached transporter if already created
  if (transporter !== undefined) {
    return transporter;
  }

  // Production: Use configured SMTP
  if (process.env.SMTP_HOST) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('Email service: SMTP configured');
    return transporter;
  }

  // Development or no SMTP: Use console output
  console.log('Email service: Using console output (no SMTP configured)');
  transporter = null;
  return transporter;
}

export async function sendContactEmail(data: ContactFormData): Promise<EmailResult> {
  const { name, organisation, email, phone, message } = data;

  const emailContent = `
New Contact Form Submission
===========================

Name: ${name}
Organisation: ${organisation || 'Not provided'}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
Submitted: ${new Date().toISOString()}
  `.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0B1220; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 18px; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .value { margin-top: 4px; }
    .message-box { background: white; padding: 15px; border-left: 4px solid #C98A2A; margin-top: 10px; }
    .footer { font-size: 12px; color: #666; margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${escapeHtml(name)}</div>
      </div>
      <div class="field">
        <div class="label">Organisation</div>
        <div class="value">${escapeHtml(organisation || 'Not provided')}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone</div>
        <div class="value">${escapeHtml(phone || 'Not provided')}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
      </div>
      <div class="footer">
        Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  const mailer = getTransporter();

  // Development mode: log to console
  if (!mailer) {
    console.log('\n========== EMAIL (DEV MODE) ==========');
    console.log(emailContent);
    console.log('=======================================\n');
    return { success: true };
  }

  try {
    await mailer.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@rtmedicolegal.com',
      to: process.env.EMAIL_TO || 'enquiries@rtmedicolegal.com',
      replyTo: email,
      subject: `Contact Form: ${name}${organisation ? ` - ${organisation}` : ''}`,
      text: emailContent,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}

function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, char => htmlEntities[char]);
}
