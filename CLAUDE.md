# CLAUDE.md - AI Assistant Guidelines for Medico-Legal Project

This document provides essential context and guidelines for AI assistants working on the medico-legal codebase.

## Project Overview

**Medico-Legal** is a professional landing page and web application for Reilly & Throlstrup Medico-Legal services. The project provides a modern, responsive website for legal and insurance professionals seeking independent medical opinions, court-ready reporting, and expert witness services.

### Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling

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
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── public/
│   └── favicon.svg        # Site favicon
└── src/
    ├── main.tsx           # React entry point
    ├── App.tsx            # Main application component (landing page)
    ├── index.css          # Tailwind imports and custom styles
    └── vite-env.d.ts      # Vite type definitions
```

## Key Components (in App.tsx)

The landing page consists of these main sections:

| Component | Purpose |
|-----------|---------|
| `Header` | Navigation bar with logo and links |
| `Hero` | Full-screen hero with CTAs |
| `TrustBar` | Key value propositions |
| `Services` | 6 service cards (IME, Reports, etc.) |
| `Process` | 4-step workflow explanation |
| `About` | Company information and focus areas |
| `Testimonials` | Client quotes |
| `CTA` | Contact section with form |
| `Footer` | Copyright and links |

## Development Guidelines

### Common Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Code Style

1. **TypeScript**: Use TypeScript for type safety
2. **Strict Mode**: Strict TypeScript compilation enabled
3. **Explicit Types**: Define types for function parameters and return values
4. **No Any**: Avoid `any` type; use `unknown` with type guards when needed
5. **Functional Components**: Use React functional components with hooks

### Tailwind CSS Conventions

- Use utility classes directly in JSX
- Custom colors defined in `tailwind.config.js`:
  - `navy` (#0B1220) - Primary dark background
  - `teal` (#1E8FA6, #2FB7C9) - Accent color
  - `gold` (#C98A2A) - Secondary accent/CTA color

### Component Patterns

```tsx
// Component with typed props
function ServiceCard({ title, desc, icon }: {
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/75">{desc}</p>
    </div>
  );
}
```

### Security Requirements

Given the sensitive nature of medico-legal data:

1. **Never log PII/PHI**: Do not log patient names, SSNs, or identifiable information
2. **Sanitize Inputs**: Always sanitize and validate form inputs
3. **No Secrets in Code**: Never commit credentials or API keys
4. **HTTPS Only**: All production deployments must use HTTPS

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

### Prohibited Actions

1. **Never expose PHI/PII** in logs, error messages, or responses
2. **Never commit** credentials, API keys, or secrets
3. **Never break** the responsive layout
4. **Never remove** accessibility features
5. **Never change** the core brand colors without explicit request

### Areas for Future Development

- [ ] Form submission backend integration
- [ ] Add real logo image
- [ ] Update contact information
- [ ] Add mobile hamburger menu
- [ ] Implement booking/scheduling system
- [ ] Add case study or portfolio section
- [ ] SEO optimization with meta tags
- [ ] Add Google Analytics or similar

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

## Environment Setup

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:5173

### Production Build

```bash
npm run build
# Output in dist/ folder - deploy to any static host
```

### Deployment Options

- Netlify (drag & drop dist folder)
- Vercel (connect GitHub repo)
- GitHub Pages
- AWS S3 + CloudFront
- Any static file hosting

---

*Last Updated: 2026-01-23*
