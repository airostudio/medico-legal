# CLAUDE.md - AI Assistant Guidelines for Medico-Legal Project

This document provides essential context and guidelines for AI assistants working on the medico-legal codebase.

## Project Overview

**Medico-Legal** is a system designed to handle medical-legal documentation, case management, and analysis. The project aims to streamline the intersection of medical records and legal proceedings.

### Domain Context

This project operates in a sensitive domain involving:
- **Medical Records**: Protected health information (PHI) subject to HIPAA and similar regulations
- **Legal Documentation**: Privileged attorney-client communications and case materials
- **Compliance Requirements**: Strict data handling, audit trails, and access controls

## Repository Status

This is a newly initialized repository. The codebase is being established from scratch.

## Project Structure (Planned)

```
medico-legal/
├── CLAUDE.md              # AI assistant guidelines (this file)
├── README.md              # Project documentation
├── docs/                  # Documentation
│   ├── architecture/      # System architecture docs
│   ├── api/               # API documentation
│   └── guides/            # User and developer guides
├── src/                   # Source code
│   ├── api/               # API endpoints
│   ├── models/            # Data models
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
├── tests/                 # Test suites
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── e2e/               # End-to-end tests
├── config/                # Configuration files
├── scripts/               # Build and utility scripts
└── .github/               # GitHub workflows and templates
```

## Development Guidelines

### Code Style

1. **TypeScript**: Prefer TypeScript for type safety in sensitive data handling
2. **Strict Mode**: Enable strict TypeScript compilation
3. **Explicit Types**: Always define explicit types for function parameters and return values
4. **No Any**: Avoid `any` type; use `unknown` with proper type guards when needed

### Security Requirements

Given the sensitive nature of medico-legal data:

1. **Never log PII/PHI**: Do not log patient names, SSNs, medical record numbers, or other identifiable information
2. **Sanitize Inputs**: Always sanitize and validate user inputs
3. **Parameterized Queries**: Use parameterized queries for all database operations
4. **Access Control**: Implement role-based access control (RBAC) for all endpoints
5. **Audit Logging**: Log all data access and modifications with user context (but not the data itself)
6. **Encryption**: Use encryption at rest and in transit for all sensitive data

### Git Workflow

1. **Branch Naming**: Use descriptive branch names (e.g., `feature/case-management`, `fix/document-upload`)
2. **Commit Messages**: Write clear, descriptive commit messages
3. **Pull Requests**: All changes require PR review before merging
4. **No Secrets**: Never commit secrets, API keys, or credentials to the repository

### Testing Requirements

1. **Unit Tests**: Required for all business logic
2. **Integration Tests**: Required for API endpoints and database operations
3. **Coverage**: Maintain minimum 80% code coverage
4. **Security Tests**: Include tests for authentication, authorization, and input validation

## AI Assistant Instructions

### When Working on This Codebase

1. **Read Before Modifying**: Always read existing code before making changes
2. **Understand Context**: Ensure you understand the medical-legal domain context
3. **Security First**: Prioritize security in all implementations
4. **Minimal Changes**: Make only the changes necessary to complete the task
5. **Test Coverage**: Include tests for any new functionality

### Prohibited Actions

1. **Never expose PHI/PII** in logs, error messages, or API responses
2. **Never bypass** authentication or authorization checks
3. **Never store** sensitive data in plain text
4. **Never commit** credentials, API keys, or secrets
5. **Never disable** security features or validations

### Code Patterns to Follow

#### Error Handling
```typescript
// Good: Generic error messages externally, detailed logging internally
try {
  await processCase(caseId);
} catch (error) {
  logger.error('Case processing failed', { caseId, errorCode: error.code });
  throw new ApiError(500, 'An error occurred processing your request');
}
```

#### Data Access
```typescript
// Good: Check authorization before data access
async function getCase(caseId: string, userId: string): Promise<Case> {
  const hasAccess = await checkUserAccess(userId, caseId);
  if (!hasAccess) {
    throw new UnauthorizedError('Access denied');
  }
  return caseRepository.findById(caseId);
}
```

#### Input Validation
```typescript
// Good: Validate and sanitize all inputs
function validateCaseInput(input: unknown): CaseInput {
  const schema = z.object({
    title: z.string().min(1).max(500),
    description: z.string().max(10000),
    patientId: z.string().uuid(),
  });
  return schema.parse(input);
}
```

### Common Commands

```bash
# Install dependencies (when package.json exists)
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## Key Conventions

### Naming Conventions

- **Files**: `kebab-case.ts` for files, `PascalCase.tsx` for React components
- **Variables**: `camelCase` for variables and functions
- **Types/Interfaces**: `PascalCase` for types, interfaces, and classes
- **Constants**: `SCREAMING_SNAKE_CASE` for constants
- **Database Tables**: `snake_case` for table and column names

### File Organization

- One component/class per file
- Co-locate tests with source files or in parallel test directory
- Group related functionality in modules
- Keep files under 300 lines when possible

### Documentation

- Document all public APIs with JSDoc comments
- Include examples for complex functions
- Keep README files up-to-date with setup instructions
- Document environment variables in `.env.example`

## Environment Setup

### Required Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/medicolegal

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRY=24h

# Encryption
ENCRYPTION_KEY=your-encryption-key

# Logging
LOG_LEVEL=info
```

### Local Development Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and configure
3. Install dependencies: `npm install`
4. Set up database: `npm run db:migrate`
5. Start development server: `npm run dev`

## Contact and Resources

- **Issue Tracker**: GitHub Issues for bug reports and feature requests
- **Documentation**: See `/docs` directory for detailed documentation
- **Code Review**: All changes require review before merging

---

*Last Updated: 2026-01-23*
