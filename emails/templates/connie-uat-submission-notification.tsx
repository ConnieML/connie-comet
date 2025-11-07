import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ConnieUATSubmissionNotificationProps {
  organizationName: string;
  contactName: string;
  email: string;
  phone?: string;
  submissionDate: string;
  spreadsheetUrl?: string;
}

export const ConnieUATSubmissionNotification = ({
  organizationName = '{{organizationName}}',
  contactName = '{{contactName}}',
  email = '{{email}}',
  phone = '{{phone}}',
  submissionDate = '{{submissionDate}}',
  spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/10fcAN8I6yu-c53ucZ92CzrlSXqh4yDCjrILg9n1_ZV8',
}: ConnieUATSubmissionNotificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>New UAT Discovery Form Submission - {organizationName}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src="https://connie.one/connie-logo_v1-white.svg"
              width="193"
              height="51"
              alt="Connie"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>
              🎉 New UAT Discovery Form Submission
            </Heading>

            <Text style={text}>
              A new organization has completed the UAT Discovery form!
            </Text>

            <Hr style={hr} />

            {/* Organization Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={h2}>
                Organization Details
              </Heading>

              <table style={detailsTable}>
                <tr>
                  <td style={detailLabel}>Organization:</td>
                  <td style={detailValue}>{organizationName}</td>
                </tr>
                <tr>
                  <td style={detailLabel}>Contact Name:</td>
                  <td style={detailValue}>{contactName}</td>
                </tr>
                <tr>
                  <td style={detailLabel}>Email:</td>
                  <td style={detailValue}>
                    <Link href={`mailto:${email}`} style={link}>
                      {email}
                    </Link>
                  </td>
                </tr>
                {phone && (
                  <tr>
                    <td style={detailLabel}>Phone:</td>
                    <td style={detailValue}>
                      <Link href={`tel:${phone}`} style={link}>
                        {phone}
                      </Link>
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={detailLabel}>Submitted:</td>
                  <td style={detailValue}>{new Date(submissionDate).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZoneName: 'short',
                  })}</td>
                </tr>
              </table>
            </Section>

            <Hr style={hr} />

            {/* Action Items */}
            <Section style={ctaSection}>
              <Heading as="h2" style={h2}>
                Next Steps
              </Heading>

              <Text style={text}>
                The full submission data has been automatically saved to the UAT Intake Google Sheet.
              </Text>

              <table style={actionList}>
                <tr>
                  <td style={actionNumber}>1.</td>
                  <td style={actionText}>
                    Review the complete submission details in{' '}
                    <Link href={spreadsheetUrl} style={link}>
                      Google Sheets
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={actionNumber}>2.</td>
                  <td style={actionText}>
                    Reach out to {contactName} at{' '}
                    <Link href={`mailto:${email}`} style={link}>
                      {email}
                    </Link>{' '}
                    to schedule a follow-up call
                  </td>
                </tr>
                <tr>
                  <td style={actionNumber}>3.</td>
                  <td style={actionText}>
                    Prepare customized UAT environment based on their requirements
                  </td>
                </tr>
                <tr>
                  <td style={actionNumber}>4.</td>
                  <td style={actionText}>
                    Send onboarding timeline and next steps
                  </td>
                </tr>
              </table>
            </Section>

            <Hr style={hr} />

            {/* Quick Actions */}
            <Section style={quickActionsSection}>
              <Text style={quickActionsTitle}>Quick Actions:</Text>
              <Text style={text}>
                <Link href={`mailto:${email}?subject=Re: Connie UAT Program - ${organizationName}`} style={actionLink}>
                  📧 Send Email to {contactName}
                </Link>
              </Text>
              <Text style={text}>
                <Link href={spreadsheetUrl} style={actionLink}>
                  📊 View Google Sheet
                </Link>
              </Text>
              <Text style={text}>
                <Link href="https://connie.one/dataroom/user-acceptance-testing/discovery" style={actionLink}>
                  📋 View Form
                </Link>
              </Text>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Connie UAT Admin Notification
            </Text>
            <Text style={footerText}>
              This is an automated notification from connie.one
            </Text>
            <Text style={footerAddress}>
              Nevada Senior Services · Reno, NV
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ConnieUATSubmissionNotification;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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

const logo = {
  margin: '0 auto',
};

const content = {
  padding: '0 48px',
};

const h1 = {
  color: '#000000',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '1.3',
  margin: '32px 0 24px',
};

const h2 = {
  color: '#000000',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '1.4',
  margin: '24px 0 16px',
};

const text = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const detailsSection = {
  margin: '24px 0',
  padding: '24px',
  backgroundColor: '#f8f8f8',
  borderRadius: '8px',
};

const detailsTable = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  marginTop: '16px',
};

const detailLabel = {
  color: '#666666',
  fontSize: '14px',
  fontWeight: '600',
  padding: '8px 16px 8px 0',
  verticalAlign: 'top' as const,
  width: '140px',
};

const detailValue = {
  color: '#404040',
  fontSize: '16px',
  padding: '8px 0',
  verticalAlign: 'top' as const,
};

const ctaSection = {
  margin: '32px 0',
};

const actionList = {
  width: '100%',
  marginTop: '16px',
};

const actionNumber = {
  color: '#000000',
  fontSize: '16px',
  fontWeight: '600',
  padding: '8px 12px 8px 0',
  verticalAlign: 'top' as const,
  width: '30px',
};

const actionText = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '1.6',
  padding: '8px 0',
  verticalAlign: 'top' as const,
};

const quickActionsSection = {
  margin: '24px 0',
  padding: '20px',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  borderLeft: '4px solid #000000',
};

const quickActionsTitle = {
  color: '#000000',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 12px 0',
};

const link = {
  color: '#000000',
  textDecoration: 'underline',
};

const actionLink = {
  color: '#000000',
  textDecoration: 'underline',
  fontSize: '16px',
  fontWeight: '500',
};

const hr = {
  borderColor: '#e6e6e6',
  margin: '32px 0',
};

const footer = {
  padding: '0 48px',
};

const footerText = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '8px 0',
  textAlign: 'center' as const,
};

const footerAddress = {
  color: '#999999',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '16px 0 0',
  textAlign: 'center' as const,
};
