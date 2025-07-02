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

### Known Issues
- New content requires rebuild to appear on static pages (ISR will fix this)
- Seed route disabled due to TypeScript compatibility issue

Last updated: 2025-07-01