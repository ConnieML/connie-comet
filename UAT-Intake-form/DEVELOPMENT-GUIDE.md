# UAT Discovery Form - Comprehensive Development Guide

**Document Purpose**: Complete technical training manual for building and deploying the Connie UAT Discovery Form system

**Prepared by**: Connie Development Team
**Date**: November 2025
**Version**: 1.0

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [System Components](#system-components)
4. [Development Workflow](#development-workflow)
5. [Form Implementation](#form-implementation)
6. [Backend Integration](#backend-integration)
7. [Email System](#email-system)
8. [Legal Pages](#legal-pages)
9. [Testing & Validation](#testing--validation)
10. [Deployment Process](#deployment-process)
11. [Troubleshooting](#troubleshooting)
12. [Best Practices](#best-practices)

---

## Project Overview

### Purpose

The UAT Discovery Form is a comprehensive intake system designed to collect detailed information from organizations interested in participating in Connie's User Acceptance Testing (UAT) program. The system captures organizational details, contact information, current communication workflows, and technical requirements.

### Business Goals

- **Streamline Onboarding**: Automate collection of organization information for UAT participation
- **Data Centralization**: Store all UAT applications in Google Sheets for easy review and analysis
- **Professional Communication**: Send branded email notifications to track new applications
- **Legal Compliance**: Present and track acceptance of terms, privacy policy, and acceptable use policy
- **Scalable Process**: Create repeatable workflow for future UAT cohorts

### Success Metrics

- ✅ Form completion rate: 85%+ of started applications
- ✅ Data quality: 95%+ complete submissions
- ✅ Email deliverability: 99%+ successful notifications
- ✅ Processing time: <60 seconds from submission to notification
- ✅ User satisfaction: Clear, professional experience

---

## Architecture & Tech Stack

### Frontend Stack

**Framework**: Next.js 15.3.3 (App Router)
- React-based framework for server-rendered applications
- App Router architecture for modern routing patterns
- Server and Client Components for optimal performance

**Styling**: Tailwind CSS
- Utility-first CSS framework
- Custom design tokens for Connie branding
- Responsive design with mobile-first approach

**Form Management**: React Hook Form + Custom State
- Client-side validation
- Multi-step form state management
- Error handling and user feedback

### Backend Stack

**Runtime**: Node.js (Next.js API Routes)
- Serverless function architecture
- Built-in API routing via `/app/api/` directory
- TypeScript for type safety

**Database**: Google Sheets (via Sheets API v4)
- Simple, accessible data storage
- Easy export to CSV/Excel for analysis
- Real-time collaboration for team review
- No complex database setup required

**Email Service**: Resend
- Modern transactional email API
- High deliverability rates
- Email tracking (opens, clicks, bounces)
- Tag-based campaign organization

### Infrastructure

**Hosting**: AWS Amplify
- Auto-deployment from GitHub
- Environment variable management
- Build optimization with custom heap size
- HTTPS by default

**DNS**: AWS Route 53
- Custom domain management
- Email domain verification (send.connie.one)
- DKIM, SPF, DMARC configuration

**Version Control**: GitHub
- Source code repository: `ConnieML/connie-comet`
- Automated CI/CD pipeline
- Production branch: `main`

---

## System Components

### 1. Discovery Form Page

**Location**: `/src/app/(frontend)/dataroom/user-acceptance-testing/discovery/page.tsx`

**Key Features**:
- Multi-step form with 6 sections
- Real-time client-side validation
- Progress indicator
- Responsive design (mobile/tablet/desktop)
- Legal document acceptance tracking
- Accessibility features (ARIA labels, keyboard navigation)

**Form Sections**:

1. **Organization Information**
   - Organization Name
   - Mission Statement
   - Organization Type (dropdown)
   - Number of Staff Members
   - Number of Volunteers

2. **Contact Information**
   - Primary Contact Name
   - Title/Role
   - Email Address
   - Phone Number
   - Preferred Communication Method

3. **Current Communication Workflow**
   - Incoming Communication Channels (multi-select)
   - Outgoing Communication Channels (multi-select)
   - Current System/Tools
   - Primary Pain Points (textarea)

4. **Technical Environment**
   - Current CRM/Database
   - IT Support Availability
   - Remote Work Setup
   - Technical Comfort Level

5. **UAT Participation**
   - Preferred Start Date
   - Available Testing Hours per Week
   - Team Size for Testing
   - Specific Features of Interest

6. **Legal Agreements**
   - Acceptable Use Policy (checkbox + link)
   - Terms of Service (checkbox + link)
   - Privacy Policy (checkbox + link)
   - UAT Cohort Team MOU (checkbox + link)

### 2. API Endpoint

**Location**: `/src/app/api/uat-intake/route.ts`

**Purpose**: Handle form submissions, validate data, send to Google Sheets, trigger email notifications

**Request Flow**:
```
1. Receive POST request with form data
2. Validate required fields
3. Append row to Google Sheets
4. Send notification emails via Resend
5. Return success/error response
```

**Google Sheets Integration**:
- Sheet Name: "Connie UAT Discovery Form - Submissions"
- Authentication: Service Account with JSON credentials
- API: Google Sheets API v4
- Permissions: Editor access for service account

**Email Notifications**:
- Recipients: `cberno@nevadaseniorservices.org`, `admin@connie.direct`
- From: `Connie UAT Program <uat@send.connie.one>`
- Subject: "New UAT Discovery Form Submission - [Organization Name]"
- Format: HTML email with formatted submission data

### 3. Email Templates

**HTML Template**: `/emails/templates/connie-uat-email.html`
- Professional branded design
- Internal test alert banner
- Personalized greeting
- Call-to-action button
- Footer with contact information

**React Email Template**: `/emails/templates/connie-uat-email-react.tsx`
- Uses `@react-email/components`
- Matches HTML template design
- Type-safe template rendering
- Easy customization

**Key Design Elements**:
- Connie branding (indigo color scheme)
- Responsive layout
- Clear hierarchy
- Personalization tokens: `{{organizationName}}`, `{{contactName}}`

### 4. Batch Invitation System

**Script**: `/emails/scripts/send-uat-invites.cjs`

**Purpose**: Send UAT invitation emails to multiple recipients in batch

**Features**:
- Reads recipient list from JSON file
- Sanitizes organization names for email tags
- Personalizes each email
- Tracks campaign with tags (`campaign: uat-invitations`)
- Error handling and retry logic

**Configuration**:
```javascript
const CONFIG = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  FROM_EMAIL: 'Connie UAT Program <uat@send.connie.one>',
  SUBJECT: 'You\'re Invited: Connie UAT Cohort Program',
  TEMPLATE_PATH: './emails/templates/connie-uat-email.html'
}
```

**Usage**:
```bash
RESEND_API_KEY=your_key node emails/scripts/send-uat-invites.cjs /path/to/recipients.json
```

### 5. Legal Pages

**Acceptable Use Policy**: `/src/app/(frontend)/acceptable-use-policy/page.tsx`
- 8 major sections
- Prohibited activities
- Service integrity guidelines
- Data safeguards
- Nonprofit considerations
- Contact information

**Terms of Service**: `/src/app/(frontend)/terms-of-service/page.tsx`
- 10 major sections
- Table of contents with anchor links
- Important notice banner
- GDPR and compliance sections
- Highlighted disclaimers

**Privacy Policy**: `/src/app/(frontend)/privacy-policy/page.tsx`
- 14 comprehensive sections
- GDPR rights (EU residents)
- CCPA rights (California residents)
- Cookie and tracking technologies
- International data transfers

**Design Pattern**:
- Consistent layout across all pages
- Professional SaaS-style design
- Section navigation
- Contact information
- Nevada Senior Services branding

### 6. Homepage

**Location**: `/src/app/(frontend)/page.tsx`

**Purpose**: Simple landing page for connie.one

**Features**:
- Centered Connie logo
- "Future Home of Connie.one" heading
- Quick-access buttons to:
  - Document Portal (`/dataroom`)
  - UAT Discovery Form (`/dataroom/user-acceptance-testing/discovery`)
- Copyright footer

---

## Development Workflow

### Initial Setup

1. **Clone Repository**
```bash
git clone https://github.com/ConnieML/connie-comet.git
cd connie-comet
```

2. **Install Dependencies**
```bash
# Must use pnpm (required by project)
npm install -g pnpm
pnpm install
```

3. **Configure Environment Variables**
```bash
cp .env.example .env.local
```

Required variables:
```env
# Google Sheets API
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# PayloadCMS
PAYLOAD_SECRET=your_secret_here
DATABASE_URI=mongodb+srv://...
```

4. **Start Development Server**
```bash
pnpm dev
```

Access at: `http://localhost:3000`

### Development Process

**Step 1: Create Feature Branch** (Optional for solo development)
```bash
git checkout -b feature/uat-form-enhancements
```

**Step 2: Make Changes**
- Edit files in `/src/app/(frontend)/` for pages
- Edit files in `/src/app/api/` for API routes
- Test changes locally with `pnpm dev`

**Step 3: Test Locally**
```bash
# Start dev server
pnpm dev

# In another terminal, test build
pnpm build

# Check for TypeScript errors
npx tsc --noEmit
```

**Step 4: Commit Changes**
```bash
git add .
git commit -m "Add feature: UAT form multi-step validation"
```

**Step 5: Push to GitHub**
```bash
git push origin main
```

**Step 6: Monitor Deployment**
- AWS Amplify automatically builds and deploys
- Check build status in AWS Amplify console
- Verify changes at https://connie.one

### Code Organization

```
connie.one/
├── src/
│   ├── app/
│   │   ├── (frontend)/
│   │   │   ├── dataroom/
│   │   │   │   └── user-acceptance-testing/
│   │   │   │       └── discovery/
│   │   │   │           └── page.tsx          ← UAT Form
│   │   │   ├── acceptable-use-policy/
│   │   │   │   └── page.tsx                  ← AUP Page
│   │   │   ├── terms-of-service/
│   │   │   │   └── page.tsx                  ← Terms Page
│   │   │   ├── privacy-policy/
│   │   │   │   └── page.tsx                  ← Privacy Page
│   │   │   └── page.tsx                      ← Homepage
│   │   └── api/
│   │       └── uat-intake/
│   │           └── route.ts                  ← API Handler
│   └── components/                           ← Reusable components
├── emails/
│   ├── templates/
│   │   ├── connie-uat-email.html            ← HTML Email
│   │   └── connie-uat-email-react.tsx       ← React Email
│   └── scripts/
│       └── send-uat-invites.cjs             ← Batch Sender
└── UAT-Intake-form/                          ← Documentation (this file)
```

---

## Form Implementation

### Multi-Step Form Architecture

**State Management**:
```typescript
const [currentStep, setCurrentStep] = useState(1)
const [formData, setFormData] = useState({
  // All form fields initialized here
  organizationName: '',
  mission: '',
  // ... more fields
})
```

**Step Navigation**:
```typescript
const nextStep = () => {
  if (currentStep < 6) {
    setCurrentStep(currentStep + 1)
    window.scrollTo(0, 0)
  }
}

const prevStep = () => {
  if (currentStep > 1) {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }
}
```

**Progress Indicator**:
```tsx
<div className="mb-8">
  <div className="flex justify-between mb-2">
    {[1, 2, 3, 4, 5, 6].map((step) => (
      <div
        key={step}
        className={`h-2 flex-1 mx-1 rounded ${
          step <= currentStep ? 'bg-indigo-600' : 'bg-gray-200'
        }`}
      />
    ))}
  </div>
  <p className="text-sm text-gray-600 text-center">
    Step {currentStep} of 6
  </p>
</div>
```

### Form Validation

**Client-Side Validation**:
```typescript
const validateStep = () => {
  switch (currentStep) {
    case 1:
      return formData.organizationName && formData.mission
    case 2:
      return formData.contactName && formData.email && formData.phone
    case 3:
      return formData.incomingChannels.length > 0
    case 4:
      return formData.currentCRM
    case 5:
      return formData.preferredStartDate
    case 6:
      return formData.acceptAUP && formData.acceptTerms &&
             formData.acceptPrivacy && formData.acceptMOU
    default:
      return true
  }
}
```

**Email Validation**:
```typescript
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
```

**Phone Validation**:
```typescript
const isValidPhone = (phone: string) => {
  return /^[\d\s\-\(\)]+$/.test(phone)
}
```

### Form Submission

**Submit Handler**:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!validateStep()) {
    setError('Please complete all required fields')
    return
  }

  setSubmitting(true)
  setError('')

  try {
    const response = await fetch('/api/uat-intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      throw new Error('Submission failed')
    }

    setSuccess(true)
  } catch (err) {
    setError('An error occurred. Please try again.')
  } finally {
    setSubmitting(false)
  }
}
```

### Responsive Design

**Mobile-First Approach**:
```tsx
<div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50
                py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-3xl mx-auto">
    <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12">
      {/* Form content */}
    </div>
  </div>
</div>
```

**Breakpoints**:
- `sm:` - 640px and up (tablets)
- `md:` - 768px and up (small desktops)
- `lg:` - 1024px and up (large desktops)

---

## Backend Integration

### Google Sheets API Setup

**Step 1: Create Google Cloud Project**
1. Go to https://console.cloud.google.com
2. Create new project: "Connie UAT Forms"
3. Enable Google Sheets API

**Step 2: Create Service Account**
1. Navigate to IAM & Admin → Service Accounts
2. Create service account: "uat-form-submissions"
3. Download JSON credentials
4. Extract `client_email` and `private_key`

**Step 3: Configure Spreadsheet**
1. Create new Google Sheet
2. Share with service account email (Editor access)
3. Copy spreadsheet ID from URL

**Step 4: Set Environment Variables**
```env
GOOGLE_SHEETS_SPREADSHEET_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz
GOOGLE_SERVICE_ACCOUNT_EMAIL=uat-form@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### API Route Implementation

**Location**: `/src/app/api/uat-intake/route.ts`

**Full Implementation**:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // 1. Authenticate with Google Sheets
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      undefined,
      process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets']
    )

    const sheets = google.sheets({ version: 'v4', auth })

    // 2. Prepare row data
    const row = [
      new Date().toISOString(),
      formData.organizationName,
      formData.contactName,
      formData.email,
      formData.phone,
      // ... all form fields
    ]

    // 3. Append to spreadsheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A:Z',
      valueInputOption: 'RAW',
      requestBody: {
        values: [row]
      }
    })

    // 4. Send notification email
    await resend.emails.send({
      from: 'Connie UAT Program <uat@send.connie.one>',
      to: ['cberno@nevadaseniorservices.org', 'admin@connie.direct'],
      subject: `New UAT Discovery Form Submission - ${formData.organizationName}`,
      html: generateEmailHTML(formData)
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error processing submission:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}
```

### Error Handling

**Common Errors**:

1. **Google Sheets Authentication Failure**
```typescript
if (!process.env.GOOGLE_PRIVATE_KEY) {
  throw new Error('GOOGLE_PRIVATE_KEY not configured')
}
```

2. **Spreadsheet Permission Error**
```typescript
// Ensure service account has Editor access
// Check spreadsheet sharing settings
```

3. **Email Sending Failure**
```typescript
try {
  await resend.emails.send(...)
} catch (emailError) {
  console.error('Email failed:', emailError)
  // Still return success if data was saved
  return NextResponse.json({
    success: true,
    emailWarning: 'Notification email failed'
  })
}
```

---

## Email System

### Resend Setup

**Step 1: Create Account**
1. Sign up at https://resend.com
2. Verify email address
3. Add domain for sending

**Step 2: DNS Configuration**
1. Add domain: `send.connie.one`
2. Configure DNS records in Route 53:

```
# DKIM Record
Type: TXT
Name: resend._domainkey.send.connie.one
Value: [Provided by Resend]

# SPF Record
Type: TXT
Name: send.connie.one
Value: v=spf1 include:_spf.resend.com ~all

# DMARC Record
Type: TXT
Name: _dmarc.send.connie.one
Value: v=DMARC1; p=none; rua=mailto:admin@connie.one
```

3. Wait for verification (usually 5-15 minutes)

**Step 3: Get API Key**
1. Navigate to API Keys in Resend dashboard
2. Create new API key: "Connie UAT Forms Production"
3. Copy key and add to environment variables

### Email Template Design

**HTML Email Structure**:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UAT Invitation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <!-- Header with logo -->
    <tr>
      <td style="padding: 40px; background-color: #4f46e5;">
        <h1 style="color: white;">Connie</h1>
      </td>
    </tr>

    <!-- Internal Test Alert -->
    <tr>
      <td style="background-color: #fff3cd; padding: 16px;">
        <p>⚠️ Internal Test - Forward feedback to Chris</p>
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding: 40px;">
        <h2>Hi, {{contactName}}!</h2>
        <p>We're excited to invite {{organizationName}} to participate...</p>

        <!-- CTA Button -->
        <a href="https://connie.one/dataroom/user-acceptance-testing/discovery"
           style="background-color: #4f46e5; color: white; padding: 12px 24px;">
          Complete Discovery Form
        </a>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 40px; background-color: #f8f9fa;">
        <p>Connie</p>
        <p>By Nevada Senior Services, Inc</p>
        <p>901 North Jones Boulevard<br>Las Vegas, NV 89108</p>
      </td>
    </tr>
  </table>
</body>
</html>
```

**Personalization Tokens**:
- `{{organizationName}}` - Replaced with organization name
- `{{contactName}}` - Replaced with contact's first name
- `{{formUrl}}` - Replaced with form URL

### Batch Email Sending

**Recipient List Format** (`recipients.json`):
```json
[
  {
    "to": "contact@organization.org",
    "organizationName": "Organization Name",
    "contactName": "Contact First Name"
  },
  {
    "to": "another@example.org",
    "organizationName": "Another Org",
    "contactName": "Jane"
  }
]
```

**Sending Script**:
```javascript
const fs = require('fs')
const fetch = require('node-fetch')

// Load template
const template = fs.readFileSync('./emails/templates/connie-uat-email.html', 'utf8')

// Load recipients
const recipients = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))

// Send emails
for (const recipient of recipients) {
  // Personalize template
  const html = template
    .replace(/\{\{organizationName\}\}/g, recipient.organizationName)
    .replace(/\{\{contactName\}\}/g, recipient.contactName)

  // Sanitize org name for tag
  const sanitizedOrgName = recipient.organizationName.replace(/[^a-zA-Z0-9_-]/g, '-')

  // Send via Resend API
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: 'Connie UAT Program <uat@send.connie.one>',
      to: [recipient.to],
      subject: 'You\'re Invited: Connie UAT Cohort Program',
      html: html,
      tags: [
        { name: 'campaign', value: 'uat-invitations' },
        { name: 'organization', value: sanitizedOrgName }
      ]
    })
  })

  const result = await response.json()
  console.log(`Sent to ${recipient.to}:`, result.id)
}
```

**Tag Sanitization**:
Resend tags must only contain ASCII letters, numbers, underscores, or dashes:
```javascript
const sanitizedOrgName = organizationName.replace(/[^a-zA-Z0-9_-]/g, '-')
```

### Email Analytics & Admin Monitoring

#### For Admins: How to Check Email Status in Resend

**Quick Access**:
1. Go to: https://resend.com
2. Log in with: chris@chrisberno.dev (Gmail account)
3. Click "Emails" in left sidebar

**Viewing All UAT Invitations**:
1. In the Emails page, look for the search/filter area at the top
2. Click on "Tags" filter
3. Select or type: `campaign:uat-invitations`
4. All UAT invitation emails will display

**Understanding Email Status**:

Each email shows:
- **Status Badge** (top right of each row):
  - `delivered` - Email successfully delivered to recipient's server
  - `sent` - Email sent but delivery not yet confirmed
  - `bounced` - Email rejected (invalid address or full mailbox)
  - `complained` - Recipient marked as spam

- **Recipient Email** - Who the email was sent to
- **Subject Line** - "You're Invited: Connie UAT Cohort Program"
- **Timestamp** - When email was sent
- **Organization Tag** - Organization name (sanitized)

**Checking Individual Email Details**:
1. Click on any email row to open details
2. View comprehensive information:
   - **Timeline**: Sent, Delivered, Opened, Clicked events with timestamps
   - **Opens**: Number of times email was opened
   - **Clicks**: Which links were clicked and how many times
   - **Device Info**: Desktop vs mobile, email client used
   - **Location**: Geographic location of opens (approximate)

**Tracking Campaign Performance**:

View aggregate metrics:
- **Total Sent**: How many invitations sent
- **Delivery Rate**: % successfully delivered
- **Open Rate**: % of delivered emails opened
- **Click Rate**: % of delivered emails with link clicks
- **Bounce Rate**: % of failed deliveries

**Filtering by Organization**:
1. Use tag filter: `organization:Nevada-Senior-Services` (note: spaces become dashes)
2. See all emails sent to specific organization
3. Track organization-specific engagement

**Common Status Checks**:

**After Sending Batch**:
1. Verify all emails show `sent` or `delivered` status
2. Check for any `bounced` emails (may need address correction)
3. Note any emails stuck in `sent` (may indicate delay)

**Next Day**:
1. Check open rates
2. Identify unopened emails for potential follow-up
3. Review click-through data to see form interest

**Weekly**:
1. Track overall campaign performance
2. Compare engagement across organizations
3. Identify patterns (time of day, organization type)

**Troubleshooting Specific Issues**:

**Email shows "bounced"**:
- Click email for bounce reason
- Common causes: invalid address, full mailbox, server rejection
- Action: Verify email address, try alternative contact

**Email stuck in "sent"**:
- Usually resolves within a few hours
- May indicate temporary server issue
- Action: Wait 24 hours, check again

**Zero opens after several days**:
- May be in spam folder
- Recipient may not be checking email
- Action: Follow up via phone or alternative email

**High spam complaint rate**:
- Review email content and sender name
- Ensure recipients expected communication
- Action: Adjust messaging or recipient list

**Exporting Data**:
1. Resend dashboard doesn't have built-in export (as of Nov 2025)
2. For detailed analysis, use Resend API to fetch data
3. Or manually record key metrics in spreadsheet

**Setting Up Alerts** (Optional):
- Resend may offer webhook notifications for events
- Can configure alerts for bounces or spam complaints
- Contact Resend support for enterprise alert features

**Tracking Features**:
- ✅ Delivery status
- ✅ Open tracking (when email is viewed)
- ✅ Click tracking (when links are clicked)
- ✅ Bounce tracking (failed deliveries)
- ✅ Spam complaint tracking (recipient marked as spam)
- ✅ Device and client info (Gmail, Outlook, etc.)
- ✅ Geographic location (approximate)

**Campaign Tags Used**:
```javascript
tags: [
  { name: 'campaign', value: 'uat-invitations' },
  { name: 'organization', value: 'Nevada-Senior-Services' } // Sanitized: spaces → dashes
]
```

**Best Practices for Monitoring**:
1. Check status within 1 hour of sending batch
2. Review daily for first week
3. Track opens/clicks to gauge interest
4. Follow up on unopened emails after 1 week
5. Document bounce reasons for future list cleaning
6. Share engagement data with team for decision-making

---

## Legal Pages

### Page Structure

All legal pages follow a consistent structure for professionalism and clarity:

**Layout Pattern**:
```tsx
export default function LegalPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-slate-900">
            Page Title
          </h1>
          <p className="text-lg text-slate-600 mt-4">
            Last Updated: November 7, 2025
          </p>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-indigo-50 border-y border-indigo-100">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          {/* Navigation links */}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-12">
          {/* Sections */}
        </div>
      </div>

      {/* Contact Section */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-8 mt-12">
        {/* Contact info */}
      </section>
    </div>
  )
}
```

### Metadata for SEO

```tsx
export const metadata: Metadata = {
  title: 'Acceptable Use Policy - Connie',
  description: 'Acceptable Use Policy for Connie communication platform',
}
```

### Highlighting Important Sections

**Indigo Highlight (Primary)**:
```tsx
<div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg">
  <h3 className="text-2xl font-semibold text-slate-900 mb-4">
    Important Section Title
  </h3>
  <p className="text-slate-700 leading-relaxed">
    Content that needs emphasis...
  </p>
</div>
```

**Amber Alert (Warning)**:
```tsx
<div className="bg-amber-50 border-y border-amber-200">
  <div className="container mx-auto px-6 py-8 max-w-4xl">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 text-3xl">⚠️</div>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-900">
          Important Notice
        </h2>
        <p className="text-amber-900 leading-relaxed">
          Critical information...
        </p>
      </div>
    </div>
  </div>
</div>
```

### Anchor Links for Navigation

**Table of Contents**:
```tsx
<a
  href="#section-1"
  className="text-indigo-600 hover:text-indigo-800 underline"
>
  1. Section Title
</a>
```

**Section with ID**:
```tsx
<section id="section-1" className="scroll-mt-8">
  <h2 className="text-3xl font-semibold text-slate-900 mb-6">
    Section Title
  </h2>
  {/* Content */}
</section>
```

### Address Formatting

Single-spaced address using `<br />` tags:
```tsx
<p className="leading-relaxed">
  By Nevada Senior Services, Inc<br />
  901 North Jones Boulevard<br />
  Las Vegas, NV 89108
</p>
```

---

## Testing & Validation

### Manual Testing Checklist

**Form Validation**:
- [ ] All required fields show error when empty
- [ ] Email validation works correctly
- [ ] Phone number accepts various formats
- [ ] Multi-select checkboxes work
- [ ] Legal agreement checkboxes required
- [ ] Error messages are clear
- [ ] Success message displays after submission

**Navigation**:
- [ ] Next/Previous buttons work
- [ ] Progress indicator updates
- [ ] Can't proceed without completing required fields
- [ ] Form scrolls to top on step change

**Responsive Design**:
- [ ] Form displays correctly on mobile (320px-768px)
- [ ] Form displays correctly on tablet (768px-1024px)
- [ ] Form displays correctly on desktop (1024px+)
- [ ] Touch targets are appropriately sized (minimum 44px)
- [ ] Text is readable without zooming

**Submission Flow**:
- [ ] Data saves to Google Sheets correctly
- [ ] All fields appear in spreadsheet
- [ ] Email notifications send successfully
- [ ] Email contains all submission data
- [ ] Success page displays after submission

**Legal Pages**:
- [ ] All legal page links work
- [ ] Pages open in new tab
- [ ] Content is readable and formatted
- [ ] Table of contents navigation works
- [ ] Contact information is correct

### Automated Testing

**Email Sending Test**:
```bash
# Test with single recipient
RESEND_API_KEY=re_xxx node emails/scripts/send-uat-invites.cjs emails/data/test-recipient.json
```

**API Endpoint Test**:
```bash
# Using curl
curl -X POST https://connie.one/api/uat-intake \
  -H "Content-Type: application/json" \
  -d '{
    "organizationName": "Test Organization",
    "contactName": "Test Contact",
    "email": "test@example.com",
    ...
  }'
```

**Build Validation**:
```bash
# Ensure production build succeeds
pnpm build

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting errors
pnpm lint
```

### Google Sheets Verification

**After Submission**:
1. Open Google Sheets spreadsheet
2. Verify new row was added
3. Check timestamp is correct
4. Verify all fields populated correctly
5. Confirm formatting is readable

**Sample Spreadsheet Structure**:
| Timestamp | Organization | Contact Name | Email | Phone | ... |
|-----------|--------------|--------------|-------|-------|-----|
| 2025-11-07 10:30:00 | Nevada Senior Services | Chris | chris@nss.org | 702-555-1234 | ... |

### Email Verification

**Resend Dashboard**:
1. Log in to https://resend.com
2. Navigate to "Emails"
3. Find recent test emails
4. Verify delivery status: "delivered"
5. Check for opens/clicks (if tracked)

**Email Content Check**:
- [ ] Personalization works (org name, contact name)
- [ ] Links are clickable
- [ ] Design renders correctly in Gmail
- [ ] Design renders correctly in Outlook
- [ ] Mobile email view is readable

---

## Deployment Process

### Pre-Deployment Checklist

- [ ] **Code Review**: All changes reviewed and approved
- [ ] **Local Testing**: Form works in development environment
- [ ] **Build Success**: `pnpm build` completes without errors
- [ ] **Environment Variables**: All required variables set in AWS Amplify
- [ ] **API Keys**: Resend and Google Sheets keys are valid
- [ ] **Spreadsheet Access**: Service account has Editor permissions
- [ ] **Email Domain**: send.connie.one DNS verified
- [ ] **Legal Pages**: All content reviewed and approved

### AWS Amplify Configuration

**Build Settings** (`amplify.yml`):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - echo "GOOGLE_SHEETS_SPREADSHEET_ID=${GOOGLE_SHEETS_SPREADSHEET_ID}" >> .env.production
        - echo "GOOGLE_SERVICE_ACCOUNT_EMAIL=${GOOGLE_SERVICE_ACCOUNT_EMAIL}" >> .env.production
        - echo "GOOGLE_PRIVATE_KEY=${GOOGLE_PRIVATE_KEY}" >> .env.production
        - echo "RESEND_API_KEY=${RESEND_API_KEY}" >> .env.production
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

**CRITICAL: Memory Configuration**

The build **will fail** without proper Node.js heap size configuration.

**package.json build script**:
```json
{
  "scripts": {
    "build": "cross-env NODE_OPTIONS=\"--no-deprecation --max_old_space_size=6144\" next build"
  }
}
```

This allocates 6GB of memory to prevent heap overflow during Next.js build.

### Environment Variables in Amplify

**Navigate to**: AWS Amplify Console → App Settings → Environment Variables

**Add Variables** (All branches):
```
GOOGLE_SHEETS_SPREADSHEET_ID = 1AbCdEfGhIjKlMnOpQrStUvWxYz
GOOGLE_SERVICE_ACCOUNT_EMAIL = uat-form@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SERVER_URL = https://connie.one
PAYLOAD_SECRET = your_secret_here
DATABASE_URI = mongodb+srv://...
S3_BUCKET_UPLOADS = admin-connie-one-uploads
S3_ACCESS_KEY_ID = AKIAQ...
S3_SECRET_ACCESS_KEY = ...
S3_REGION = us-east-1
```

**Important**:
- Private key must include `\n` for newlines (Amplify will preserve them)
- No quotes around multi-line values in Amplify console
- All sensitive values should be marked as "Secret" (hidden in logs)

### Deployment Steps

1. **Commit and Push Changes**
```bash
git add .
git commit -m "Add UAT discovery form and legal pages"
git push origin main
```

2. **Monitor Build**
- AWS Amplify automatically detects push
- Build starts within 30 seconds
- Monitor progress in Amplify console

3. **Build Phases**:
- Provision (30 seconds)
- Build (3-5 minutes)
- Deploy (1-2 minutes)
- Verify (30 seconds)

4. **Verify Deployment**
- Visit https://connie.one
- Test UAT form submission
- Verify legal pages load
- Check Google Sheets for test data
- Confirm email notifications received

### Common Deployment Issues

**Issue 1: Build Fails - Memory Error**
```
FATAL ERROR: Ineffective mark-compacts near heap limit
Allocation failed - JavaScript heap out of memory
```

**Solution**: Verify `package.json` build script includes `--max_old_space_size=6144`

**Issue 2: Environment Variables Not Loading**
```
Error: GOOGLE_SHEETS_SPREADSHEET_ID is not defined
```

**Solution**:
- Check Amplify Environment Variables are set
- Ensure `preBuild` commands in `amplify.yml` echo variables to `.env.production`
- Redeploy app after adding variables

**Issue 3: Google Sheets Authentication Error**
```
Error: The caller does not have permission
```

**Solution**:
- Verify service account email is correct
- Check spreadsheet sharing settings (service account needs Editor access)
- Ensure private key is properly formatted with `\n` newlines

**Issue 4: Email Sending Fails**
```
Error: API key invalid
```

**Solution**:
- Verify Resend API key is valid
- Check domain verification status (send.connie.one)
- Ensure DNS records are configured correctly

### Rollback Procedure

If deployment fails or introduces critical bugs:

1. **Revert via Git**
```bash
git revert HEAD
git push origin main
```

2. **Or Rollback in Amplify**
- Go to Amplify Console → App → Deployments
- Find last successful deployment
- Click "Redeploy this version"

3. **Emergency Fix**
- Make fix locally
- Test thoroughly
- Commit and push immediately
- Monitor build closely

---

## Troubleshooting

### Form Submission Issues

**Problem**: Form submits but data doesn't appear in Google Sheets

**Diagnosis**:
1. Check browser console for errors
2. Verify API endpoint returns 200 status
3. Check Amplify logs for API errors
4. Verify service account permissions

**Solution**:
```bash
# Test API endpoint directly
curl -X POST https://connie.one/api/uat-intake \
  -H "Content-Type: application/json" \
  -d '{"organizationName":"Test",...}'

# Check response for errors
```

**Problem**: Validation not working

**Solution**: Check that all required fields have validation logic in `validateStep()` function

### Email Issues

**Problem**: Emails not sending

**Diagnosis**:
1. Check Resend API key is valid
2. Verify domain verification (send.connie.one)
3. Check DNS records in Route 53
4. Review Resend dashboard for error logs

**Solution**:
```bash
# Test Resend API directly
curl https://api.resend.com/emails \
  -H "Authorization: Bearer re_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "test@send.connie.one",
    "to": "your-email@example.com",
    "subject": "Test",
    "html": "<p>Test</p>"
  }'
```

**Problem**: Email tags validation error

**Error**: "Tags should only contain ASCII letters, numbers, underscores, or dashes"

**Solution**: Sanitize organization names before using as tags:
```javascript
const sanitizedOrgName = organizationName.replace(/[^a-zA-Z0-9_-]/g, '-')
```

### Build Issues

**Problem**: TypeScript errors during build

**Solution**:
```bash
# Check for type errors locally
npx tsc --noEmit

# Common fixes:
# - Add proper type annotations
# - Import missing types
# - Fix any/unknown type issues
```

**Problem**: Module not found errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Legal Page Issues

**Problem**: Links don't work in discovery form

**Solution**: Verify URLs are correct:
```tsx
<a href="https://connie.one/acceptable-use-policy" target="_blank" rel="noopener noreferrer">
  Acceptable Use Policy
</a>
```

**Problem**: Table of contents anchor links don't work

**Solution**: Ensure section IDs match href values:
```tsx
<a href="#section-1">Section 1</a>
<section id="section-1">...</section>
```

### Performance Issues

**Problem**: Form loads slowly

**Diagnosis**:
- Check network tab in browser DevTools
- Look for large JavaScript bundles
- Verify server response times

**Solutions**:
- Optimize images
- Enable Next.js image optimization
- Use dynamic imports for heavy components
- Enable caching headers

---

## Best Practices

### Code Quality

**TypeScript Usage**:
- Always define types for props and state
- Avoid `any` type
- Use interfaces for complex objects
- Enable strict mode in tsconfig.json

**Component Structure**:
```tsx
// 1. Imports
import React, { useState } from 'react'
import type { Metadata } from 'next'

// 2. Types
interface FormData {
  organizationName: string
  contactName: string
  // ...
}

// 3. Metadata
export const metadata: Metadata = {
  title: 'Page Title',
}

// 4. Component
export default function PageComponent() {
  // State
  const [formData, setFormData] = useState<FormData>({})

  // Handlers
  const handleSubmit = () => {}

  // Render
  return (
    <div>...</div>
  )
}
```

**Error Handling**:
```typescript
try {
  // Operation
} catch (error) {
  // Log detailed error for debugging
  console.error('Operation failed:', error)

  // Show user-friendly message
  setError('Something went wrong. Please try again.')
}
```

### Security

**Environment Variables**:
- ✅ Never commit secrets to Git
- ✅ Use `.env.local` for development
- ✅ Store production secrets in Amplify
- ✅ Rotate API keys regularly

**API Endpoints**:
- ✅ Validate all input data
- ✅ Sanitize user input before database operations
- ✅ Use HTTPS only
- ✅ Implement rate limiting for production

**Email Security**:
- ✅ Verify sender domain (DKIM, SPF, DMARC)
- ✅ Don't expose email addresses in client-side code
- ✅ Validate email addresses before sending
- ✅ Monitor for abuse/spam

### Accessibility

**Form Accessibility**:
```tsx
<label htmlFor="orgName" className="block text-sm font-medium">
  Organization Name *
</label>
<input
  id="orgName"
  type="text"
  aria-required="true"
  aria-invalid={errors.orgName ? 'true' : 'false'}
  aria-describedby={errors.orgName ? 'orgName-error' : undefined}
/>
{errors.orgName && (
  <p id="orgName-error" className="text-red-600 text-sm" role="alert">
    {errors.orgName}
  </p>
)}
```

**Keyboard Navigation**:
- All interactive elements accessible via Tab key
- Enter key submits forms
- Escape key closes modals
- Focus indicators visible

**Screen Reader Support**:
- Semantic HTML elements
- ARIA labels where needed
- Alt text for images
- Proper heading hierarchy

### Performance

**Image Optimization**:
```tsx
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Connie Logo"
  width={200}
  height={80}
  priority // For above-the-fold images
/>
```

**Code Splitting**:
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable server-side rendering if not needed
})
```

**Caching**:
```typescript
// API routes
export const revalidate = 3600 // Revalidate every hour

// Pages
export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
}
```

### Git Workflow

**Commit Messages**:
```
feat: Add UAT discovery form with multi-step validation
fix: Resolve Google Sheets authentication error
docs: Update deployment guide with memory configuration
refactor: Simplify form validation logic
style: Update legal pages formatting
```

**Branch Strategy**:
```bash
# Feature development
git checkout -b feature/uat-form-enhancements
# Work on feature
git commit -m "feat: Add new form field"
git push origin feature/uat-form-enhancements

# Merge to main
git checkout main
git merge feature/uat-form-enhancements
git push origin main
```

**Never Include**:
- ❌ Claude/AI marketing in commit messages
- ❌ Secrets or API keys
- ❌ Large binary files
- ❌ node_modules or .next directories

### Documentation

**Code Comments**:
```typescript
// Good: Explain WHY
// Sanitize org name for Resend tag format (ASCII letters/numbers only)
const sanitizedOrgName = org.replace(/[^a-zA-Z0-9_-]/g, '-')

// Bad: Explain WHAT (code is self-explanatory)
// Replace non-alphanumeric characters with dashes
const sanitizedOrgName = org.replace(/[^a-zA-Z0-9_-]/g, '-')
```

**Update Documentation**:
- Document all new features
- Update README when structure changes
- Keep deployment guides current
- Record troubleshooting solutions

---

## Conclusion

This guide covers the complete development lifecycle of the Connie UAT Discovery Form system. Key takeaways:

1. **Architecture**: Next.js + Google Sheets + Resend provides a simple, scalable solution
2. **Development**: Follow established patterns for consistency
3. **Testing**: Thoroughly test all paths before deployment
4. **Deployment**: Use AWS Amplify with proper memory configuration
5. **Maintenance**: Monitor, log, and iterate based on user feedback

### Next Steps

For future enhancements, consider:
- **Analytics**: Track form completion rates and drop-off points
- **A/B Testing**: Test different form layouts and copy
- **Automation**: Auto-assign UAT cohorts based on form responses
- **Integration**: Connect to CRM system for deeper tracking
- **Localization**: Support multiple languages for international organizations

### Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Google Sheets API**: https://developers.google.com/sheets/api
- **Resend Documentation**: https://resend.com/docs
- **AWS Amplify**: https://docs.amplify.aws

---

**Last Updated**: November 7, 2025
**Version**: 1.0
**Maintained by**: Connie Development Team
