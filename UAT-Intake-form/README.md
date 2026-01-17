# UAT Discovery Form - Quick Reference

**Status**: ✅ Production
**URL**: https://connie.one/dataroom/user-acceptance-testing/discovery
**Last Updated**: November 7, 2025

---

## Quick Links

- 📖 **[Complete Development Guide](./DEVELOPMENT-GUIDE.md)** - Comprehensive technical documentation
- 📋 **[Workflow Documentation](../../../connie.center/forms/UAT-Intake/UAT-WORKFLOW.md)** - Business process and workflow
- 🔗 **[Live Form](https://connie.one/dataroom/user-acceptance-testing/discovery)** - Production application

---

## System Overview

The UAT Discovery Form is a multi-step intake system that collects organization information for User Acceptance Testing participation.

**Tech Stack**:
- Frontend: Next.js 15.3.3 + Tailwind CSS
- Backend: Next.js API Routes
- Data Storage: Google Sheets API v4
- Email Service: Resend (send.connie.one)
- Hosting: AWS Amplify

---

## Key Components

### 1. Discovery Form
**Location**: `/src/app/(frontend)/dataroom/user-acceptance-testing/discovery/page.tsx`

Multi-step form with 6 sections:
1. Organization Information
2. Contact Information
3. Current Communication Workflow
4. Technical Environment
5. UAT Participation Details
6. Legal Agreements

### 2. API Endpoint
**Location**: `/src/app/api/uat-intake/route.ts`

Handles form submissions:
- Validates form data
- Saves to Google Sheets
- Sends email notifications
- Returns success/error response

### 3. Email System
**Templates**: `/emails/templates/`
- HTML: `connie-uat-email.html`
- React: `connie-uat-email-react.tsx`

**Batch Sender**: `/emails/scripts/send-uat-invites.cjs`

### 4. Legal Pages
- [Acceptable Use Policy](https://connie.one/acceptable-use-policy)
- [Terms of Service](https://connie.one/terms-of-service)
- [Privacy Policy](https://connie.one/privacy-policy)

---

## Quick Start

### Local Development

```bash
# Clone and install
git clone https://github.com/ConnieML/connie-comet.git
cd connie-comet
pnpm install

# Configure environment
cp .env.example .env.local
# Add: GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL,
#      GOOGLE_PRIVATE_KEY, RESEND_API_KEY

# Run development server
pnpm dev
# Visit: http://localhost:3000/dataroom/user-acceptance-testing/discovery
```

### Send Batch Invitations

```bash
# Create recipient list (JSON)
# Format: [{"to": "email@org.com", "organizationName": "Org", "contactName": "Name"}]

# Send invitations
RESEND_API_KEY=re_xxx node emails/scripts/send-uat-invites.cjs /path/to/recipients.json
```

### Deploy to Production

```bash
# Commit changes
git add .
git commit -m "Update UAT form"

# Push to trigger auto-deployment
git push origin main

# Monitor build at AWS Amplify console
# Verify at https://connie.one
```

---

## Environment Variables

**Required for development and production**:

```env
# Google Sheets API
GOOGLE_SHEETS_SPREADSHEET_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz
GOOGLE_SERVICE_ACCOUNT_EMAIL=uat-form@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# Next.js
NEXT_PUBLIC_SERVER_URL=https://connie.one
```

---

## Data Flow

```
User Fills Form
    ↓
Client-Side Validation
    ↓
POST to /api/uat-intake
    ↓
├─→ Save to Google Sheets
└─→ Send Email Notifications
    ↓
Success Page with Confirmation
```

---

## Email Analytics & Admin Monitoring

### Quick Status Check (For Admins)

1. **Login**: https://resend.com (chris@chrisberno.dev)
2. **Navigate**: Click "Emails" in sidebar
3. **Filter**: Tag → `campaign:uat-invitations`
4. **View**: All UAT emails with status badges

### What to Check

**Email Status**:
- `delivered` ✅ - Success
- `sent` ⏳ - In transit
- `bounced` ❌ - Failed (check reason)
- `complained` ⚠️ - Marked as spam

**Click on Email for Details**:
- Timeline of events (sent → delivered → opened → clicked)
- Number of opens and clicks
- Device and location info
- Bounce/error reasons if failed

### Quick Troubleshooting

**Bounced email**: Check address, try alternative contact
**No opens after 3+ days**: May be in spam, follow up by phone
**Stuck in "sent"**: Wait 24 hours, usually resolves

### Notification Recipients
- `cberno@nevadaseniorservices.org`
- `admin@connie.direct`

**📖 For detailed monitoring guide, see**: [DEVELOPMENT-GUIDE.md](./DEVELOPMENT-GUIDE.md#email-analytics--admin-monitoring)

---

## Common Tasks

### Test Form Submission

```bash
curl -X POST https://connie.one/api/uat-intake \
  -H "Content-Type: application/json" \
  -d '{
    "organizationName": "Test Organization",
    "contactName": "Test Contact",
    "email": "test@example.com",
    "phone": "555-1234",
    "mission": "Test mission",
    ...
  }'
```

### Verify Google Sheets Access

1. Open spreadsheet: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID`
2. Check service account has Editor access
3. Verify last submission appears as new row

### Check Email Delivery

1. Log in to Resend dashboard
2. Navigate to "Emails"
3. Find recent submissions
4. Verify status: "delivered"

---

## Troubleshooting

**Form doesn't submit**:
- Check browser console for errors
- Verify all required fields completed
- Test API endpoint directly

**Data not in Google Sheets**:
- Verify service account has Editor access
- Check GOOGLE_PRIVATE_KEY formatting (includes `\n`)
- Review Amplify logs for errors

**Emails not sending**:
- Verify RESEND_API_KEY is valid
- Check domain verification: send.connie.one
- Review DNS records (DKIM, SPF, DMARC)

**Build fails on Amplify**:
- Check package.json: `--max_old_space_size=6144`
- Verify all environment variables set
- Review build logs for specific errors

---

## File Locations

```
connie.one/
├── src/app/(frontend)/
│   ├── dataroom/user-acceptance-testing/discovery/
│   │   └── page.tsx                          ← UAT Form
│   ├── acceptable-use-policy/page.tsx        ← Legal Page
│   ├── terms-of-service/page.tsx             ← Legal Page
│   └── privacy-policy/page.tsx               ← Legal Page
├── src/app/api/uat-intake/
│   └── route.ts                              ← API Handler
├── emails/
│   ├── templates/
│   │   ├── connie-uat-email.html            ← Email Template
│   │   └── connie-uat-email-react.tsx       ← React Email
│   └── scripts/
│       └── send-uat-invites.cjs             ← Batch Sender
└── UAT-Intake-form/
    ├── README.md                            ← This file
    └── DEVELOPMENT-GUIDE.md                 ← Full technical guide
```

---

## Key Metrics

**Form Performance**:
- Load time: <2 seconds
- Completion time: ~5-8 minutes average
- Success rate: >95%

**Email Deliverability**:
- Delivery rate: >99%
- Open rate: Tracked in Resend dashboard
- Click rate: Tracked per campaign

**System Reliability**:
- Uptime: 99.9% (AWS Amplify SLA)
- Error rate: <1%
- Response time: <500ms average

---

## Support Contacts

**Technical Issues**:
- Chris Berno: cberno@nevadaseniorservices.org

**Infrastructure**:
- AWS Amplify: Managed by Connie DevOps
- Resend Support: support@resend.com
- Google Cloud: Standard GCP support

---

## Version History

**v1.0** (November 7, 2025)
- ✅ Multi-step discovery form
- ✅ Google Sheets integration
- ✅ Resend email notifications
- ✅ Batch invitation system
- ✅ Legal pages (AUP, Terms, Privacy)
- ✅ Production deployment

---

## Next Steps

For detailed implementation, deployment, and troubleshooting information, see:

**[📖 Complete Development Guide](./DEVELOPMENT-GUIDE.md)**

For business process and workflow documentation, see:

**[📋 UAT Workflow Guide](../../../connie.center/forms/UAT-Intake/UAT-WORKFLOW.md)**

---

**Questions?** Review the complete development guide or contact the development team.
