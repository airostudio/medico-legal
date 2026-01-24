import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import contactRouter from './routes/contact.js';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Trust proxy for rate limiting behind reverse proxy (Railway, Render, etc.)
app.set('trust proxy', 1);

// Rate limiting - 5 requests per 15 minutes per IP for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Body parsing
app.use(express.json({ limit: '10kb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form route with rate limiting
app.use('/api/contact', contactLimiter, contactRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'An error occurred processing your request' });
});

app.listen(PORT, () => {
  console.log(`
=================================
  Medico-Legal API Server
=================================
  Port:        ${PORT}
  Environment: ${process.env.NODE_ENV || 'development'}
  CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}
  SMTP:        ${process.env.SMTP_HOST ? 'Configured' : 'Console output (dev mode)'}
=================================
  `);
});

export default app;
