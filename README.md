# Medico-Legal Website

A professional landing page for Reilly & Throlstrup Medico-Legal services, built with React, TypeScript, and Tailwind CSS, with an Express.js backend for contact form handling.

## Features

- Modern, responsive design
- Dark theme with teal and gold accents
- Sections: Hero, Services, Process, About, Testimonials, Contact
- **Functional contact form** with backend API
- Email notifications via SMTP
- Rate limiting and security headers
- Smooth scroll navigation

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling

### Backend
- **Express.js** - API server
- **Nodemailer** - Email sending
- **Zod** - Input validation
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### Development

```bash
# Start frontend only (http://localhost:5173)
npm run dev

# Start backend only (http://localhost:3001)
npm run dev:server

# Start both frontend and backend
npm run dev:all
```

### Production Build

```bash
# Build frontend
npm run build

# Build server
npm run build:server

# Build both
npm run build:all

# Start production server
npm run start:server
```

## Project Structure

```
medico-legal/
├── public/
│   └── favicon.svg
├── src/                     # Frontend source
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # React entry point
│   ├── index.css            # Tailwind imports
│   └── vite-env.d.ts
├── server/                  # Backend source
│   ├── index.ts             # Express server entry
│   ├── tsconfig.json        # Server TypeScript config
│   ├── routes/
│   │   └── contact.ts       # Contact form endpoint
│   └── services/
│       └── email.ts         # Email service
├── .env.example             # Environment template
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── CLAUDE.md
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Server
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# SMTP (required for production)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASS=your-password

# Email addresses
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=enquiries@yourdomain.com
```

### Frontend API URL

For production, set the API URL in your build:

```bash
VITE_API_URL=https://api.yourdomain.com npm run build
```

## API Endpoints

### POST /api/contact

Submit contact form.

**Request:**
```json
{
  "name": "Jane Doe",
  "organisation": "Legal Firm",
  "email": "jane@example.com",
  "phone": "+1 555 000 0000",
  "message": "Your message here..."
}
```

**Response (success):**
```json
{
  "success": true,
  "message": "Thank you for your enquiry. We will respond within 1-2 business days."
}
```

**Response (error):**
```json
{
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Invalid email address" }
  ]
}
```

### GET /api/health

Health check endpoint.

## Customization

### Contact Information

Update in `src/App.tsx` in the `CTA` component:

```tsx
<span>Phone: (000) 000-0000</span>
<span>Email: enquiries@yourdomain.com</span>
<span>Location: Your City, State</span>
```

### Hero Image

Replace the background image URL in the `Hero` component:

```tsx
backgroundImage: "url('your-image-url')",
```

### Logo

Replace the "RT" placeholder in the `Header` component with your actual logo image.

## Deployment

### Frontend (Static)

Build and deploy `dist/` to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Backend

Deploy the server to:
- Railway
- Render
- Fly.io
- AWS EC2 / ECS
- Any Node.js hosting

### Full Stack (Recommended)

For simplest deployment, use:
- **Vercel** - Frontend + Serverless functions
- **Railway** - Full Node.js app
- **Render** - Static site + Web service

## Security

- Rate limiting: 5 requests per 15 minutes per IP
- Helmet security headers
- CORS restricted to frontend origin
- Input validation with Zod
- No PII logged (only metadata)

## License

Proprietary - All rights reserved.
