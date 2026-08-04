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

interface ConnieIntakeInternalNotificationProps {
  refNumber: string;
  orgName: string;
  contactName: string;
  email: string;
  phone: string;
  submittedAt: string;
  ppLeadUrl?: string;
  ppSyncStatus: 'synced' | 'failed';
  payloadAdminUrl: string;
}

export const ConnieIntakeInternalNotification = ({
  refNumber = '{{refNumber}}',
  orgName = '{{orgName}}',
  contactName = '{{contactName}}',
  email = '{{email}}',
  phone = '{{phone}}',
  submittedAt = '{{submittedAt}}',
  ppLeadUrl = '',
  ppSyncStatus = 'synced',
  payloadAdminUrl = 'https://connie.one/admin',
}: ConnieIntakeInternalNotificationProps) => {
  const synced = ppSyncStatus === 'synced';

  return (
    <Html>
      <Head>
        <title>New Testing Partner Intake — {orgName} ({refNumber})</title>
      </Head>
      <Preview>New Testing Partner Intake — {orgName} ({refNumber})</Preview>
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
              New Testing Partner Intake
            </Heading>

            <Text style={refLine}>{refNumber}</Text>

            <Section style={detailsSection}>
              <table style={detailsTable}>
                <tr>
                  <td style={detailLabel}>Organization:</td>
                  <td style={detailValue}>{orgName}</td>
                </tr>
                <tr>
                  <td style={detailLabel}>Contact:</td>
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
                <tr>
                  <td style={detailLabel}>Phone:</td>
                  <td style={detailValue}>
                    {phone ? (
                      <Link href={`tel:${phone}`} style={link}>
                        {phone}
                      </Link>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
                <tr>
                  <td style={detailLabel}>Submitted:</td>
                  <td style={detailValue}>{submittedAt}</td>
                </tr>
              </table>
            </Section>

            {/* PeoplePerson Sync Status */}
            <Section style={synced ? statusSectionOk : statusSectionFail}>
              {synced ? (
                <Text style={statusTextOk}>
                  Lead created —{' '}
                  {ppLeadUrl ? (
                    <Link href={ppLeadUrl} style={statusLinkOk}>
                      View in PeoplePerson
                    </Link>
                  ) : (
                    'View in PeoplePerson'
                  )}
                </Text>
              ) : (
                <Text style={statusTextFail}>
                  PP SYNC FAILED — create lead manually, full record in CMS
                </Text>
              )}
            </Section>

            {/* Full Record */}
            <Section style={buttonSection}>
              <Link href={payloadAdminUrl} style={button}>
                View full submission
              </Link>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Connie Intake Notification
            </Text>
            <Text style={footerText}>
              This is an automated internal notification from connie.one
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ConnieIntakeInternalNotification;

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
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '1.3',
  margin: '32px 0 8px',
};

const refLine = {
  color: '#666666',
  fontSize: '15px',
  fontWeight: '600',
  letterSpacing: '0.04em',
  margin: '0 0 8px 0',
};

const detailsSection = {
  margin: '20px 0',
  padding: '20px 24px',
  backgroundColor: '#f8f8f8',
  borderRadius: '8px',
};

const detailsTable = {
  width: '100%',
  borderCollapse: 'collapse' as const,
};

const detailLabel = {
  color: '#666666',
  fontSize: '14px',
  fontWeight: '600',
  padding: '6px 16px 6px 0',
  verticalAlign: 'top' as const,
  width: '130px',
};

const detailValue = {
  color: '#404040',
  fontSize: '16px',
  padding: '6px 0',
  verticalAlign: 'top' as const,
};

const statusSectionOk = {
  margin: '20px 0',
  padding: '16px 20px',
  backgroundColor: '#f0fdf4',
  borderRadius: '8px',
  borderLeft: '4px solid #16a34a',
};

const statusSectionFail = {
  margin: '20px 0',
  padding: '16px 20px',
  backgroundColor: '#fef2f2',
  borderRadius: '8px',
  borderLeft: '4px solid #dc2626',
};

const statusTextOk = {
  color: '#15803d',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.5',
  margin: '0',
};

const statusTextFail = {
  color: '#b91c1c',
  fontSize: '16px',
  fontWeight: '700',
  lineHeight: '1.5',
  margin: '0',
};

const statusLinkOk = {
  color: '#15803d',
  textDecoration: 'underline',
  fontWeight: '600',
};

const buttonSection = {
  margin: '28px 0 8px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '6px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 24px',
  textDecoration: 'none',
};

const link = {
  color: '#000000',
  textDecoration: 'underline',
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
