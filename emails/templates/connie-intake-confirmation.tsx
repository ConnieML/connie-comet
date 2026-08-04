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

interface ConnieIntakeConfirmationProps {
  refNumber: string;
  contactName: string;
  orgName: string;
  submittedAt: string;
  sections: Array<{
    title: string;
    items: Array<{ label: string; value: string }>;
  }>;
}

export const ConnieIntakeConfirmation = ({
  refNumber = '{{refNumber}}',
  contactName = '{{contactName}}',
  orgName = '{{orgName}}',
  submittedAt = '{{submittedAt}}',
  sections = [],
}: ConnieIntakeConfirmationProps) => {
  return (
    <Html>
      <Head>
        <title>Your Connie Testing Partner application — {refNumber}</title>
      </Head>
      <Preview>Your Connie Testing Partner application — {refNumber}</Preview>
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
              Thank you for applying to become a Connie Testing Partner
            </Heading>

            <Text style={text}>
              Hi {contactName},
            </Text>

            <Text style={text}>
              We received your application on behalf of <strong>{orgName}</strong>, and
              we&apos;re glad you want to help shape Connie. Below is a copy of everything you
              submitted, for your records.
            </Text>

            {/* Reference Number */}
            <Section style={refSection}>
              <Text style={refLabel}>Your reference number</Text>
              <Text style={refValue}>{refNumber}</Text>
              <Text style={refHint}>
                Please quote this reference number in any correspondence with us.
              </Text>
            </Section>

            <Text style={metaText}>Submitted: {submittedAt}</Text>

            <Hr style={hr} />

            {/* Submitted Answers */}
            <Heading as="h2" style={h2}>
              Your submission
            </Heading>

            {sections.map((section, sectionIndex) => (
              <Section key={`section-${sectionIndex}`} style={detailsSection}>
                <Heading as="h3" style={h3}>
                  {section.title}
                </Heading>

                <table style={detailsTable}>
                  {section.items.map((item, itemIndex) => (
                    <tr key={`section-${sectionIndex}-item-${itemIndex}`}>
                      <td style={detailLabel}>{item.label}</td>
                      <td style={detailValue}>{item.value}</td>
                    </tr>
                  ))}
                </table>
              </Section>
            ))}

            <Hr style={hr} />

            {/* What Happens Next */}
            <Section style={ctaSection}>
              <Heading as="h2" style={h2}>
                What happens next
              </Heading>

              <table style={actionList}>
                <tr>
                  <td style={actionNumber}>1.</td>
                  <td style={actionText}>
                    The Connie team reviews your information within 2 business days.
                  </td>
                </tr>
                <tr>
                  <td style={actionNumber}>2.</td>
                  <td style={actionText}>
                    We&apos;ll prepare your customized estimate.
                  </td>
                </tr>
                <tr>
                  <td style={actionNumber}>3.</td>
                  <td style={actionText}>
                    You&apos;ll hear from us within 5–7 business days to schedule a follow-up
                    call.
                  </td>
                </tr>
              </table>
            </Section>

            <Text style={text}>
              Questions in the meantime? Just reply to this email or reach us at{' '}
              <Link href="mailto:support@connie.team" style={link}>
                support@connie.team
              </Link>
              .
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Connie ·{' '}
              <Link href="mailto:support@connie.team" style={link}>
                support@connie.team
              </Link>
            </Text>
            <Text style={footerText}>
              Reference: {refNumber}
            </Text>
            <Text style={footerAddress}>
              © Connie
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ConnieIntakeConfirmation;

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

const h3 = {
  color: '#000000',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.4',
  margin: '0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.04em',
};

const text = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const metaText = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '16px 0 0',
};

const refSection = {
  margin: '24px 0',
  padding: '20px 24px',
  backgroundColor: '#f0f7ff',
  borderRadius: '8px',
  borderLeft: '4px solid #2563eb',
};

const refLabel = {
  color: '#666666',
  fontSize: '13px',
  fontWeight: '600',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  margin: '0 0 8px 0',
};

const refValue = {
  color: '#000000',
  fontSize: '26px',
  fontWeight: '700',
  letterSpacing: '0.02em',
  lineHeight: '1.2',
  margin: '0',
};

const refHint = {
  color: '#666666',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '10px 0 0 0',
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
  width: '180px',
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

const footerAddress = {
  color: '#999999',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '16px 0 0',
  textAlign: 'center' as const,
};
