import {
  Body,
  Button,
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

interface ConnieWelcomeEmailProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  accountName?: string;
  accountType?: 'Agent' | 'Supervisor' | 'Admin';
  accountSid?: string;
  adminName?: string;
  temporaryPassword?: string;
  loginUrl?: string;
  connieAccountManager?: string;
  connieAccountManagerPhone?: string;
  adminOrientationUrl?: string;
  agentOrientationUrl?: string;
}

export const ConnieWelcomeEmail = ({
  firstName = '<First Name>',
  lastName = '<Last Name>',
  email = '<Email Address>',
  accountName = '<Account Name>',
  accountType = 'Agent',
  accountSid = '<Account SID>',
  adminName = '<Admin Name>',
  temporaryPassword = '<Temporary Password>',
  loginUrl = '<Login URL>',
  connieAccountManager = 'Chris Berno',
  connieAccountManagerPhone = '(555) 555-5555',
  adminOrientationUrl = 'https://calendly.com/connie-team/admin-orientation',
  agentOrientationUrl = 'https://calendly.com/connie-team/agent-orientation',
}: ConnieWelcomeEmailProps) => {
  const isAdmin = accountType === 'Admin';
  return (
    <Html>
      <Head />
      <Preview>Welcome to Connie - Your account is ready</Preview>
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
              Welcome to Connie, {firstName}!
            </Heading>

            {isAdmin ? (
              <Text style={text}>
                Your administrator account has been created and you can login and start
                exploring anytime. As the {accountName} administrator, you'll have full access
                to manage users, configure settings, and oversee your team's communications.
                Your Connie Account Manager will be reaching out soon to schedule your
                complimentary orientation sessions. You'll be a Connie pro in no time!
              </Text>
            ) : (
              <Text style={text}>
                Your account has been created and you can login and look around anytime you like.
                Your {accountName} administrator is {adminName} and they will be contacting you
                soon with more information about an upcoming new user orientation.
                You'll be a Connie pro in no time!
              </Text>
            )}

            {/* Account Details Card */}
            <Section style={detailsCard}>
              <Heading as="h2" style={h2}>
                Your Account Details
              </Heading>

              <table style={detailsTable}>
                <tbody>
                  <tr>
                    <td style={detailLabel}>Login URL:</td>
                    <td style={detailValue}>
                      <Link href={loginUrl} style={link}>{loginUrl}</Link>
                    </td>
                  </tr>
                  <tr>
                    <td style={detailLabel}>User ID:</td>
                    <td style={detailValue}>{email}</td>
                  </tr>
                  <tr>
                    <td style={detailLabel}>Account:</td>
                    <td style={detailValue}>{accountName}</td>
                  </tr>
                  <tr>
                    <td style={detailLabel}>Account Type:</td>
                    <td style={detailValue}>{accountType}</td>
                  </tr>
                  {isAdmin && (
                    <tr>
                      <td style={detailLabel}>Account SID:</td>
                      <td style={detailValueMono}>{accountSid}</td>
                    </tr>
                  )}
                  <tr>
                    <td style={detailLabel}>Temporary Password:</td>
                    <td style={detailValueMono}>{temporaryPassword}</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            {/* Admin-only: Connie Account Manager */}
            {isAdmin && (
              <Section style={managerCard}>
                <Heading as="h2" style={h2}>
                  Your Connie Account Manager
                </Heading>
                <Text style={managerText}>
                  <strong>{connieAccountManager}</strong>
                  <br />
                  {connieAccountManagerPhone}
                </Text>
                <Text style={text}>
                  Your dedicated account manager is here to help you get the most out of Connie.
                  Don't hesitate to reach out with any questions!
                </Text>
              </Section>
            )}

            {/* Security Warning */}
            <Section style={alertBox}>
              <Text style={alertTitle}>Important Security Notice</Text>
              <Text style={alertText}>
                You must change your password on first login.
                This temporary password will expire in 24 hours.
              </Text>
            </Section>

            {/* CTA Button */}
            <Section style={ctaSection}>
              <Button style={button} href={loginUrl}>
                Log In to Connie
              </Button>
              <Text style={ctaNote}>
                Use your User ID and temporary password to log in
              </Text>
            </Section>

            {/* Admin-only: Orientation Booking */}
            {isAdmin && (
              <Section style={orientationSection}>
                <Heading as="h2" style={h2}>
                  Book Your Free Orientation Sessions
                </Heading>
                <Text style={text}>
                  As a new Connie account, you receive complimentary orientation sessions
                  to help you and your team get up to speed quickly.
                </Text>
                <table style={orientationButtons}>
                  <tbody>
                    <tr>
                      <td style={orientationButtonCell}>
                        <Button style={buttonSecondary} href={adminOrientationUrl}>
                          Book Admin Orientation (1 hr)
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td style={orientationButtonCell}>
                        <Button style={buttonSecondary} href={agentOrientationUrl}>
                          Book Agent Orientation (1 hr)
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Section>
            )}

            <Hr style={hr} />

            {/* Getting Started Video */}
            <Section style={videoSection}>
              <Heading as="h2" style={h2}>
                Watch Our Getting Started Guide
              </Heading>

              <Link href="https://connie.one/getting-started" style={videoLink}>
                <Img
                  src="https://connie.one/images/video-placeholder.png"
                  width="504"
                  height="284"
                  alt="Watch the Getting Started Guide"
                  style={videoThumbnail}
                />
              </Link>
            </Section>

            <Hr style={hr} />

            {/* Support Section */}
            <Section style={supportSection}>
              <Text style={supportText}>
                <strong>Need help getting started?</strong>
              </Text>
              <Text style={text}>
                Our team is here to help. Contact us at{' '}
                <Link href="mailto:support@connie.team" style={link}>
                  support@connie.team
                </Link>{' '}
                or simply reply to this email.
              </Text>
            </Section>

            <Text style={signature}>
              Welcome aboard,
              <br />
              <strong>The Connie Team</strong>
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Connie - Communication Platform for Nonprofits
            </Text>
            <Text style={footerText}>
              <Link href="https://connie.one" style={footerLink}>
                connie.one
              </Link>
            </Text>
            <Text style={footerAddress}>
              Nevada Senior Services · Las Vegas, NV
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ConnieWelcomeEmail;

// Preview variants for React Email dev server
ConnieWelcomeEmail.PreviewProps = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sjohnson@helpinghands.org',
  accountName: 'Helping Hands Community Services',
  accountType: 'Agent' as const,
  accountSid: 'ACXXXXX-EXAMPLE-XXXXX-NOT-REAL',
  adminName: 'Maria Rodriguez',
  temporaryPassword: 'Welcome2Connie!',
  loginUrl: 'https://helpinghands.connie.team',
  connieAccountManager: 'Chris Berno',
  connieAccountManagerPhone: '(555) 555-5555',
};

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
  margin: '0 0 16px',
};

const text = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const detailsCard = {
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

const detailValueMono = {
  color: '#404040',
  fontSize: '14px',
  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
  padding: '8px 0',
  verticalAlign: 'top' as const,
  wordBreak: 'break-all' as const,
};

const managerCard = {
  margin: '24px 0',
  padding: '24px',
  backgroundColor: '#e8f4f8',
  borderRadius: '8px',
  borderLeft: '4px solid #0066cc',
};

const managerText = {
  color: '#404040',
  fontSize: '18px',
  lineHeight: '1.4',
  margin: '0 0 12px',
};

const alertBox = {
  backgroundColor: '#fff3cd',
  border: '2px solid #ffc107',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const alertTitle = {
  color: '#856404',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px',
};

const alertText = {
  color: '#856404',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
};

const ctaSection = {
  margin: '32px 0',
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
  display: 'inline-block',
  padding: '14px 32px',
};

const ctaNote = {
  color: '#666666',
  fontSize: '14px',
  margin: '12px 0 0',
};

const orientationSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f0f8f0',
  borderRadius: '8px',
  border: '1px solid #c8e6c9',
};

const orientationButtons = {
  width: '100%',
  marginTop: '16px',
};

const orientationButtonCell = {
  padding: '8px 0',
  textAlign: 'center' as const,
};

const buttonSecondary = {
  backgroundColor: '#ffffff',
  border: '2px solid #000000',
  borderRadius: '6px',
  color: '#000000',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const videoSection = {
  margin: '24px 0',
  textAlign: 'center' as const,
};

const videoLink = {
  display: 'block',
  textDecoration: 'none',
};

const videoThumbnail = {
  width: '100%',
  maxWidth: '504px',
  height: 'auto',
  borderRadius: '8px',
  border: '1px solid #e6e6e6',
};

const supportSection = {
  margin: '24px 0',
  padding: '20px',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  borderLeft: '4px solid #000000',
};

const supportText = {
  color: '#404040',
  fontSize: '16px',
  margin: '0 0 8px',
};

const link = {
  color: '#000000',
  textDecoration: 'underline',
};

const signature = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '32px 0 16px',
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

const footerLink = {
  color: '#666666',
  textDecoration: 'underline',
};

const footerAddress = {
  color: '#999999',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '16px 0 0',
  textAlign: 'center' as const,
};
