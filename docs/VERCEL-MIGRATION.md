# Vercel Migration Plan for connie.one

**🎯 Goal:** Migrate from AWS Amplify to Vercel for modern deployment workflow

**📋 Todo Reference:** This file supports todo item #8 - delete this file after migration completion

## Why Vercel?
- **30-second deployments** vs 5+ minute Amplify builds
- **Instant preview URLs** for every PR
- **Zero config** Next.js deployment 
- **Better error messages** and build logs
- **Edge functions** for API optimization

## Pre-Migration Checklist
- [ ] Backup current environment variables from Amplify
- [ ] Document current deployment configuration
- [ ] Test build locally with `pnpm build`
- [ ] Ensure all team members have GitHub access

## Migration Steps

### 1. Vercel Account Setup
- Create Vercel account (free tier works)
- Connect GitHub account
- Import repository: `ConnieML/connie-comet`

### 2. Environment Variables Transfer
Copy these from AWS Amplify to Vercel dashboard:

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
S3_ACCESS_KEY_ID=***REDACTED***
S3_SECRET_ACCESS_KEY=***REDACTED***
S3_REGION=us-east-1
```

### 3. Build Configuration
Vercel should auto-detect Next.js, but verify:
- **Build Command:** `pnpm build`  
- **Output Directory:** `.next`
- **Install Command:** `pnpm install`
- **Node Version:** 20.x

### 4. Custom Domain Setup
- Add `connie.one` domain in Vercel dashboard
- Update DNS to point to Vercel (they provide instructions)
- Enable SSL (automatic)

### 5. Deploy & Test
- Push any commit to trigger first deploy
- Test all UAT system functionality
- Verify PayloadCMS admin works
- Check dataroom authentication

### 6. Post-Migration Cleanup
- [ ] Update team deployment documentation
- [ ] Remove AWS Amplify project (after confirming everything works)
- [ ] Update CLAUDE.md deployment section
- [ ] **DELETE THIS FILE** ← Important: No cruft!

## Rollback Plan
Keep Amplify running until 48 hours after successful Vercel deployment, then decommission.

## Team Communication
**Subject:** Deployment Platform Migration - connie.one moving to Vercel

**Message:** We're migrating our deployment from AWS Amplify to Vercel for faster, more reliable deployments. Expect 30-second deployments instead of 5+ minutes, plus instant preview URLs for testing changes.

Timeline: [Date TBD]
Impact: Minimal downtime during DNS switchover

---
**Created:** August 18, 2025  
**Status:** Planning Phase  
**Delete After:** Migration completion ✅