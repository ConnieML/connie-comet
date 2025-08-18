# Connie.one Project Context

## Project Overview
- Next.js/Payload CMS project for connie.one
- Connie is a startup CPAAS for nonprofits (digital transformation, ops efficiency, scale impact)
- Main CPAAS at https://connie.team (Twilio Flex backend)
- Tenant portal at https://portal.connie.team (uses Okta + My Apps)
- Currently evaluating authentication for connie.one dataroom
- Project structure includes main site, dataroom feature, and CMS admin

## Current Status
- **Authentication**: ✅ COMPLETED - Okta integration successfully implemented
- **Footer**: ✅ COMPLETED - 3-column layout with CMS management
- **Latest Update**: Waitlist page with animated grid backgrounds (Aug 16, 2024)

## Key Technical Components
- Next.js frontend with Payload CMS
- Dataroom feature for document access
- Theme system with light/dark modes
- File structure includes collections (Users, Posts, Pages, Media)

## IMPORTANT: Development Guidelines
**🚨 MANDATORY: Review PayloadCMS Documentation Before Any Material Code Changes**
- **PayloadCMS Docs**: https://payloadcms.com/docs/getting-started/what-is-payload
- ALL agents must review relevant PayloadCMS documentation before making material edits
- Understand collections, fields, hooks, and API patterns before implementing
- Follow PayloadCMS best practices for schema design and data modeling
- Consult specific sections: Collections, Fields, Admin UI, REST API, GraphQL API
- Risk tolerance is very low - improper CMS changes can break production

**🚨 MANDATORY: Git Commit Guidelines**
- NEVER include Claude/AI advertising in commit messages
- Keep commit messages professional and focused on the technical changes
- User is paying for this service and will give credit when appropriate
- Focus on clear, descriptive commit messages without promotional content

## Current Discussion
- Evaluating Okta vs other authentication providers
- Business case for Okta needs to be documented and analyzed
- Previous session was interrupted during explanation of Okta rationale

## Okta Business Case & Technical Context
- **Existing Infrastructure**: Already using Okta for main platform (portal.connie.team)
- **SAML 2.0 Integration**: Established workflow with Twilio Flex via SAML SSO
- **Multi-tenant Architecture**: Each CBO tenant accesses via Okta My Apps → their Flex instance
- **Security Requirements**: Dataroom contains sensitive stakeholder content requiring robust auth
- **Consistency**: Connie.one would align with existing identity management infrastructure
- **Cost Advantage**: Connie is a nonprofit with full Okta subsidization - no additional cost
- **Previous Integration Challenges**: Failed attempt at Okta SAML2.0 + PayloadCMS integration (resulted in full restart)
- **Risk Tolerance**: Very low - cannot afford to break existing connie.one work
- **CI/CD Setup**: Working pipeline to AWS Amplify (must protect)
- **Existing Okta OIDC**: Previous setup exists from failed integration attempt
- **Simple Role Requirements**: 
  - Admin role: "Connie Admins" Okta group (~4 users) - full CMS + dataroom access
  - Dataroom role: Stakeholders (dataroom access only)
- **Preferred Login Flow**: portal.connie.team → My Apps → Connie.one → /admin or /dataroom
- **Integration Goal**: Connie.one as available app in Okta My Apps dashboard
- **Technical Approach**: Previous agent suggested NextAuth + Okta (safer than direct SAML)
- **Existing Technical Details**: 
  - Entity ID: urn:flex:JQ5c7c65eb72a5114214e803ba4f36f525
  - ACS URL: https://login.flex.us1.twilio.com/login/callback?connection=JQ5c7c65eb72a5114214e803ba4f36f525
  - JIT provisioning enabled for automatic user creation
  - Flex roles: agent, supervisor, administrator
  - Enhanced OAuth 2.0 framework via Okta

## Current Okta Setup (from screenshots)
- **My Apps Dashboard**: Shows existing Connie apps in "Work" section
  - ASA.CONNIE.TEAM, hhovy.connie.team, Nevada Senior Services, southside.connie.team, ConnieOne-Admin
  - Development section: Enhanced SSO Dev, ConnieRTC(+Flex)-DevSandBox, Okta Workflows
- **Admin Dashboard**: 43 users, 16 groups, 21 SSO apps (12 OIDC, 8 SAML, 0 Others)
- **Goal**: Add "Connie.one" app to My Apps that redirects to connie.one/admin

## FINAL Implementation Plan - Clerk + Payload + Okta Integration

### Why Clerk is the Right Solution
✅ **Official Okta SAML SSO support** - Clerk has built-in enterprise Okta integration  
✅ **Proven Payload integration** - Community-documented approach that works  
✅ **Maintains SSO dream** - portal.connie.team → My Apps → Connie.one via Clerk  
✅ **Production-ready** - No custom authentication code to maintain  
✅ **Future-proof** - Follows documented patterns from both Clerk and Payload  

### Step 1: Clerk Setup & Okta SAML Integration
1. **Create Clerk application** for connie.one
2. **Configure Okta SAML connection** in Clerk dashboard:
   - Add Okta Workforce as SAML connection
   - Configure domain matching for your organization
   - Map "Connie Admins" group to Clerk roles
3. **Test Clerk + Okta flow** independently

### Step 2: Environment Variables
```env
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Existing Payload Configuration (keep)
DATABASE_URI=mongodb+srv://...
PAYLOAD_SECRET=...
```

### Step 3: Install & Configure Clerk
1. **Install Clerk**: `pnpm add @clerk/nextjs`
2. **Add ClerkProvider** to layout
3. **Create sign-in/sign-up pages**
4. **Protect admin routes** with Clerk middleware

### Step 4: Clerk-Payload Integration
1. **Create Clerk token verification utility** for Payload API
2. **Modify Payload auth** to accept Clerk tokens
3. **Sync Clerk users** with Payload users collection
4. **Map Clerk roles** to Payload permissions

### Step 5: Updated Login Flow
**NEW FLOW:** portal.connie.team → My Apps → Connie.one → **Clerk (handles Okta SAML)** → Payload Admin

### Step 6: Benefits of Clerk Approach
✅ **Zero custom authentication code**  
✅ **Official Okta enterprise SSO**  
✅ **Documented Payload integration pattern**  
✅ **Handles all OAuth complexity**  
✅ **Secure token-based API authentication**  
✅ **Scalable for multiple auth providers**

### Step 7: Production Deployment
1. **Update Okta SAML settings** to production domain
2. **Configure Clerk production environment**
3. **Deploy to AWS Amplify** with new env vars

## AWS Amplify Production Deployment Configuration

### GitHub Repository
- **Repo**: https://github.com/ConnieML/connie-comet
- **Production Branch**: main
- **Deployment History**: Previous deployments have been challenging - full day of troubleshooting common

### amplify.yml Configuration
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        # Handle missing env vars gracefully
        - echo "PAYLOAD_SECRET=${PAYLOAD_SECRET:-default}" >> .env.production
        - echo "DATABASE_URI=${DATABASE_URI:-default}" >> .env.production
        - echo "NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL:-default}" >> .env.production
        - echo "CRON_SECRET=${CRON_SECRET:-default}" >> .env.production
        - echo "PREVIEW_SECRET=${PREVIEW_SECRET:-default}" >> .env.production
        # S3 Configuration
        - echo "S3_BUCKET_UPLOADS=${S3_BUCKET_UPLOADS:-default}" >> .env.production
        - echo "S3_ACCESS_KEY_ID=${S3_ACCESS_KEY_ID:-default}" >> .env.production
        - echo "S3_SECRET_ACCESS_KEY=${S3_SECRET_ACCESS_KEY:-default}" >> .env.production
        - echo "S3_REGION=${S3_REGION:-default}" >> .env.production
        # OKTA Configuration - NEW!
        - echo "OKTA_CLIENT_ID=${OKTA_CLIENT_ID:-default}" >> .env.production
        - echo "OKTA_CLIENT_SECRET=${OKTA_CLIENT_SECRET:-default}" >> .env.production
        - echo "OKTA_ISSUER=${OKTA_ISSUER:-default}" >> .env.production
        - echo "JWT_SECRET=${JWT_SECRET:-default}" >> .env.production
        # Create media directory and setup
        - mkdir -p public/media
        - nvm use 20
        - npm install -g pnpm@latest
        - pnpm install
        - pnpm payload generate:importmap
    build:
      commands:
        - pnpm build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
```

### Environment Variables (All branches)
```env
# Core Application
PAYLOAD_SECRET=***REDACTED***
DATABASE_URI=***REDACTED***
NEXT_PUBLIC_SERVER_URL=https://connie.one
CRON_SECRET=***REDACTED***
PREVIEW_SECRET=***REDACTED***

# OKTA Authentication
OKTA_CLIENT_ID=***REDACTED***
OKTA_CLIENT_SECRET=***REDACTED***
OKTA_ISSUER=https://trial-2094636.okta.com
JWT_SECRET=***REDACTED***

# S3 Media Storage
S3_BUCKET_UPLOADS=admin-connie-one-uploads
S3_ACCESS_KEY_ID=AKIAQ***REDACTED***
S3_SECRET_ACCESS_KEY=***REDACTED***
S3_REGION=us-east-1
```

### Deployment Best Practices
- **Risk Tolerance**: Very low - cannot afford to break existing connie.one work
- **CI/CD Setup**: Working pipeline to AWS Amplify (must protect)
- **Previous Challenges**: Deployments have historically taken full days to troubleshoot
- **Node Version**: 20 (specified in amplify.yml)
- **Package Manager**: pnpm (latest version installed during build)
- **Build Process**: Includes Payload importmap generation before build

### Deployment Checklist
1. ✅ Ensure all environment variables are set in Amplify console
2. ✅ Verify amplify.yml is correct and includes all required preBuild commands
3. ✅ Test locally with `pnpm build` before deploying
4. ✅ Monitor build logs carefully for any missing dependencies
5. ✅ After deployment, verify CMS admin access and functionality

## Next Steps
1. ✅ Complete authentication provider evaluation (Okta selected)
2. ✅ Document business case for Okta (documented)
3. ✅ Research NextAuth + Okta OIDC integration approach
4. ✅ Plan safe implementation strategy
5. ✅ Implement chosen solution (Okta authentication)
6. ✅ Implement footer enhancement with 3-column layout
7. **READY**: Deploy footer updates to AWS Amplify

## Waitlist Page Implementation (Aug 16, 2024)

### Challenge
User wanted a waitlist page with animated dot matrix background. Initial attempts to manually position dots failed repeatedly - dots only appeared in one row, positioning was broken, visibility issues.

### Solution
Instead of manual HTML/CSS, we used professional third-party components:

1. **Magic UI Animated Grid Pattern** (`/src/blocks/WaitlistLanding`)
   - Installed via: `npx shadcn@latest add "https://magicui.design/r/animated-grid-pattern"`
   - Creates animated squares that fade in/out randomly
   - Perfect metaphor for "community connections lighting up"
   - Component at: `/src/components/magicui/animated-grid-pattern.tsx`

2. **Aceternity-style Static Grid** (`/src/blocks/WaitlistStatic`)
   - Clean grid lines with radial gradient fade
   - More professional/established feel
   - Muted slate color palette with blue-purple gradient text
   - Slimmed down form with "Stay Informed" CTA (less commitment than "Join Waitlist")

### Key Features Added
- **Layout Control**: Pages can now be "Standard" (with header/footer) or "Landing" (without)
  - Field added to Pages collection: `layoutType`
  - Root layout conditionally renders based on this field
- **Two Waitlist Blocks**: User can A/B test animated vs static grid
- **Full-width blocks**: Hero, RawHTML, and Waitlist blocks render without margins

### Files Created/Modified
- `/src/blocks/WaitlistLanding/` - Animated grid component
- `/src/blocks/WaitlistStatic/` - Static grid component  
- `/src/collections/Pages/index.ts` - Added new blocks and layout control
- `/src/blocks/RenderBlocks.tsx` - Added new components to renderer
- `/src/app/(frontend)/layout.tsx` - Conditional header/footer rendering

### Deployment Considerations
- New dependency: `motion` (for Magic UI component)
- Both blocks are production-ready
- No additional environment variables needed
- Content must be added via PayloadCMS admin after deployment

## Notes
- Project has test setup with Playwright and Vitest
- Footer enhancements ready for production deployment
- CMS content (footer columns) must be added separately on production after deployment
- **CRITICAL**: Deployment is fragile - previous attempts took hours. Review deployment section carefully!