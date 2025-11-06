# Connie Email Templates & Scripts

**Location:** `/emails/`
**Purpose:** Centralized repository for all email templates, sending scripts, and related documentation

---

## Directory Structure

```
/emails/
├── templates/          ← Email templates (HTML, React, etc.)
├── scripts/            ← Sending scripts and automation
├── data/               ← Example recipients, test data, configurations
├── docs/               ← Email-specific documentation
└── README.md           ← This file
```

---

## Quick Start

### 1. UAT Invitation Emails

**Template:** `templates/connie-uat-email.html`
**Script:** `scripts/send-uat-invites.js`
**Documentation:** `docs/CONNIE-UAT-EMAIL-SETUP.md`

**Send UAT invitations:**
```bash
cd /Users/cjberno/projects/connie/connie.one/emails/scripts
node send-uat-invites.js
```

See full setup instructions: [UAT Email Setup Guide](./docs/CONNIE-UAT-EMAIL-SETUP.md)

---

## Available Templates

### UAT Invitation Email
- **HTML Version:** `templates/connie-uat-email.html`
- **React Version:** `templates/connie-uat-email-react.tsx`
- **Purpose:** Invite customers to participate in UAT for new Connie features
- **Sending Domain:** `send.connie.one` (via Resend)
- **Created:** November 3, 2025

---

## Sending Scripts

### `scripts/send-uat-invites.js`
- **Purpose:** Send UAT invitation emails to multiple recipients
- **Email Service:** Resend (send.connie.one)
- **Configuration:** Requires RESEND_API_KEY environment variable
- **Recipients:** Configured in `data/recipients-example.json`

**Environment Variables Required:**
```bash
RESEND_API_KEY=re_your_api_key_here
```

---

## Data Files

### `data/recipients-example.json`
Example recipient list for UAT invitations:
```json
[
  {
    "email": "customer@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "organization": "Example Nonprofit"
  }
]
```

**Usage:**
1. Copy `recipients-example.json` to `recipients.json`
2. Update with real customer data
3. Run sending script

---

## Email Service Configuration

### Resend (Primary Service)
- **Domain:** send.connie.one
- **Status:** ✅ Verified (Nov 3, 2025)
- **Account:** chris@chrisberno.dev (Gmail)
- **Documentation:** [DNS Verification Guide](/docs/DNS-RESEND-VERIFICATION-COMPLETE.md)

**Available Sending Addresses:**
- `uat@send.connie.one`
- `notifications@send.connie.one`
- `support@send.connie.one`
- Any address `@send.connie.one`

---

## Development Workflow

### Creating New Email Templates

1. **Create HTML Template:**
   ```bash
   touch emails/templates/your-new-email.html
   ```

2. **Create React Version (Optional):**
   ```bash
   touch emails/templates/your-new-email-react.tsx
   ```

3. **Create Sending Script:**
   ```bash
   touch emails/scripts/send-your-email.js
   ```

4. **Test Locally:**
   ```bash
   cd emails/scripts
   node send-your-email.js
   ```

5. **Document:**
   - Add entry to this README
   - Create detailed docs in `/emails/docs/` if needed

---

## Best Practices

### Template Design
- ✅ Use inline CSS for email compatibility
- ✅ Test across email clients (Gmail, Outlook, Apple Mail)
- ✅ Include plain text fallback
- ✅ Responsive design (mobile-friendly)
- ✅ Accessibility (alt text, semantic HTML)

### Sending Scripts
- ✅ Use environment variables for API keys
- ✅ Include error handling and logging
- ✅ Support dry-run mode for testing
- ✅ Rate limiting for bulk sends
- ✅ Confirmation prompts before sending

### Data Management
- ⚠️ **Never commit real customer emails to Git**
- ✅ Use `.gitignore` for production data files
- ✅ Keep example files with fake data
- ✅ Document data schema in README

---

## Git Ignore Configuration

Add to `/emails/.gitignore`:
```
# Production recipient lists
recipients.json
customers.json
*-production.json

# Environment variables
.env
.env.local

# Logs
*.log
logs/
```

---

## Testing

### Email Preview Tools
- **Litmus:** https://litmus.com/
- **Email on Acid:** https://www.emailonacid.com/
- **Mailtrap:** https://mailtrap.io/ (development inbox)

### Send Test Emails
```bash
# Set test mode in script
RESEND_API_KEY=your_key \
DRY_RUN=true \
node scripts/send-uat-invites.js
```

---

## Troubleshooting

### Common Issues

**1. API Key Not Found**
```
Error: RESEND_API_KEY is not defined
```
**Solution:** Set environment variable or create `.env` file

**2. Domain Not Verified**
```
Error: Domain not verified
```
**Solution:** Check Resend dashboard and DNS records

**3. Rate Limiting**
```
Error: Too many requests
```
**Solution:** Add delays between sends in script

---

## Related Documentation

- **Resend DNS Setup:** `/docs/DNS-RESEND-VERIFICATION-COMPLETE.md`
- **Development Guide:** `/DEVELOPMENT.md`
- **Project Context:** `/CLAUDE.md`

---

## Support

**For Email Infrastructure:**
- DNS/Route53: SPOK (Co-CEO)
- Resend Service: chris@chrisberno.dev

**For Email Content:**
- Template Design: Marketing team
- Copy/Messaging: Product team

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2025-11-03 | Created `/emails` directory structure | CTO |
| 2025-11-03 | Added UAT invitation template & script | SPOK + chris@chrisberno.dev |

---

**Last Updated:** November 3, 2025
