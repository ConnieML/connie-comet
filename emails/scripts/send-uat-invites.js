#!/usr/bin/env node

/**
 * Connie UAT Invitation Email Sender
 *
 * Sends personalized UAT invitation emails via Resend
 *
 * Usage:
 *   node send-uat-invites.js --test                    # Send test to yourself
 *   node send-uat-invites.js --single                  # Send to one org
 *   node send-uat-invites.js --batch recipients.json   # Send to multiple orgs
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  RESEND_API_KEY: process.env.RESEND_API_KEY || 'YOUR_RESEND_API_KEY_HERE',
  FROM_EMAIL: 'Connie Team <uat@connie.one>',
  TEMPLATE_PATH: path.join(__dirname, '../templates/connie-uat-email.html'),
  SUBJECT: "You're Invited: 🧪 Connie UAT Cohort Program",
};

/**
 * Send email via Resend API
 */
async function sendEmail({ to, organizationName, contactName }) {
  // Load template
  let htmlTemplate = fs.readFileSync(CONFIG.TEMPLATE_PATH, 'utf-8');

  // Replace personalization variables
  htmlTemplate = htmlTemplate
    .replace(/\{\{organizationName\}\}/g, organizationName)
    .replace(/\{\{contactName\}\}/g, contactName)
    .replace(/\{\{unsubscribeUrl\}\}/g, 'https://connie.one/unsubscribe');

  // Send via Resend API
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CONFIG.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: CONFIG.FROM_EMAIL,
      to: [to],
      subject: CONFIG.SUBJECT,
      html: htmlTemplate,
      tags: [
        { name: 'campaign', value: 'uat-invitations' },
        { name: 'organization', value: organizationName },
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Resend API error: ${JSON.stringify(data)}`);
  }

  return data;
}

/**
 * Send test email to yourself
 */
async function sendTest() {
  console.log('📧 Sending test email...\n');

  const testRecipient = {
    to: 'chris@chrisberno.dev', // Change to your email
    organizationName: 'Sample Senior Services',
    contactName: 'Chris',
  };

  try {
    const result = await sendEmail(testRecipient);
    console.log('✅ Test email sent successfully!');
    console.log(`   Email ID: ${result.id}`);
    console.log(`   To: ${testRecipient.to}\n`);
    console.log('Check your inbox and verify the email looks correct.');
  } catch (error) {
    console.error('❌ Error sending test email:', error.message);
    process.exit(1);
  }
}

/**
 * Send to single organization (interactive)
 */
async function sendSingle() {
  console.log('📧 Send to Single Organization\n');

  // In a real implementation, you'd use readline or prompts
  // For now, hardcode example:
  const recipient = {
    to: 'contact@example.org',
    organizationName: 'Example Nonprofit',
    contactName: 'Director Name',
  };

  console.log(`Sending to: ${recipient.organizationName} (${recipient.to})`);
  console.log('Continue? (Ctrl+C to cancel)\n');

  try {
    const result = await sendEmail(recipient);
    console.log('✅ Email sent successfully!');
    console.log(`   Email ID: ${result.id}\n`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

/**
 * Send to multiple organizations from JSON file
 */
async function sendBatch(recipientsFile) {
  console.log(`📧 Batch Sending from: ${recipientsFile}\n`);

  // Load recipients
  let recipients;
  try {
    const fileContent = fs.readFileSync(recipientsFile, 'utf-8');
    recipients = JSON.parse(fileContent);
  } catch (error) {
    console.error(`❌ Error loading recipients file: ${error.message}`);
    process.exit(1);
  }

  console.log(`Found ${recipients.length} recipients\n`);

  // Send emails with delay to avoid rate limits
  const results = [];
  const DELAY_MS = 1000; // 1 second between emails

  for (let i = 0; i < recipients.length; i++) {
    const recipient = recipients[i];

    console.log(`[${i + 1}/${recipients.length}] Sending to ${recipient.organizationName}...`);

    try {
      const result = await sendEmail(recipient);
      results.push({ ...recipient, success: true, emailId: result.id });
      console.log(`   ✅ Sent (ID: ${result.id})`);
    } catch (error) {
      results.push({ ...recipient, success: false, error: error.message });
      console.log(`   ❌ Failed: ${error.message}`);
    }

    // Delay before next email (except for last one)
    if (i < recipients.length - 1) {
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }
  }

  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Successful: ${successful}`);
  console.log(`   ❌ Failed: ${failed}`);

  if (failed > 0) {
    console.log('\n❌ Failed emails:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.organizationName}: ${r.error}`);
    });
  }
}

/**
 * Main
 */
async function main() {
  const args = process.argv.slice(2);

  // Validate API key
  if (CONFIG.RESEND_API_KEY === 'YOUR_RESEND_API_KEY_HERE') {
    console.error('❌ Error: RESEND_API_KEY not set');
    console.error('\nSet your API key:');
    console.error('  export RESEND_API_KEY="re_xxxxxxxxxxxx"');
    console.error('\nOr edit this file and replace YOUR_RESEND_API_KEY_HERE');
    process.exit(1);
  }

  // Parse command
  if (args.includes('--test')) {
    await sendTest();
  } else if (args.includes('--single')) {
    await sendSingle();
  } else if (args.includes('--batch')) {
    const fileIndex = args.indexOf('--batch') + 1;
    const recipientsFile = args[fileIndex];
    if (!recipientsFile) {
      console.error('❌ Error: --batch requires a recipients file');
      console.error('   Usage: node send-uat-invites.js --batch recipients.json');
      process.exit(1);
    }
    await sendBatch(recipientsFile);
  } else {
    // Show usage
    console.log('📧 Connie UAT Invitation Email Sender\n');
    console.log('Usage:');
    console.log('  node send-uat-invites.js --test                    # Send test email');
    console.log('  node send-uat-invites.js --single                  # Send to one org');
    console.log('  node send-uat-invites.js --batch recipients.json   # Batch send\n');
    console.log('Environment:');
    console.log('  RESEND_API_KEY    Your Resend API key (required)');
  }
}

main().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
