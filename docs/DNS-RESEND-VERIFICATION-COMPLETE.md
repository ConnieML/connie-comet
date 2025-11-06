# Resend Email Service - DNS Verification Complete

**Date:** November 3, 2025
**Domain:** connie.one
**Service:** Resend Transactional Email
**Account Created With:** chris@chrisberno.dev (Gmail)
**Requested by:** chris@chrisberno.dev
**Configured by:** SPOK (Co-CEO via AWS Route53)

---

## Summary

Successfully configured all required DNS records for Resend email service verification on the `send.connie.one` subdomain. All records are live and propagated.

**Resend Account Details:**
- Account created and managed by: chris@chrisberno.dev (Gmail authentication)
- Domain verified: send.connie.one
- Login method: https://resend.com (sign in with Gmail)

---

## DNS Records Added

### **1. DKIM Record (Required)**
```
Type: TXT
Host: resend._domainkey.connie.one
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxg8zPfTy3OPbmm3dZhJd33h/C5k1GpmYXSigkzsNW0OzUHumei47pKyiHp/yu/EXCD3wrIfpXnRD1cm5Py1L79eDIH7wvq8g1NDLqqV0x9b7NnX3MyCT6cGPlo0c4RLPnnjVpfEXAwtETknGKhd7QvSg3B+7iNW4HX9QsbiSPQQIDAQAB
TTL: 300 seconds
Status: ✅ LIVE
```

**Verification:**
```bash
dig +short TXT resend._domainkey.connie.one
# Returns: "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxg8z..."
```

---

### **2. MX Record (Required)**
```
Type: MX
Host: send.connie.one
Value: 10 feedback-smtp.us-east-1.amazonses.com
Priority: 10
TTL: 300 seconds
Status: ✅ LIVE
```

**Verification:**
```bash
dig +short MX send.connie.one
# Returns: 10 feedback-smtp.us-east-1.amazonses.com.
```

---

### **3. SPF Record (Required)**
```
Type: TXT
Host: send.connie.one
Value: v=spf1 include:amazonses.com ~all
TTL: 300 seconds
Status: ✅ LIVE
```

**Verification:**
```bash
dig +short TXT send.connie.one
# Returns: "v=spf1 include:amazonses.com ~all"
```

---

### **4. DMARC Record (Recommended)**
```
Type: TXT
Host: _dmarc.send.connie.one
Value: v=DMARC1; p=none;
TTL: 300 seconds
Status: ✅ LIVE
```

**Verification:**
```bash
dig +short TXT _dmarc.send.connie.one
# Returns: "v=DMARC1; p=none;"
```

---

## Propagation Status

**DNS Propagation:** ✅ **COMPLETE** (Verified: November 3, 2025)

All records are publicly accessible and responding correctly. Route53 propagation was instantaneous.

---

## Next Steps

### **For chris@chrisberno.dev:**

1. **Visit Resend Dashboard:**
   - Navigate to domain verification page
   - Click "Verify Domain" or "Check DNS Records"
   - Resend will automatically detect the DNS records

2. **Expected Result:**
   - ✅ DKIM Record: Verified
   - ✅ MX Record: Verified
   - ✅ SPF Record: Verified
   - ✅ DMARC Record: Verified (optional but configured)

3. **Domain Status:**
   - Should change to "Verified" or "Active"
   - You can now send emails from `send.connie.one`

---

## Email Configuration Details

### **Sending Domain:**
```
send.connie.one
```

### **Email Addresses Available:**
```
anything@send.connie.one
noreply@send.connie.one
notifications@send.connie.one
alerts@send.connie.one
etc.
```

### **Email Infrastructure:**
- **Provider:** Resend (using AWS SES backend)
- **SMTP Server:** feedback-smtp.us-east-1.amazonses.com
- **Authentication:** DKIM signatures enabled
- **SPF Policy:** Authorized via amazonses.com
- **DMARC Policy:** Monitoring mode (p=none)

---

## AWS Route53 Configuration

### **Hosted Zone:**
```
Domain: connie.one
Zone ID: Z03075133U8IX4MWCDTZR
Account: 022477736297
Region: us-east-1
```

### **Change IDs:**
```
DKIM:  /change/C079621137R6MYHZJCDXD
MX:    /change/C06286706PDS2G4XIEP3
SPF:   /change/C01939133JTXBX99VC7UB
DMARC: /change/C0715240O4QJE9WL0W84
```

All changes submitted: November 3, 2025 21:51-21:54 UTC

---

## Security Considerations

### **SPF Configuration:**
- Policy: `~all` (soft fail)
- Authorizes: amazonses.com senders
- Recommendation: Monitor for unauthorized sending attempts

### **DKIM Signing:**
- Key length: 1024-bit RSA
- Selector: resend
- Purpose: Email authentication and anti-spoofing

### **DMARC Policy:**
- Current: `p=none` (monitoring only)
- Recommendation: Monitor DMARC reports for 30 days
- Future: Consider upgrading to `p=quarantine` or `p=reject`

---

## Troubleshooting

### **If Verification Fails:**

1. **Check DNS Propagation Globally:**
   ```bash
   # Check from multiple locations
   https://www.whatsmydns.net/#TXT/resend._domainkey.connie.one
   ```

2. **Verify Record Format:**
   - TXT records must be wrapped in quotes
   - No extra spaces in values
   - Correct subdomain naming

3. **Wait for Propagation:**
   - Route53: Usually instant (0-5 minutes)
   - Global DNS: Up to 24-48 hours (rare)
   - TTL: 300 seconds (5 minutes)

4. **Contact Resend Support:**
   - Provide domain: send.connie.one
   - Confirmation: All DNS records are live and verified

---

## Integration Examples

### **Node.js (Resend SDK):**
```javascript
import { Resend } from 'resend';

const resend = new Resend('re_YOUR_API_KEY');

await resend.emails.send({
  from: 'notifications@send.connie.one',
  to: 'customer@example.com',
  subject: 'Welcome to Connie',
  html: '<p>Your message here</p>'
});
```

### **cURL Test:**
```bash
curl -X POST 'https://api.resend.com/emails' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "test@send.connie.one",
    "to": "your-email@example.com",
    "subject": "Test Email",
    "html": "<p>DNS verification successful!</p>"
  }'
```

---

## Existing Email Services on connie.one

**Note:** The following email services were already configured and remain active:

### **Root Domain (connie.one):**
- Provider: Amazon SES
- DKIM: Configured (3 keys)
- SPF: v=spf1 include:amazonses.com ~all
- DMARC: v=DMARC1; p=none;

### **careteam.connie.one:**
- Provider: Amazon SES
- DKIM: Configured (3 keys)
- DMARC: v=DMARC1;p=quarantine;pct=100;fo=1

### **support.connie.one:**
- Provider: Amazon SES
- SPF: v=spf1 include:amazonses.com ~all

### **noreply.connie.one:**
- Provider: SendGrid
- MX: mx.sendgrid.net

### **em546.connie.one & em8977.connie.one:**
- Provider: SendGrid
- Purpose: Email marketing

**New addition: send.connie.one (Resend)**

---

## Monitoring & Maintenance

### **Recommended Monitoring:**

1. **DMARC Reports:**
   - Set up DMARC reporting email
   - Monitor for authentication failures
   - Example: `rua=mailto:dmarc-reports@connie.one`

2. **SPF Validation:**
   - Periodically check SPF record validity
   - Tool: https://www.kitterman.com/spf/validate.html

3. **DKIM Key Rotation:**
   - Resend manages DKIM keys automatically
   - No manual rotation required

4. **Bounce Monitoring:**
   - Monitor bounce rates in Resend dashboard
   - Investigate high bounce rates (>5%)

---

## Change Log

| Date | Action | Details |
|------|--------|---------|
| 2025-11-03 | DNS Records Added | DKIM, MX, SPF, DMARC for send.connie.one |
| 2025-11-03 | Propagation Verified | All records live and responding |
| 2025-11-03 | Documentation Created | This file |

---

## Questions or Issues?

**For DNS/Route53:**
- Contact: SPOK (Co-CEO)
- AWS Account: 022477736297
- Route53 User: route53Admin

**For Resend Service:**
- Dashboard: https://resend.com/domains
- Support: support@resend.com
- Account Owner: chris@chrisberno.dev (Gmail login)

**For Connie Infrastructure:**
- Technical Lead: chris@chrisberno.dev
- Documentation: /Users/cjberno/projects/connie/connie.one/docs/

---

## Verification Complete ✅

All DNS records are configured, propagated, and ready for Resend email verification.

**Status:** READY FOR RESEND DASHBOARD VERIFICATION

**Action Required:** Visit Resend dashboard and click "Verify Domain"
