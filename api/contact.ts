import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  organisation: z.string()
    .max(200, 'Organisation must be less than 200 characters')
    .trim()
    .optional()
    .default(''),
  email: z.string()
    .email('Invalid email address')
    .max(254, 'Email must be less than 254 characters')
    .toLowerCase()
    .trim(),
  phone: z.string()
    .max(30, 'Phone must be less than 30 characters')
    .trim()
    .optional()
    .default(''),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
});

type ContactFormData = z.infer<typeof contactSchema>;

async function sendContactEmail(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, EMAIL_FROM, EMAIL_TO } = process.env;

  // If no SMTP config, log to console (dev mode)
  if (!SMTP_HOST) {
    console.log('=== Contact Form Submission (No SMTP configured) ===');
    console.log('From:', formData.name, `<${formData.email}>`);
    console.log('Organisation:', formData.organisation || 'Not provided');
    console.log('Phone:', formData.phone || 'Not provided');
    console.log('Message:', formData.message);
    console.log('================================================');
    return { success: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || '587', 10),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${formData.email}">${formData.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Organisation</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.organisation || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.phone || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message</td>
          <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${formData.message}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; color: #666; font-size: 12px;">
        This email was sent from the Reilly & Tholstrup Medico-Legal website contact form.
      </p>
    `;

    await transporter.sendMail({
      from: EMAIL_FROM || 'noreply@rtmedicolegal.com',
      to: EMAIL_TO || 'enquiries@rtmedicolegal.com',
      replyTo: formData.email,
      subject: `New Enquiry from ${formData.name}${formData.organisation ? ` (${formData.organisation})` : ''}`,
      html: htmlContent,
      text: `New Contact Form Submission\n\nName: ${formData.name}\nEmail: ${formData.email}\nOrganisation: ${formData.organisation || 'Not provided'}\nPhone: ${formData.phone || 'Not provided'}\n\nMessage:\n${formData.message}`,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
}

// Simple in-memory rate limiting (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count++;
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    // Validate input
    const validationResult = contactSchema.safeParse(req.body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return res.status(400).json({ error: 'Validation failed', details: errors });
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
