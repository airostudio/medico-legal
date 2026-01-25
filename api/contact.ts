import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Validation helper
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

interface ContactFormData {
  name: string;
  organisation?: string;
  email: string;
  phone?: string;
  message: string;
}

interface ValidationError {
  field: string;
  message: string;
}

function validateFormData(data: unknown): { valid: true; data: ContactFormData } | { valid: false; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: [{ field: 'body', message: 'Invalid request body' }] };
  }

  const body = data as Record<string, unknown>;

  // Name validation
  if (!body.name || typeof body.name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (body.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  } else if (body.name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name must be less than 100 characters' });
  }

  // Email validation
  if (!body.email || typeof body.email !== 'string') {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(body.email.trim())) {
    errors.push({ field: 'email', message: 'Invalid email address' });
  } else if (body.email.trim().length > 254) {
    errors.push({ field: 'email', message: 'Email must be less than 254 characters' });
  }

  // Message validation
  if (!body.message || typeof body.message !== 'string') {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (body.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  } else if (body.message.trim().length > 5000) {
    errors.push({ field: 'message', message: 'Message must be less than 5000 characters' });
  }

  // Organisation validation (optional)
  if (body.organisation && typeof body.organisation === 'string' && body.organisation.trim().length > 200) {
    errors.push({ field: 'organisation', message: 'Organisation must be less than 200 characters' });
  }

  // Phone validation (optional)
  if (body.phone && typeof body.phone === 'string' && body.phone.trim().length > 30) {
    errors.push({ field: 'phone', message: 'Phone must be less than 30 characters' });
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      name: (body.name as string).trim(),
      organisation: body.organisation ? (body.organisation as string).trim() : '',
      email: (body.email as string).trim().toLowerCase(),
      phone: body.phone ? (body.phone as string).trim() : '',
      message: (body.message as string).trim(),
    },
  };
}

async function sendContactEmail(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpSecure = process.env.SMTP_SECURE === 'true';
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const emailFrom = process.env.EMAIL_FROM || 'noreply@rtmedicolegal.com';
  const emailTo = process.env.EMAIL_TO || 'enquiries@rtmedicolegal.com';

  // If SMTP not configured, log to console (for development)
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log('=== Contact Form Submission (No SMTP configured) ===');
    console.log('Name:', formData.name);
    console.log('Organisation:', formData.organisation || 'N/A');
    console.log('Email:', formData.email);
    console.log('Phone:', formData.phone || 'N/A');
    console.log('Message:', formData.message);
    console.log('=================================================');
    return { success: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1A202C; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #1A202C; }
          .value { margin-top: 5px; }
          .footer { padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${formData.name}</div>
            </div>
            ${formData.organisation ? `
            <div class="field">
              <div class="label">Organisation:</div>
              <div class="value">${formData.organisation}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
            </div>
            ${formData.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${formData.phone}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${formData.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            This email was sent from the contact form at rtmedicolegal.com
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      replyTo: formData.email,
      subject: `Contact Form: ${formData.name}${formData.organisation ? ` - ${formData.organisation}` : ''}`,
      html: htmlContent,
      text: `
New Contact Form Submission

Name: ${formData.name}
${formData.organisation ? `Organisation: ${formData.organisation}\n` : ''}Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}\n` : ''}
Message:
${formData.message}

---
This email was sent from the contact form at rtmedicolegal.com
      `.trim(),
    });

    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Rate limiting store (in-memory, resets on cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
                     req.headers['x-real-ip'] as string ||
                     'unknown';

    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    // Validate input
    const validationResult = validateFormData(req.body);

    if (!validationResult.valid) {
      return res.status(400).json({ error: 'Validation failed', details: validationResult.errors });
    }

    const formData = validationResult.data;

    // Send email
    const result = await sendContactEmail(formData);

    if (!result.success) {
      console.error('Email send failed:', result.error);
      return res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }

    // Log submission (without PII details)
    console.log('Contact form submitted:', {
      timestamp: new Date().toISOString(),
      hasOrganisation: !!formData.organisation,
      hasPhone: !!formData.phone,
      messageLength: formData.message.length,
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for your enquiry. We will respond within 1-2 business days.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
}
