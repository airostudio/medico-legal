import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { sendContactEmail } from '../services/email.js';

const router = Router();

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

export type ContactFormData = z.infer<typeof contactSchema>;

router.post('/', async (req: Request, res: Response) => {
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
});

export default router;
