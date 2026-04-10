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

interface ConnieTrainingSurveyNotificationProps {
  name: string;
  email: string;
  organization: string;
  trainingRating?: string;
  overallSatisfaction?: string;
  npsScore?: string;
  npsLabel?: string;
  submissionDate: string;
  spreadsheetUrl?: string;
}

export const ConnieTrainingSurveyNotification = ({
  name = '{{name}}',
  email = '{{email}}',
  organization = '{{organization}}',
  trainingRating = '{{trainingRating}}',
  overallSatisfaction = '{{overallSatisfaction}}',
  npsScore = '{{npsScore}}',
  npsLabel = '{{npsLabel}}',
  submissionDate = '{{submissionDate}}',
  spreadsheetUrl = 'https://connie.one/admin',
}: ConnieTrainingSurveyNotificationProps) => {
  const npsEmoji = npsLabel === 'Promoter' ? '\u2705' : npsLabel === 'Passive' ? '\uD83D\uDE10' : '\u274C';

  return (
    <Html>
      <Head />
      <Preview>New Training Survey - {organization} (NPS: {npsScore}/10)</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src="https://connie.one/connie-logo_v1-white.svg"
              width="193"
              height="51"
              alt="Connie"
              style={logo}
            />
          </Section>

          <Section style={content}>
            <Heading style={h1}>
              New Training Survey Submission
            </Heading>

            <Text style={text}>
              A new 19-question NSS training survey has been completed.
            </Text>

            <Hr style={hr} />

            <Section style={detailsSection}>
              <Heading as="h2" style={h2}>
                Respondent
              </Heading>

              <table style={detailsTable}>
                <tr>
                  <td style={detailLabel}>Name:</td>
                  <td style={detailValue}>{name}</td>
                </tr>
                <tr>
                  <td style={detailLabel}>Organization:</td>
                  <td style={detailValue}>{organization}</td>
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

            <Section style={scoresSection}>
              <Heading as="h2" style={h2}>
                Key Scores
              </Heading>

              <table style={detailsTable}>
                <tr>
                  <td style={detailLabel}>Training Rating:</td>
                  <td style={detailValue}><strong>{trainingRating}/5</strong></td>
                </tr>
                <tr>
                  <td style={detailLabel}>Overall Satisfaction:</td>
                  <td style={detailValue}><strong>{overallSatisfaction}/5</strong></td>
                </tr>
                <tr>
                  <td style={detailLabel}>NPS Score:</td>
                  <td style={detailValue}>
                    <strong>{npsScore}/10</strong> {npsEmoji} {npsLabel}
                  </td>
                </tr>
              </table>
            </Section>

            <Hr style={hr} />

            <Section style={quickActionsSection}>
              <Text style={quickActionsTitle}>Quick Actions:</Text>
              <Text style={text}>
                <Link href={`mailto:${email}?subject=Re: Connie Training Survey - ${organization}`} style={actionLink}>
                  Send Email to {name}
                </Link>
              </Text>
              <Text style={text}>
                <Link href={spreadsheetUrl} style={actionLink}>
                  View Full Response in Payload Admin
                </Link>
              </Text>
            </Section>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              Connie Survey Notification
            </Text>
            <Text style={footerText}>
              This is an automated notification from connie.one
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ConnieTrainingSurveyNotification;

// Styles
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

const scoresSection = {
  margin: '24px 0',
  padding: '24px',
  backgroundColor: '#f0f7ff',
  borderRadius: '8px',
  borderLeft: '4px solid #2563eb',
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
  width: '160px',
};

const detailValue = {
  color: '#404040',
  fontSize: '16px',
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
