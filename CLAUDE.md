# CLAUDE.md - AI Assistant Guidelines for Medico-Legal Project

This document provides essential context and guidelines for AI assistants working on the medico-legal codebase.

## Project Overview

**Medico-Legal** is a professional landing page and web application for Reilly & Tholstrup Medico-Legal services. The project provides a modern, responsive website for legal and insurance professionals seeking independent medical opinions, court-ready reporting, and expert witness services.

### Tech Stack

**Frontend:**
- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling

**Backend:**
- **Express.js** - API server
- **Nodemailer** - Email sending
- **Zod** - Input validation
- **Helmet** - Security headers

### Domain Context

This project operates in a sensitive domain involving:
- **Medical Records**: Protected health information (PHI) subject to HIPAA and similar regulations
- **Legal Documentation**: Privileged attorney-client communications and case materials
- **Compliance Requirements**: Strict data handling, audit trails, and access controls

## Project Structure

```
medico-legal/
├── CLAUDE.md              # AI assistant guidelines (this file)
├── README.md              # Project documentation
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variables template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── public/
│   └── favicon.svg        # Site favicon
├── src/                   # Frontend source
│   ├── main.tsx           # React entry point
│   ├── App.tsx            # Main application component
│   ├── index.css          # Tailwind imports
│   └── vite-env.d.ts      # Vite type definitions
└── server/                # Backend source
    ├── index.ts           # Express server entry
    ├── tsconfig.json      # Server TypeScript config
    ├── routes/
    │   └── contact.ts     # Contact form API endpoint
    └── services/
        └── email.ts       # Email sending service
```

## Key Components

### Frontend (src/App.tsx)

| Component | Purpose |
|-----------|---------|
| `Header` | Navigation bar with logo and links |
| `Hero` | Full-screen hero with CTAs |
| `TrustBar` | Key value propositions |
| `Services` | 6 service cards (IME, Reports, etc.) |
| `Process` | 4-step workflow explanation |
| `About` | Company information and focus areas |
| `Testimonials` | Client quotes |
| `CTA` | Contact section with functional form |
| `Footer` | Copyright and links |

### Backend (server/)

| File | Purpose |
|------|---------|
| `index.ts` | Express server setup, middleware, routes |
| `routes/contact.ts` | POST /api/contact - form submission |
| `services/email.ts` | SMTP email sending |

## Development Guidelines

### Common Commands

```bash
# Install dependencies
npm install

# Frontend only (http://localhost:5173)
npm run dev

# Backend only (http://localhost:3001)
npm run dev:server

# Both frontend and backend
npm run dev:all

# Build frontend
npm run build

# Build server
npm run build:server

# Run linting
npm run lint
```

### Code Style

1. **TypeScript**: Use TypeScript for type safety
2. **Strict Mode**: Strict TypeScript compilation enabled
3. **Explicit Types**: Define types for function parameters and return values
4. **No Any**: Avoid `any` type; use `unknown` with type guards when needed
5. **Functional Components**: Use React functional components with hooks
6. **Zod Validation**: Use Zod for all input validation on backend

### Tailwind CSS Conventions

- Use utility classes directly in JSX
- Custom colors defined in `tailwind.config.js`:
  - `navy` (#0B1220) - Primary dark background
  - `teal` (#1E8FA6, #2FB7C9) - Accent color
  - `gold` (#C98A2A) - Secondary accent/CTA color

### API Patterns

```typescript
// Route with validation (server/routes/contact.ts)
const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

router.post('/', async (req, res) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Validation failed' });
  }
  // Process validated data
});
```

### Security Requirements

Given the sensitive nature of medico-legal data:

1. **Never log PII/PHI**: Do not log patient names, SSNs, or identifiable information
2. **Sanitize Inputs**: Always sanitize and validate form inputs with Zod
3. **No Secrets in Code**: Never commit credentials or API keys
4. **HTTPS Only**: All production deployments must use HTTPS
5. **Rate Limiting**: Contact form limited to 5 requests per 15 minutes
6. **CORS**: Restrict to frontend origin only

### Git Workflow

1. **Branch Naming**: Use descriptive branch names (e.g., `feature/contact-form`, `fix/mobile-nav`)
2. **Commit Messages**: Write clear, descriptive commit messages
3. **Pull Requests**: All changes require PR review before merging
4. **No Secrets**: Never commit secrets, API keys, or credentials

## AI Assistant Instructions

### When Working on This Codebase

1. **Read Before Modifying**: Always read existing code before making changes
2. **Understand Context**: Ensure you understand the medical-legal domain context
3. **Maintain Design**: Keep the established dark theme and color palette
4. **Component Structure**: Follow existing component patterns
5. **Responsive Design**: Ensure all changes work on mobile and desktop
6. **Validate All Inputs**: Use Zod schemas for any new API endpoints

### Prohibited Actions

1. **Never expose PHI/PII** in logs, error messages, or responses
2. **Never commit** credentials, API keys, or secrets
3. **Never break** the responsive layout
4. **Never remove** accessibility features
5. **Never change** the core brand colors without explicit request
6. **Never disable** rate limiting or security headers

### Areas for Future Development

- [x] Form submission backend integration
- [ ] Add real logo image
- [ ] Update contact information
- [ ] Add mobile hamburger menu
- [ ] Implement booking/scheduling system
- [ ] Add case study or portfolio section
- [ ] SEO optimization with meta tags
- [ ] Add Google Analytics or similar

## Configuration

### Environment Variables (.env)

```bash
# Server
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# SMTP (leave empty for dev console output)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=username
SMTP_PASS=password

# Email addresses
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=enquiries@yourdomain.com
```

### Frontend Environment

```bash
# For production builds
VITE_API_URL=https://api.yourdomain.com
```

## Customization Points

### Contact Details (src/App.tsx, CTA component)
```tsx
<span>Phone: (000) 000-0000</span>
<span>Email: enquiries@yourdomain.com</span>
<span>Location: Your City, State</span>
```

### Hero Image (src/App.tsx, Hero component)
```tsx
backgroundImage: "url('your-image-url')",
```

### Logo (src/App.tsx, Header component)
Replace the "RT" text placeholder with an actual logo image.

### Email Template (server/services/email.ts)
Customize HTML email template for branding.

## Environment Setup

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy environment: `cp .env.example .env`
4. Start both servers: `npm run dev:all`
5. Frontend: http://localhost:5173
6. Backend: http://localhost:3001

### Production Build

```bash
# Build everything
npm run build:all

# Start production server
npm run start:server
```

### Deployment Options

**Frontend:**
- Netlify, Vercel, GitHub Pages, AWS S3

**Backend:**
- Railway, Render, Fly.io, AWS EC2

**Full Stack:**
- Railway (recommended)
- Render
- Vercel + separate API

---

*Last Updated: 2026-01-23*
