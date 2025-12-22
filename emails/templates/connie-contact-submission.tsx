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

interface ConnieContactSubmissionProps {
  name: string;
  email: string;
  company: string;
  phone?: string;
  inquiryType: string;
  message: string;
  submissionDate: string;
}

export const ConnieContactSubmission = ({
  name = '{{name}}',
  email = '{{email}}',
  company = '{{company}}',
  phone = '{{phone}}',
  inquiryType = '{{inquiryType}}',
  message = '{{message}}',
  submissionDate = '{{submissionDate}}',
}: ConnieContactSubmissionProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission - {company}</Preview>
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
              New Contact Form Submission
            </Heading>

            <Text style={text}>
              Someone has submitted a message through the connie.one contact form.
            </Text>

            <Hr style={hr} />

            {/* Contact Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={h2}>
                Contact Details
              </Heading>

              <table style={detailsTable}>
                <tbody>
                  <tr>
                    <td style={detailLabel}>Name:</td>
                    <td style={detailValue}>{name}</td>
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
                    <td style={detailLabel}>Company:</td>
                    <td style={detailValue}>{company}</td>
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
                    <td style={detailLabel}>Inquiry Type:</td>
                    <td style={detailValue}>{inquiryType}</td>
                  </tr>
                  <tr>
                    <td style={detailLabel}>Submitted:</td>
                    <td style={detailValue}>
                      {new Date(submissionDate).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        timeZoneName: 'short',
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>

            <Hr style={hr} />

            {/* Message */}
            <Section style={messageSection}>
              <Heading as="h2" style={h2}>
                Message
              </Heading>
              <Text style={messageText}>{message}</Text>
            </Section>

            <Hr style={hr} />

            {/* Quick Actions */}
            <Section style={quickActionsSection}>
              <Text style={quickActionsTitle}>Quick Actions:</Text>
              <Text style={text}>
                <Link
                  href={`mailto:${email}?subject=Re: Your inquiry to Connie - ${company}`}
                  style={actionLink}
                >
                  Reply to {name}
                </Link>
              </Text>
              <Text style={text}>
                <Link href="https://connie.one/contact" style={actionLink}>
                  View Contact Page
                </Link>
              </Text>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Connie Contact Form Notification
            </Text>
            <Text style={footerText}>
              This is an automated notification from connie.one
            </Text>
            <Text style={footerAddress}>
              Nevada Senior Services - Reno, NV
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ConnieContactSubmission;

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

const messageSection = {
  margin: '24px 0',
};

const messageText = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '1.8',
  margin: '16px 0',
  padding: '16px',
  backgroundColor: '#f8f8f8',
  borderRadius: '8px',
  borderLeft: '4px solid #000000',
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
