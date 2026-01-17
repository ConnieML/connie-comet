/**
 * Send test welcome emails via Resend
 *
 * Usage:
 *   cd /Users/cjberno/projects/connie/connie.one/emails
 *   npx tsx scripts/send-welcome-test.ts
 */

import { Resend } from 'resend';
import { ConnieWelcomeEmail } from '../templates/connie-welcome-email';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmails() {
  const testEmail = 'cberno@nevadaseniorservices.org';

  console.log('📧 Sending test welcome emails...\n');

  // Test 1: Agent version
  console.log('1. Sending Agent version...');
  try {
    const agentResult = await resend.emails.send({
      from: 'Connie Team <uat@connie.one>',
      to: [testEmail],
      subject: '[TEST] Welcome to Connie - Agent Version',
      react: ConnieWelcomeEmail({
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sjohnson@helpinghands.org',
        accountName: 'Helping Hands Community Services',
        accountType: 'Agent',
        accountSid: 'ACXXXXX-EXAMPLE-XXXXX-NOT-REAL',
        adminName: 'Maria Rodriguez',
        temporaryPassword: 'Welcome2Connie!',
        loginUrl: 'https://helpinghands.connie.team',
      }),
    });
    console.log(`   ✅ Sent!`, JSON.stringify(agentResult, null, 2), '\n');
  } catch (error) {
    console.error('   ❌ Failed:', error);
  }

  // Test 2: Admin version
  console.log('2. Sending Admin version...');
  try {
    const adminResult = await resend.emails.send({
      from: 'Connie Team <uat@connie.one>',
      to: [testEmail],
      subject: '[TEST] Welcome to Connie - Admin Version',
      react: ConnieWelcomeEmail({
        firstName: 'Maria',
        lastName: 'Rodriguez',
        email: 'mrodriguez@helpinghands.org',
        accountName: 'Helping Hands Community Services',
        accountType: 'Admin',
        accountSid: 'ACXXXXX-EXAMPLE-XXXXX-NOT-REAL',
        temporaryPassword: 'Welcome2Connie!',
        loginUrl: 'https://helpinghands.connie.team',
        connieAccountManager: 'Chris Berno',
        connieAccountManagerPhone: '(555) 555-5555',
        adminOrientationUrl: 'https://calendly.com/connie-team/admin-orientation',
        agentOrientationUrl: 'https://calendly.com/connie-team/agent-orientation',
      }),
    });
    console.log(`   ✅ Sent!`, JSON.stringify(adminResult, null, 2), '\n');
  } catch (error) {
    console.error('   ❌ Failed:', error);
  }

  console.log(`📬 Check inbox: ${testEmail}`);
}

sendTestEmails();
