# Connie.one Project Context

## Project Overview
- Next.js/Payload CMS project for connie.one
- Connie is a startup CPAAS for nonprofits (digital transformation, ops efficiency, scale impact)
- Main CPAAS at https://connie.team (Twilio Flex backend)
- Tenant portal at https://portal.connie.team (uses Okta + My Apps)
- Currently evaluating authentication for connie.one dataroom
- Project structure includes main site, dataroom feature, and CMS admin

## Current Status
- **Authentication Evaluation**: In progress
- Strongly considering Okta for authentication
- Need to understand business logic/rationale for Okta selection
- No final decision made yet

## Key Technical Components
- Next.js frontend with Payload CMS
- Dataroom feature for document access
- Theme system with light/dark modes
- File structure includes collections (Users, Posts, Pages, Media)

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

## Next Steps
1. ✅ Complete authentication provider evaluation (Okta selected)
2. ✅ Document business case for Okta (documented)
3. Research NextAuth + Okta OIDC integration approach
4. Plan safe implementation strategy
5. Implement chosen solution

## Notes
- No git repo initialized in current directory
- CLAUDE.md is local-only, no server/CI/CD impact
- Project has test setup with Playwright and Vitest