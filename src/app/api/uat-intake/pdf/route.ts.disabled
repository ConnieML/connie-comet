import { NextResponse } from 'next/server'
import { renderToStream } from '@react-pdf/renderer'
import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
  },
  logo: {
    fontSize: 28,
    color: '#4f46e5',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#1e293b',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#64748b',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#1e293b',
    textDecoration: 'underline',
    marginBottom: 8,
  },
  field: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 3,
  },
  fieldLine: {
    borderBottom: '0.5pt solid #cbd5e1',
    marginBottom: 5,
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  checkbox: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 3,
  },
  footer: {
    marginTop: 30,
    fontSize: 8,
    color: '#94a3b8',
    textAlign: 'center',
  },
})

// PDF Document Component
const UATDiscoveryPDF = () => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Connie</Text>
        <Text style={styles.tagline}>Cloud Communications Platform for Nonprofits</Text>
        <Text style={styles.title}>UAT Partner Discovery Form</Text>
        <Text style={styles.subtitle}>User Acceptance Testing Cohort Application</Text>
      </View>

      {/* Section 1: Organization Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Organization Information</Text>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Organization Name *:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Primary Contact Name *:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Contact Title/Role:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Email Address *:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Phone Number:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Organization Type *:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Service Area/Location:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Clients Served Monthly:</Text>
          <View style={styles.fieldLine} />
        </View>
      </View>

      {/* Section 2: Hours of Operation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hours of Operation</Text>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Days of Operation *:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Typical Operating Hours *:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>After-hours or weekend support?</Text>
          <View style={styles.fieldLine} />
        </View>
      </View>

      {/* Section 3: Staffing */}
      <View style={styles.section} break>
        <Text style={styles.sectionTitle}>Staffing & Usage Patterns</Text>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>How many staff members will actively use Connie? *:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Staff roles description:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Average hours per day each staff member will use the platform *:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Days per month you typically operate *:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Which days tend to be your busiest?</Text>
          <View style={styles.fieldLine} />
        </View>
      </View>

      {/* Section 4: Communication Volumes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Communication Volumes</Text>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Channels interested in migrating to cloud *:</Text>
          <View style={styles.checkboxGroup}>
            <Text style={styles.checkbox}>☐ Live Voice Calls</Text>
            <Text style={styles.checkbox}>  ☐ Messaging SMS/TXT</Text>
            <Text style={styles.checkbox}>  ☐ Webchat</Text>
            <Text style={styles.checkbox}>  ☐ Webforms</Text>
          </View>
          <View style={styles.checkboxGroup}>
            <Text style={styles.checkbox}>☐ Email</Text>
            <Text style={styles.checkbox}>  ☐ Fax</Text>
            <Text style={styles.checkbox}>  ☐ Social Media</Text>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Monthly Inbound Phone Calls:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Monthly Outbound Phone Calls:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Average Call Duration *:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Monthly Inbound Faxes:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Monthly Outbound Faxes:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Average Pages per Inbound Fax:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Average Pages per Outbound Fax:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Monthly Emails Sent:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Monthly Emails Received:</Text>
          <View style={styles.fieldLine} />
        </View>
      </View>

      {/* Section 5: Technology */}
      <View style={styles.section} break>
        <Text style={styles.sectionTitle}>Current Technology Setup</Text>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Do you have dedicated Technical Resources? *:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Current Phone System:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Main Business Line(s):</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Current Business Phone Provider:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Current Fax System:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Email System:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Website Status:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Biggest communication pain points *:</Text>
          <View style={styles.fieldLine} />
        </View>
      </View>

      {/* Section 6: UAT Goals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Acceptance Testing (UAT) Cohort Goals & Timeline</Text>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>When would you ideally like to start UAT? *:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Specific Target Date (if any):</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Anticipated UAT Duration:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Primary Goals for UAT Participation *:</Text>
          <View style={styles.checkboxGroup}>
            <Text style={styles.checkbox}>☐ Test platform reliability and performance</Text>
          </View>
          <View style={styles.checkboxGroup}>
            <Text style={styles.checkbox}>☐ Validate cost savings vs. current systems</Text>
          </View>
          <View style={styles.checkboxGroup}>
            <Text style={styles.checkbox}>☐ Provide feedback on features and usability</Text>
          </View>
          <View style={styles.checkboxGroup}>
            <Text style={styles.checkbox}>☐ Train staff on modern communication tools</Text>
          </View>
          <View style={styles.checkboxGroup}>
            <Text style={styles.checkbox}>☐ Explore integration with existing systems</Text>
          </View>
          <View style={styles.checkboxGroup}>
            <Text style={styles.checkbox}>☐ Help improve the platform for other nonprofits</Text>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Budget Approval Process:</Text>
          <View style={styles.fieldLine} />
        </View>
      </View>

      {/* Section 7: Additional Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Information</Text>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Anything else we should know?</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>How did you hear about the Connie UAT Cohort?</Text>
          <View style={styles.fieldLine} />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>By submitting, you agree to receive communications from Nevada Senior Services about the Connie UAT program.</Text>
        <Text>Generated: {new Date().toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
)

export async function GET() {
  try {
    const stream = await renderToStream(React.createElement(UATDiscoveryPDF))

    return new NextResponse(stream as unknown as ReadableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="UAT-Partner-Discovery-Form.pdf"',
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
