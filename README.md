# Medico-Legal Website

A professional landing page for Reilly & Throlstrup Medico-Legal services, built with React, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive design
- Dark theme with teal and gold accents
- Sections: Hero, Services, Process, About, Testimonials, Contact
- Contact form (frontend only - requires backend integration)
- Smooth scroll navigation

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The development server runs at `http://localhost:5173` by default.

## Project Structure

```
medico-legal/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # React entry point
│   ├── index.css        # Tailwind imports & custom styles
│   └── vite-env.d.ts    # Vite type definitions
├── index.html           # HTML template
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── CLAUDE.md            # AI assistant guidelines
```

## Customization

### Contact Information

Update the contact details in `src/App.tsx` in the `CTA` component:

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

### Form Submission

The contact form currently prevents default submission. To make it functional:

1. Add form state management
2. Connect to a backend API or service (e.g., Formspree, Netlify Forms)
3. Add validation and error handling

## Deployment

Build the production bundle:

```bash
npm run build
```

The `dist/` folder contains static files ready for deployment to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting

## License

Proprietary - All rights reserved.
