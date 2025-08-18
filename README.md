<a  href="https://www.connie.one">
<img  src="https://i.postimg.cc/MGd7M6Cp/connie-logo-white-thin-deja-Vu-Sans.png"  alt="Connie SaaS For Nonprofits"  width="250"  />
</a>

# Connie.one - Public Website & Stakeholder Portal

**Mission:** Public-facing website and secure stakeholder dataroom for ConnieRTC - the multi-tenant communication platform for nonprofit organizations.

## 🚀 Quick Start - Local Development

```bash
# Navigate to the project
cd /Users/cjberno/projects/connie/connie.one/src

# Install dependencies (first time only)
pnpm install

# Start development server
pnpm dev
```

**That's it!** Your local development environment is now running:

- 🌐 **Website**: http://localhost:3000
- 🔧 **Admin Panel**: http://localhost:3000/admin  
- 🔒 **Dataroom**: http://localhost:3000/dataroom

### First Time Admin Setup
1. Visit http://localhost:3000/admin
2. Create your first admin user (any email/password for local dev)
3. Start creating content!

## 📋 Project Overview

**Connie.one** serves as the public face of ConnieRTC with three main components:

1. **Marketing Website** - Landing pages, blog, and public content
2. **PayloadCMS Admin** - Content management system for editors
3. **Stakeholder Dataroom** - Secure document portal for investors/partners

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **CMS**: PayloadCMS 3.44.0
- **Database**: MongoDB Atlas
- **Authentication**: Okta SSO (production)
- **Deployment**: AWS Amplify
- **Styling**: TailwindCSS
- **Package Manager**: pnpm (required)

## 📁 Project Structure

```
connie.one/
├── src/
│   ├── app/                # Next.js app router pages
│   ├── blocks/             # PayloadCMS content blocks
│   │   ├── CardGrid/       # Card layout component
│   │   ├── Content/        # Rich text content
│   │   ├── CallToAction/   # CTA sections
│   │   └── ...            
│   ├── collections/        # CMS collections (Pages, Posts, Users)
│   ├── components/         # React components
│   └── payload.config.ts   # PayloadCMS configuration
├── public/                 # Static assets
├── .env                    # Environment variables
└── package.json           # Dependencies
```

## 🎨 Key Features

### Content Blocks Available in CMS
- **CardGrid** - Beautiful card layouts (like the ConnieRTC project hub)
- **Hero** - Landing page hero sections
- **Content** - Rich text with Lexical editor
- **CallToAction** - CTA sections with buttons
- **MediaBlock** - Images and video content
- **Archive** - Blog/post listings
- **Form** - Contact and lead capture forms

### Page Templates
- Landing pages with hero sections
- Blog with categories and authors
- Card-based index pages
- Contact forms
- Dataroom portal (stakeholder access)

## 💻 Development Commands

```bash
# Development
pnpm dev                    # Start dev server (localhost:3000)
pnpm build                  # Build for production
pnpm start                  # Run production build locally

# Code Quality
pnpm lint                   # Run ESLint
pnpm lint:fix              # Fix linting issues

# Testing
pnpm test                   # Run all tests
pnpm test:e2e              # End-to-end tests
pnpm test:int              # Integration tests

# PayloadCMS
pnpm payload generate:types # Generate TypeScript types
pnpm payload generate:importmap # Generate import map
```

## 🔐 Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
# Required for local development
DATABASE_URI=mongodb+srv://...        # MongoDB connection
PAYLOAD_SECRET=your-secret-here       # 32+ character secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Production/Staging
OKTA_CLIENT_ID=...                    # Okta SSO configuration
OKTA_CLIENT_SECRET=...
OKTA_ISSUER=https://trial-2094636.okta.com

# S3 Media Storage (optional)
S3_BUCKET_UPLOADS=...
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_REGION=us-east-1
```

## 🚀 Deployment

### Production (AWS Amplify)

The site automatically deploys to https://connie.one when changes are pushed to the `main` branch.

**Manual Deployment:**
```bash
# Build locally first to verify
pnpm build

# Push to trigger deployment
git add .
git commit -m "Your changes"
git push origin main
```

**Monitor deployment:**
- AWS Amplify Console: Check build logs
- Live site: https://connie.one

### Deployment Configuration

See `amplify.yml` for AWS Amplify build settings. The deployment:
1. Installs pnpm and dependencies
2. Generates PayloadCMS import maps
3. Builds the Next.js application
4. Deploys to AWS infrastructure

## 🔗 Related Resources

### ConnieRTC Ecosystem
- **Main Platform**: [connieRTC-basecamp](https://github.com/ConnieML/connieRTC-basecamp)
- **Documentation**: [docs.connie.one](https://docs.connie.one)
- **Admin Platform**: admin.connie (in development)
- **Production App**: [connie.plus](https://connie.plus)

### Technical Documentation
- **Original Template**: [Payload Website Template](https://github.com/payloadcms/payload/tree/main/templates/website)
- **PayloadCMS Docs**: [payloadcms.com/docs](https://payloadcms.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

## 🤝 Development Guidelines

### Code Standards
- Use TypeScript for all new code
- Follow existing component patterns
- Maintain responsive design (mobile-first)
- Ensure accessibility (WCAG 2.1 AA)

### Content Management
- All content should be manageable via CMS
- Use blocks for flexible layouts
- Implement proper SEO metadata
- Enable draft/preview functionality

### Git Workflow
- Create feature branches from `main`
- Test locally before pushing
- Write clear, descriptive commit messages
- No marketing/promotional content in commits

## ⚠️ Important Notes

- **Node Version**: Requires Node.js 20.9.0 or higher
- **Package Manager**: Must use pnpm (not npm or yarn)
- **Database**: MongoDB required (Atlas recommended)
- **Risk Tolerance**: Very low - test thoroughly before deploying

## 📞 Support

For questions about:
- **This codebase**: Create an issue in the repo
- **PayloadCMS**: [Payload Discord](https://discord.com/invite/payload)
- **ConnieRTC Platform**: Contact the ConnieRTC team

---

**Current Status**: Active development with production site at [connie.one](https://connie.one)

**Last Updated**: August 2025