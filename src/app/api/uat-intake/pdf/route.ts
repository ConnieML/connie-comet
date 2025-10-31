import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'

export async function GET() {
  try {
    // Create a new PDF document
    const doc = new PDFDocument({
      size: 'LETTER',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    })

    // Create a buffer to store PDF
    const chunks: Buffer[] = []

    doc.on('data', (chunk) => chunks.push(chunk))

    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)))
    })

    // Add Connie Logo/Brand
    doc.fontSize(28).fillColor('#4f46e5').text('Connie', 50, 50)
    doc.fontSize(10).fillColor('#64748b').text('Cloud Communications Platform for Nonprofits', 50, 80)
    doc.moveDown(3)

    // Header
    doc.fontSize(20).fillColor('#1e293b').text('UAT Partner Discovery Form', { align: 'center' })
    doc.moveDown(0.5)
    doc.fontSize(12).fillColor('#64748b').text('User Acceptance Testing Cohort Application', { align: 'center' })
    doc.moveDown(1.5)

    const addSection = (title: string) => {
      doc.fontSize(14).fillColor('#1e293b').text(title, { underline: true })
      doc.moveDown(0.5)
    }

    const addField = (label: string, required = false) => {
      doc.fontSize(10).fillColor('#475569').text(`${label}${required ? ' *' : ''}:`)
      doc.moveDown(0.3)
      doc.strokeColor('#cbd5e1').lineWidth(0.5).moveTo(70, doc.y).lineTo(550, doc.y).stroke()
      doc.moveDown(0.8)
    }

    const checkPageSpace = (needed = 100) => {
      if (doc.y > 700) {
        doc.addPage()
      }
    }

    // Section 1: Organization Information
    addSection('Organization Information')
    addField('Organization Name', true)
    addField('Primary Contact Name', true)
    addField('Contact Title/Role')
    addField('Email Address', true)
    addField('Phone Number')
    addField('Organization Type', true)
    addField('Service Area/Location')
    addField('Clients Served Monthly')
    doc.moveDown(1)

    checkPageSpace()

    // Section 2: Hours of Operation
    addSection('Hours of Operation')
    addField('Days of Operation', true)
    addField('Typical Operating Hours', true)
    addField('After-hours or weekend support?')
    doc.moveDown(1)

    checkPageSpace()

    // Section 3: Staffing & Usage Patterns
    addSection('Staffing & Usage Patterns')
    addField('How many staff members will actively use Connie?', true)
    addField('Staff roles description')
    addField('Average hours per day each staff member will use the platform', true)
    addField('Days per month you typically operate', true)
    addField('Which days tend to be your busiest?')
    doc.moveDown(1)

    checkPageSpace()

    // Section 4: Communication Volumes
    addSection('Current Communication Volumes')
    doc.fontSize(10).fillColor('#475569').text('Channels interested in migrating to cloud: *')
    doc.fontSize(9).fillColor('#64748b')
    doc.text('☐ Live Voice Calls  ☐ Messaging SMS/TXT  ☐ Webchat  ☐ Webforms')
    doc.text('☐ Email  ☐ Fax  ☐ Social Media')
    doc.moveDown(0.8)

    addField('Monthly Inbound Phone Calls')
    addField('Monthly Outbound Phone Calls')
    addField('Average Call Duration', true)
    addField('Monthly Inbound Faxes')
    addField('Monthly Outbound Faxes')
    addField('Average Pages per Inbound Fax')
    addField('Average Pages per Outbound Fax')
    addField('Monthly Emails Sent')
    addField('Monthly Emails Received')
    doc.moveDown(1)

    checkPageSpace()

    // Section 5: Current Technology Setup
    addSection('Current Technology Setup')
    addField('Do you have dedicated Technical Resources?', true)
    addField('Current Phone System')
    addField('Main Business Line(s)')
    addField('Current Business Phone Provider')
    addField('Current Fax System')
    addField('Email System')
    addField('Website Status')
    addField('Biggest communication pain points', true)
    doc.moveDown(1)

    checkPageSpace()

    // Section 6: UAT Timeline & Goals
    addSection('User Acceptance Testing (UAT) Cohort Goals & Timeline')
    addField('When would you ideally like to start UAT?', true)
    addField('Specific Target Date (if any)')
    addField('Anticipated UAT Duration')
    doc.fontSize(10).fillColor('#475569').text('Primary Goals for UAT Participation: *')
    doc.fontSize(9).fillColor('#64748b')
    doc.text('☐ Test platform reliability and performance')
    doc.text('☐ Validate cost savings vs. current systems')
    doc.text('☐ Provide feedback on features and usability')
    doc.text('☐ Train staff on modern communication tools')
    doc.text('☐ Explore integration with existing systems')
    doc.text('☐ Help improve the platform for other nonprofits')
    doc.moveDown(0.8)
    addField('Budget Approval Process')
    doc.moveDown(1)

    checkPageSpace()

    // Section 7: Additional Information
    addSection('Additional Information')
    addField('Anything else we should know?')
    addField('How did you hear about the Connie UAT Cohort?')
    doc.moveDown(2)

    // Footer
    doc.fontSize(8).fillColor('#94a3b8')
    doc.text('By submitting, you agree to receive communications from Nevada Senior Services about the Connie UAT program.', {
      align: 'center'
    })
    doc.moveDown(0.5)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'center' })

    // Finalize PDF
    doc.end()

    const pdfBuffer = await pdfPromise

    // Return PDF as downloadable file
    return new NextResponse(pdfBuffer, {
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
