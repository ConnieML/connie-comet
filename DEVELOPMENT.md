# Connie Comet - Development Roadmap

## Future Development Tasks

### High Priority
- [ ] **OKTA SSO Integration** - Replace default auth with Okta OAuth flow, integrate with existing "My Apps" dashboard
- [ ] **DataRoom Functionality** - Recreate document portal using existing Media/Categories collections + new Documents collection. Previous implementation used S3 bucket `connie-one-dataroom`, Clerk auth, fast loading with multiple file sizes. Can leverage existing Payload infrastructure for 80% of functionality.
- [ ] **Temporary Landing Page Theme** - Clean, simple theme for content team to build upon
- [ ] **Enable Incremental Static Regeneration (ISR)** - Auto-regenerate pages when content changes without full rebuilds
- [ ] **Fix TypeScript error in seed route** - Re-enable `src/app/(frontend)/next/seed/route.ts` with proper type casting

### Medium Priority  
- [ ] **Implement Okta OAuth integration** - Original requirement for SSO authentication
- [ ] **Set up staging environment** - Create dev/staging/prod workflow
- [ ] **Configure backup strategy** - MongoDB Atlas backup verification and restore testing
- [ ] **Add monitoring/logging** - CloudWatch integration for error tracking
- [ ] **Optimize build times** - Investigate caching strategies for faster deployments

### Low Priority
- [ ] **Custom error pages** - 404, 500 error page design
- [ ] **Performance optimization** - Bundle size analysis and optimization
- [ ] **SEO enhancements** - Meta tags, sitemaps, robots.txt optimization
- [ ] **Content migration tools** - If migrating from existing CMS
- [ ] **API documentation** - Document Payload CMS API endpoints for integrations

### Technical Debt
- [ ] **Environment variable cleanup** - Review and consolidate unused env vars
- [ ] **Dependencies audit** - Regular security updates and version management
- [ ] **Code organization** - Review and refactor as needed

---

## Development Workflow Notes

### Current Stack
- **CMS**: Payload CMS 3.44.0
- **Framework**: Next.js 15.3.3
- **Database**: MongoDB Atlas
- **Hosting**: AWS Amplify
- **Package Manager**: pnpm (required)

### Deployment Process
1. Make changes locally
2. Test with `pnpm dev`
3. Commit and push to GitHub
4. Auto-deployment via AWS Amplify
5. Verify changes on live site

### DataRoom Portal Authentication

**Current Status:** Authentication is temporarily disabled for content setup (as of Oct 2025)

**Affected Files:** 15 files in `/src/app/(frontend)/dataroom-portal/`
- 3 parent landing pages (bizops, investors, techops)
- 12 child category pages (operations, finance, legal, strategy, business, financial, quarterly, technical, apis, architecture, infrastructure, security)

**To Re-enable Authentication:**

Use this prompt with Claude:
```
Re-enable authentication on all dataroom-portal pages by reverting the temporary
auth bypass. Search for "TEMP: Auth disabled for content setup" comments and
restore the original Okta authentication checks.
```

**To Switch to Different Auth System:**

Use this prompt with Claude:
```
Replace Okta authentication with [NEW AUTH SYSTEM] on all dataroom-portal pages.
Currently marked with "TEMP: Auth disabled for content setup" comments.
```

**What Changed:**
- Initial auth state: `useState(true)` instead of `useState(false)`
- useEffect: Removed `/api/users/me` auth check, loads documents directly
- All pages marked with `// TEMP: Auth disabled for content setup` comments

### Known Issues
- New content requires rebuild to appear on static pages (ISR will fix this)
- Seed route disabled due to TypeScript compatibility issue
- DataRoom authentication temporarily disabled (Oct 2025)

---

## Infrastructure Updates

### Email Service Configuration (Nov 3, 2025)
- **Resend Email Service**: DNS verification completed for `send.connie.one`
- **Account**: Created with chris@chrisberno.dev (Gmail)
- **DNS Records**: DKIM, SPF, MX, DMARC configured via AWS Route53
- **Status**: ✅ Verified and operational
- **Documentation**: [Complete DNS Verification Guide](/docs/DNS-RESEND-VERIFICATION-COMPLETE.md)
- **Available Sending Addresses**: `*@send.connie.one`

### Email Templates & Scripts (Nov 3, 2025)
- **Location**: `/emails/` directory in project root
- **Templates**: UAT invitation email (HTML + React versions)
- **Scripts**: Automated sending scripts using Resend API
- **Documentation**: [Email Templates Guide](/emails/README.md)
- **Quick Start**: See `/emails/docs/CONNIE-UAT-EMAIL-SETUP.md`

**Directory Structure:**
```
/emails/
├── templates/          ← Email templates (HTML, React)
├── scripts/            ← Sending scripts
├── data/               ← Example recipients
└── docs/               ← Email documentation
```

### UAT Discovery Form System (Nov 7, 2025)
- **Production URL**: https://connie.one/dataroom/user-acceptance-testing/discovery
- **Status**: ✅ Complete and deployed
- **Components**:
  - Multi-step discovery form (6 sections)
  - Google Sheets integration for data storage
  - Resend email notifications on submission
  - Batch invitation system for cohort outreach
  - Legal pages (AUP, Terms of Service, Privacy Policy)
  - Simple homepage for connie.one
- **Documentation**:
  - **Technical Guide**: [/UAT-Intake-form/DEVELOPMENT-GUIDE.md](/UAT-Intake-form/DEVELOPMENT-GUIDE.md)
  - **Quick Reference**: [/UAT-Intake-form/README.md](/UAT-Intake-form/README.md)
  - **Workflow Process**: [connie.center/forms/UAT-Intake/UAT-WORKFLOW.md](../../connie.center/forms/UAT-Intake/UAT-WORKFLOW.md)

**Key Features**:
- **Data Collection**: Captures organization info, contact details, communication workflows, technical environment, and UAT participation preferences
- **Storage**: Automated submission to Google Sheets "Connie UAT Discovery Form - Submissions"
- **Notifications**: Email alerts to cberno@nevadaseniorservices.org and admin@connie.direct
- **Batch Invitations**: Script-based personalized email sending with campaign tracking
- **Legal Compliance**: Acceptance of AUP, Terms, Privacy Policy, and UAT MOU
- **Professional Design**: Responsive, accessible, multi-step form with progress indicator

**Technical Stack**:
- Frontend: Next.js 15.3.3 + Tailwind CSS
- Backend: Next.js API Routes + Google Sheets API v4
- Email: Resend (send.connie.one)
- Deployment: AWS Amplify with auto-deployment from GitHub

**Team Impact**:
This system establishes a scalable, repeatable process for UAT cohort onboarding that can be used for future testing programs across the Connie platform.

Last updated: 2025-11-07