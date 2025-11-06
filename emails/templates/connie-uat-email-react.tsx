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

interface ConnieUATInviteEmailProps {
  organizationName?: string;
  contactName?: string;
}

export const ConnieUATInviteEmail = ({
  organizationName = '{{organizationName}}',
  contactName = '{{contactName}}',
}: ConnieUATInviteEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>You're invited to join the Connie UAT Cohort Program</Preview>
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
              You're Invited:<br />
              🧪 Connie UAT Cohort Program
            </Heading>

            <Text style={text}>Hi {organizationName} team,</Text>

            <Text style={text}>
              Thank you for your interest in joining the Connie UAT Cohort,
              the communication platform built specifically for nonprofits serving
              vulnerable populations.
            </Text>

            <Text style={text}>
              We're excited to work with {organizationName} to test and refine Connie
              before our full launch. Your feedback will directly shape the future of
              nonprofit communication technology.
            </Text>

            {/* CTA Section */}
            <Section style={ctaSection}>
              <Heading as="h2" style={h2}>
                Next Step: Complete Discovery
              </Heading>

              <Text style={text}>
                To set up your customized test environment, we need to understand your
                organization's specific needs and communication patterns.
              </Text>

              <Button style={button} href="https://connie.one/dataroom/user-acceptance-testing/discovery">
                🧪 Start UAT Discovery
              </Button>

              <Text style={timeEstimate}>Takes 10-15 minutes</Text>
            </Section>

            {/* What's Covered */}
            <Section style={listSection}>
              <Text style={listIntro}>This discovery form covers:</Text>
              <ul style={list}>
                <li style={listItem}>Your organization's communication volumes</li>
                <li style={listItem}>Current technology setup</li>
                <li style={listItem}>Operational patterns and staffing</li>
                <li style={listItem}>UAT timeline and goals</li>
              </ul>
            </Section>

            {/* Support */}
            <Text style={text}>
              Questions? Reply to this email or reach us at{' '}
              <Link href="mailto:uat@connie.one" style={link}>
                uat@connie.one
              </Link>
            </Text>

            <Text style={signature}>
              Looking forward to partnering with you,
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
              {' · '}
              <Link href="{{unsubscribeUrl}}" style={footerLink}>
                Unsubscribe
              </Link>
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

export default ConnieUATInviteEmail;

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

const ctaSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f8f8f8',
  borderRadius: '8px',
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 24px',
  margin: '16px 0',
};

const timeEstimate = {
  color: '#666666',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '8px 0 0',
};

const listSection = {
  margin: '24px 0',
};

const listIntro = {
  color: '#404040',
  fontSize: '16px',
  fontWeight: '600',
  margin: '16px 0 8px',
};

const list = {
  margin: '8px 0',
  paddingLeft: '24px',
};

const listItem = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '8px 0',
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
