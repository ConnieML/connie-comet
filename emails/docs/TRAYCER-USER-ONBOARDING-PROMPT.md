# Traycer.ai / CTO Prompt: Connie User Onboarding System

## Project Context

**Organization:** Connie (CPAAS for nonprofits)
**Platform:** Twilio Flex-based contact center
**Design System:** Twilio Paste (https://paste.twilio.design)
**Email Service:** Resend (domain: send.connie.one)
**Existing Email Templates:** `/emails/templates/` in connie.one project

---

## Task Overview

Build a user onboarding flow consisting of:
1. **Admin-facing HTML form** (Twilio Paste design) to create new Connie users
2. **Welcome email template** (React Email) sent via Resend when user is created
3. **API endpoint** to handle form submission and trigger email

---

## Part 1: User Onboarding Form (HTML + Twilio Paste)

### Requirements

Create a standalone HTML file using Twilio Paste design tokens and components that allows Connie admins to onboard new users.

### Form Fields

| Field | Type | Validation | Notes |
|-------|------|------------|-------|
| User ID | Email input | Required, valid email format | This IS the user's business email address |
| First Name | Text input | Required, min 2 chars | |
| Last Name | Text input | Required, min 2 chars | |
| Account Name | Text input | Required | Organization/company name (e.g., "Nevada Senior Services") |
| Account SID | Text input | Required, starts with "AC", 34 chars | Twilio Account SID format |
| Login URL | URL input | Required, valid URL | The Flex instance URL (e.g., "https://nss.connie.team") |
| Account Type | Select dropdown | Required | Options: Agent, Supervisor, Admin |
| Local Admin Name | Text input | Required if Account Type is Agent or Supervisor | Name of the org's Connie administrator |
| Temporary Password | Password input | Required, min 12 chars | Admin sets initial password |
| Confirm Password | Password input | Must match password | |

**Conditional Logic:**
- If Account Type = "Admin": Hide "Local Admin Name" field (they ARE the admin)
- If Account Type = "Agent" or "Supervisor": Show "Local Admin Name" field (required)

### Design Specifications

**Use Twilio Paste CDN resources:**
```html
<!-- Paste CSS -->
<link rel="stylesheet" href="https://assets.twilio.com/public_assets/paste-core/1.0.0/paste.min.css">

<!-- Or use Paste design tokens directly -->
```

**Visual Requirements:**
- Connie branding (black header with white logo, like existing emails)
- Clean card-based form layout
- Proper form labels and help text
- Password strength indicator
- Visible validation feedback
- Submit button with loading state
- Success/error toast notifications

**Color Palette (from Connie brand):**
- Primary: `#000000` (black)
- Background: `#f6f9fc`
- Card background: `#ffffff`
- Text primary: `#404040`
- Text secondary: `#666666`
- Error: `#d32f2f`
- Success: `#2e7d32`

### Form Behavior

1. **Client-side validation** before submission
2. **On submit:**
   - Show loading spinner on button
   - POST to `/api/admin/create-user` endpoint
   - On success: Show success toast, clear form, display "Email sent to [email]"
   - On error: Show error toast with message

### Sample HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Create New Connie User</title>
  <!-- Twilio Paste styles -->
</head>
<body>
  <!-- Header with Connie logo -->
  <header style="background: #000; padding: 24px; text-align: center;">
    <img src="https://connie.one/connie-logo_v1-white.svg" alt="Connie" height="51">
  </header>

  <!-- Main content -->
  <main style="max-width: 600px; margin: 0 auto; padding: 48px 24px;">
    <h1>Create New User</h1>
    <p>Add a new team member to a Connie account. They will receive a welcome email with login instructions.</p>

    <form id="create-user-form">
      <!-- Form fields here -->
    </form>
  </main>
</body>
</html>
```

---

## Part 2: Welcome Email Template (React Email)

### Base Template Reference

Use the existing template structure from:
- `/emails/templates/connie-uat-email-react.tsx`

### Email Content Requirements

**Subject:** `Welcome to Connie - Your Account is Ready`

**Template Props Interface:**
```typescript
interface ConnieWelcomeEmailProps {
  firstName: string;
  lastName: string;
  email: string;                      // This is their User ID
  accountName: string;                // Organization name
  accountType: 'Agent' | 'Supervisor' | 'Admin';
  accountSid: string;                 // Only shown to Admins
  adminName?: string;                 // Local admin name (for non-admins)
  temporaryPassword: string;
  loginUrl: string;                   // Default: https://portal.connie.team
  connieAccountManager?: string;      // Only for Admins
  connieAccountManagerPhone?: string; // Only for Admins
  adminOrientationUrl?: string;       // Calendly link for Admin orientation
  agentOrientationUrl?: string;       // Calendly link for Agent orientation
}
```

**IMPORTANT: Template has conditional sections based on accountType:**

| Section | Agent/Supervisor | Admin |
|---------|------------------|-------|
| Welcome message | Mentions their local admin | Mentions they ARE the admin |
| Account SID | Hidden | Visible |
| Account Type | Visible | Visible |
| Connie Account Manager card | Hidden | Visible |
| Orientation booking buttons | Hidden | Visible (both Admin + Agent sessions) |

**Email Sections:**

1. **Header** - Black background with Connie logo (same as existing templates)

2. **Welcome Message** (conditional based on account type)

   *For Agents/Supervisors:*
   ```
   Welcome to Connie, {{firstName}}!

   Your account has been created and you can login and look around anytime you like.
   Your {{accountName}} administrator is {{adminName}} and they will be contacting you
   soon with more information about an upcoming new user orientation.
   You'll be a Connie pro in no time!
   ```

   *For Admins:*
   ```
   Welcome to Connie, {{firstName}}!

   Your administrator account has been created and you can login and start exploring anytime.
   As the {{accountName}} administrator, you'll have full access to manage users, configure
   settings, and oversee your team's communications. Your Connie Account Manager will be
   reaching out soon to schedule your complimentary orientation sessions.
   You'll be a Connie pro in no time!
   ```

3. **Account Details Card** (gray background)
   - User ID: {{email}}
   - Account: {{accountName}}
   - Account Type: {{accountType}}
   - Account SID: {{accountSid}} *(Admin only)*
   - Temporary Password: {{temporaryPassword}}

4. **Connie Account Manager Card** *(Admin only)* (light blue background)
   - Name: Chris Berno
   - Phone: (555) 555-5555
   - "Your dedicated account manager is here to help..."

5. **Security Notice** (yellow warning box)
   ```
   Important: You must change your password on first login.
   This temporary password will expire in 24 hours.
   ```

6. **CTA Button**
   - Text: "Log In to Connie"
   - URL: {{loginUrl}}

7. **Orientation Booking Section** *(Admin only)* (light green background)
   - "Book Your Free Orientation Sessions"
   - Button: "Book Admin Orientation (1 hr)" → Calendly link
   - Button: "Book Agent Orientation (1 hr)" → Calendly link

8. **Getting Started Steps**
   - Log in with your User ID and temporary password
   - Set a new secure password
   - Complete your profile setup
   - Explore the Connie dashboard

9. **Support Section**
   ```
   Need help? Contact support@connie.team or reply to this email.
   ```

10. **Footer** (same as existing templates)
    - Connie - Communication Platform for Nonprofits
    - connie.one link
    - Nevada Senior Services · Las Vegas, NV

### Template File Location

Save as: `/emails/templates/connie-welcome-email.tsx`

---

## Part 3: API Endpoint

### Endpoint Specification

**Route:** `POST /api/admin/create-user`

**Request Body:**
```json
{
  "email": "user@nonprofit.org",
  "firstName": "Jane",
  "lastName": "Smith",
  "accountName": "Nevada Senior Services",
  "accountSid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "loginUrl": "https://nss.connie.team",
  "accountType": "Agent",
  "adminName": "Chris Berno",
  "password": "SecurePassword123!"
}
```

**Note:** `adminName` is only required when `accountType` is "Agent" or "Supervisor".

**Response (Success):**
```json
{
  "success": true,
  "message": "User created and welcome email sent",
  "userId": "user@nonprofit.org",
  "emailId": "re_xxxxxxxx"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "User already exists",
  "code": "USER_EXISTS"
}
```

### API Logic Flow

1. Validate all required fields
2. Validate Account SID format (starts with "AC", 34 chars)
3. Check if user already exists (optional - depends on backend)
4. Create user in system (Twilio/Flex API or database)
5. Send welcome email via Resend
6. Return success/failure response

### Resend Integration

```typescript
import { Resend } from 'resend';
import ConnieWelcomeEmail from '../../../emails/templates/connie-welcome-email';

const resend = new Resend(process.env.RESEND_API_KEY);

// In the API handler:
await resend.emails.send({
  from: 'Connie Team <welcome@send.connie.one>',
  to: [email],
  subject: 'Welcome to Connie - Your Account is Ready',
  react: ConnieWelcomeEmail({
    firstName,
    lastName,
    email,
    accountName,
    accountType,
    accountSid,
    adminName,  // Only passed for non-Admin users
    temporaryPassword: password,
    loginUrl: 'https://portal.connie.team',
    // Admin-only fields (use defaults from template or override here)
    connieAccountManager: 'Chris Berno',
    connieAccountManagerPhone: '(555) 555-5555',
    adminOrientationUrl: 'https://calendly.com/connie-team/admin-orientation',
    agentOrientationUrl: 'https://calendly.com/connie-team/agent-orientation',
  }),
});
```

---

## Environment Variables Required

```bash
# Already configured in connie.one
RESEND_API_KEY=re_xxxxxxxxxxxx
```

---

## File Deliverables

1. `/public/admin/create-user.html` - The Twilio Paste onboarding form
2. `/emails/templates/connie-welcome-email.tsx` - React Email template
3. `/src/app/api/admin/create-user/route.ts` - Next.js API route

---

## Design References

### Existing Email Template Styles (copy these)

```typescript
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const logoSection = {
  backgroundColor: '#000000',
  padding: '24px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 24px',
  margin: '16px 0',
};

const alertBox = {
  backgroundColor: '#fff3cd',
  border: '2px solid #ffc107',
  borderRadius: '8px',
  padding: '16px',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};
```

### Twilio Paste Resources

- Design Tokens: https://paste.twilio.design/tokens
- Components: https://paste.twilio.design/components
- Form Patterns: https://paste.twilio.design/patterns/create

---

## Security Considerations

1. **Password handling:**
   - Never log passwords
   - Hash before storing (if storing)
   - Use HTTPS only
   - Consider password complexity requirements

2. **API Security:**
   - Require admin authentication on the endpoint
   - Rate limit the endpoint
   - Validate Account SID ownership

3. **Email Security:**
   - Temporary passwords should expire
   - Force password change on first login
   - Consider magic link alternative

---

## Optional Enhancements

1. **Account SID Dropdown** - Fetch available accounts from API instead of manual entry
2. **Role Selection** - Add role picker (Agent, Supervisor, Admin)
3. **Bulk Import** - CSV upload for multiple users
4. **Password Generator** - Auto-generate secure passwords
5. **Email Preview** - Show preview before sending

---

## Testing Checklist

- [ ] Form validates all fields correctly
- [ ] Account SID validation works (AC prefix, 34 chars)
- [ ] Password match validation works
- [ ] Form shows loading state on submit
- [ ] Success toast displays correctly
- [ ] Error handling works for all failure cases
- [ ] Email sends successfully via Resend
- [ ] Email renders correctly in Gmail, Outlook, Apple Mail
- [ ] Mobile responsive form and email

---

*Prompt created by CDO for Traycer.ai / CTO implementation*
*Based on existing connie.one email infrastructure*
