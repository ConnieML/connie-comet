/**
 * Admin Preview Variant
 * This file exists solely to show the Admin version in React Email preview
 */

import { ConnieWelcomeEmail } from './connie-welcome-email';

export default function ConnieWelcomeEmailAdmin() {
  return (
    <ConnieWelcomeEmail
      firstName="Maria"
      lastName="Rodriguez"
      email="mrodriguez@helpinghands.org"
      accountName="Helping Hands Community Services"
      accountType="Admin"
      accountSid="ACXXXXX-EXAMPLE-XXXXX-NOT-REAL"
      temporaryPassword="Welcome2Connie!"
      loginUrl="https://helpinghands.connie.team"
      connieAccountManager="Chris Berno"
      connieAccountManagerPhone="(555) 555-5555"
      adminOrientationUrl="https://calendly.com/connie-team/admin-orientation"
      agentOrientationUrl="https://calendly.com/connie-team/agent-orientation"
    />
  );
}
