# Connie UAT Email Campaign - Setup Guide

**Goal:** Send professional, Anthropic-style UAT invitation emails to nonprofit partners

**Status:** ✅ Email templates created, ready to deploy

---

## 📁 Files Created

```
/tmp/
├── connie-uat-email.html              # HTML email template (ready to use)
├── connie-uat-email-react.tsx         # React Email version (optional)
├── send-uat-invites.js                # Email sending script
├── recipients-example.json            # Example recipient list
└── CONNIE-UAT-EMAIL-SETUP.md         # This file
```

---

## 🎨 Email Template Overview

**Design Features:**
- ✅ Black header with Connie logo (matches your brand)
- ✅ Clean, professional layout
- ✅ Prominent "Start UAT Discovery" CTA button
- ✅ Bullet points explaining what's covered
- ✅ Professional footer with unsubscribe link
- ✅ Mobile-responsive design
- ✅ Matches Anthropic's email aesthetic

**Personalization Variables:**
- `{{organizationName}}` - Organization's name
- `{{contactName}}` - Contact person's name (optional)
- `{{unsubscribeUrl}}` - Auto-generated unsubscribe link

**Links To:**
- Your existing HTML form: https://connie.one/dataroom/user-acceptance-testing/discovery

---

## 🚀 Quick Start (Send Test Email)

### Step 1: Get Your Resend API Key

1. Log into Resend: https://resend.com/login
2. Go to **API Keys**
3. Click **Create API Key**
4. Copy the key (starts with `re_...`)

### Step 2: Set API Key

```bash
export RESEND_API_KEY="re_your_api_key_here"
```

Or edit `send-uat-invites.js` line 18 and paste your key directly.

### Step 3: Edit Test Recipient

Open `send-uat-invites.js` and change line 80:

```javascript
const testRecipient = {
  to: 'chris@chrisberno.dev',  // ← Change to your email
  organizationName: 'Sample Senior Services',
  contactName: 'Chris',
};
```

### Step 4: Send Test Email

```bash
cd /tmp
node send-uat-invites.js --test
```

### Step 5: Check Your Inbox

- Open the email on desktop and mobile
- Click the "Start UAT Discovery" button
- Verify it links to your form
- Check that branding looks correct

---

## 📧 Sending to Real Recipients

### Option A: Single Organization (Manual)

Edit `send-uat-invites.js` line 106-110:

```javascript
const recipient = {
  to: 'contact@example.org',
  organizationName: 'Example Nonprofit',
  contactName: 'Director Name',
};
```

Then run:

```bash
node send-uat-invites.js --single
```

### Option B: Batch Send (Multiple Organizations)

1. **Create recipients list** (`my-uat-partners.json`):

```json
[
  {
    "to": "director@org1.org",
    "organizationName": "First Nonprofit",
    "contactName": "Jane Doe"
  },
  {
    "to": "admin@org2.org",
    "organizationName": "Second Community Center",
    "contactName": "John Smith"
  }
]
```

2. **Run batch send:**

```bash
node send-uat-invites.js --batch my-uat-partners.json
```

**Features:**
- ✅ Sends with 1-second delay between emails (avoid spam filters)
- ✅ Shows progress for each send
- ✅ Summary of successful/failed sends
- ✅ Error handling and retry capability

---

## 🎨 Customizing the Email

### Update Logo

Edit `connie-uat-email.html` line 40:

```html
<img src="https://connie.one/YOUR-LOGO-URL.png" alt="Connie" width="193" height="51">
```

### Change Colors

**Button color** (line 127):
```html
<a href="..." style="background-color: #000000; ...">
```

**Header background** (line 35):
```html
<td style="background-color: #000000; ...">
```

### Update Footer

Edit lines 193-211 to change:
- Company name
- Links
- Address
- Unsubscribe text

### Change CTA Button Text

Line 127:
```html
Start UAT Discovery  ← Change this text
```

---

## 📊 Tracking & Analytics

### Resend Dashboard

After sending, view analytics at: https://resend.com/emails

**Metrics:**
- ✅ Delivered count
- ✅ Open rate
- ✅ Click rate (who clicked "Start UAT Discovery")
- ✅ Bounce/spam reports

### Using Tags

Emails are tagged with:
- `campaign: uat-invitations`
- `organization: [Organization Name]`

This lets you filter in Resend dashboard.

---

## 🔧 Troubleshooting

### "RESEND_API_KEY not set"

**Solution:**
```bash
export RESEND_API_KEY="re_your_key_here"
```

Or edit the script directly (line 18).

### "Resend API error: 403"

**Problem:** Invalid API key

**Solution:** Verify your API key at https://resend.com/api-keys

### Emails Going to Spam

**Solutions:**
1. Verify domain in Resend (add SPF/DKIM records)
2. Send test to yourself first
3. Ask recipients to whitelist team@connie.one
4. Check spam score: https://www.mail-tester.com

### Logo Not Showing

**Problem:** Logo URL incorrect or not publicly accessible

**Solutions:**
1. Verify logo URL works: https://connie.one/connie-logo_v1-white.svg
2. Upload logo to Connie server if needed
3. Use absolute URL (not relative)

### Personalization Not Working

**Problem:** `{{organizationName}}` showing in email

**Solution:** Ensure recipients JSON has exact field names:
- `organizationName` (camelCase, not organization_name)
- `contactName`
- `to`

---

## 🎯 Best Practices

### Before Full Send

1. ✅ Send test to yourself
2. ✅ Send test to colleague
3. ✅ Verify on mobile and desktop
4. ✅ Check all links work
5. ✅ Proofread content
6. ✅ Verify form at connie.one/dataroom/... is ready

### Sending Strategy

**Recommended approach:**
1. **Day 1:** Send to 2-3 orgs (test small batch)
2. **Day 2:** Review open/click rates, adjust if needed
3. **Day 3:** Send to remaining orgs in batches of 5-10

**Why staged?**
- Catch issues early
- Adjust messaging based on feedback
- Avoid spam filter triggers from bulk send

### Follow-Up

**After 3 days:**
- Check Resend analytics for non-openers
- Send personal follow-up email
- Reference the original invite

**After 1 week:**
- Phone call to non-responders
- "Did you receive our UAT invitation email?"

---

## 🔄 Using React Email (Optional)

If you want to use the React version instead:

### Step 1: Install React Email

```bash
npm install react-email @react-email/components
```

### Step 2: Use the Template

```javascript
import { render } from '@react-email/render';
import ConnieUATInviteEmail from './connie-uat-email-react';

const html = render(<ConnieUATInviteEmail
  organizationName="Valley Senior Services"
  contactName="Maria"
/>);

// Send via Resend...
```

**Benefits:**
- Easier to maintain
- Better TypeScript support
- Component reusability

**Downside:**
- Requires Node.js build step
- HTML version is simpler for quick edits

---

## 📋 Pre-Flight Checklist

Before sending to UAT partners:

- [ ] Resend domain verified (SPF/DKIM records added)
- [ ] Test email sent and reviewed
- [ ] Logo displays correctly
- [ ] All links work (especially "Start UAT Discovery" button)
- [ ] Form at connie.one/dataroom/... is finalized
- [ ] Google Sheet is ready to receive responses
- [ ] Recipients list is accurate and up-to-date
- [ ] API key has sufficient email credits
- [ ] Unsubscribe link works
- [ ] Mobile rendering looks good

---

## 🎨 Visual Comparison

**Your Email vs. Anthropic Email:**

| Element | Anthropic | Your Connie Email |
|---------|-----------|-------------------|
| Logo header | ✅ Dark background | ✅ Black background |
| Professional typography | ✅ Clean sans-serif | ✅ System UI fonts |
| Prominent CTA button | ✅ Blue button | ✅ Black button |
| What to expect section | ✅ Bullet points | ✅ Bullet points |
| Footer with unsubscribe | ✅ Professional | ✅ Professional |
| Mobile responsive | ✅ Yes | ✅ Yes |

**Result:** Your email matches Anthropic's professional quality ✅

---

## 🆘 Support

**Need Help?**

1. Check Resend docs: https://resend.com/docs
2. Test email rendering: https://www.emailonacid.com
3. Spam score checker: https://www.mail-tester.com

**Quick Fixes:**
- Logo issues → Update line 40 in HTML
- Button not working → Check line 127 href
- Personalization broken → Verify JSON field names match exactly

---

## 📝 Next Steps

1. **Review email template** - Open `connie-uat-email.html` in browser
2. **Send test email** - Run `node send-uat-invites.js --test`
3. **Make any tweaks** - Update logo, colors, copy as needed
4. **Create recipients list** - Build your JSON file
5. **Send to UAT partners** - Run batch send
6. **Track responses** - Monitor Resend dashboard + Google Sheets

---

**Ready to launch your UAT campaign! 🚀**

*Questions? Reply to this thread and I'll help troubleshoot.*
