import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Resend } from 'resend'
import ConnieUATSubmissionNotification from '../../../../emails/templates/connie-uat-submission-notification'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Set up Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = '10fcAN8I6yu-c53ucZ92CzrlSXqh4yDCjrILg9n1_ZV8'

    // Prepare row data matching the header structure
    const rowData = [
      formData.orgName,
      formData.contactName,
      formData.contactTitle,
      formData.email,
      formData.phone,
      formData.orgType,
      formData.orgTypeOther,
      formData.serviceArea,
      formData.clientsServed,
      formData.daysOfOperation.join(', '),
      formData.operatingHours,
      formData.afterHoursSupport,
      formData.afterHoursDescription,
      formData.staffCount,
      formData.staffRoles,
      formData.hoursPerDay,
      formData.daysPerMonth,
      formData.busiestDays.join(', '),
      formData.usageNotes,
      formData.channelsToMigrate.join(', '), // NEW
      formData.socialMediaPlatforms.join(', '), // NEW
      formData.inboundCalls,
      formData.outboundCalls,
      formData.avgCallDuration,
      formData.inboundFaxes,
      formData.outboundFaxes,
      formData.avgFaxPagesInbound, // NEW
      formData.avgFaxPagesOutbound, // NEW
      formData.emailsSent,
      formData.emailsReceived,
      formData.smsUsage,
      formData.smsVolume,
      formData.webFormsUsage,
      formData.formSubmissions,
      formData.hasTechnicalResources, // NEW
      formData.technicalResourcesDescription, // NEW
      formData.phoneSystem,
      formData.phoneSystemDetails,
      formData.mainBusinessLines, // NEW
      formData.businessPhoneProvider, // NEW
      formData.faxSystem,
      formData.faxSystemDetails,
      formData.emailSystem,
      formData.emailSystemDetails,
      formData.websiteStatus,
      formData.painPoints,
      formData.idealStart,
      formData.targetDate,
      formData.duration,
      formData.primaryGoals.join(', '),
      formData.otherGoals,
      formData.budgetProcess,
      formData.approvalTimeline,
      formData.excitedAbout,
      formData.additionalContext,
      formData.howHeard,
      formData.referralDetails,
      new Date().toISOString() // Submission date
    ]

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Intake Data!A:AZ',
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData]
      }
    })

    // Send email notifications
    const submissionDate = new Date().toISOString()
    const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`

    try {
      // Send to both admin emails
      await resend.emails.send({
        from: 'Connie Team <uat@send.connie.one>',
        to: ['cberno@nevadaseniorservices.org', 'admin@connie.direct'],
        subject: `New UAT Discovery Form Submission - ${formData.orgName}`,
        react: ConnieUATSubmissionNotification({
          organizationName: formData.orgName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          submissionDate,
          spreadsheetUrl,
        }),
      })

      console.log('Email notification sent successfully')
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('Failed to send email notification:', emailError)
      console.error('Email error details:', JSON.stringify(emailError, null, 2))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error submitting intake form:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    console.error('Private key exists:', !!process.env.GOOGLE_PRIVATE_KEY)
    console.error('Private key first 50 chars:', process.env.GOOGLE_PRIVATE_KEY?.substring(0, 50))
    console.error('Client email:', process.env.GOOGLE_CLIENT_EMAIL)
    return NextResponse.json(
      {
        error: 'Failed to submit form',
        // Temporarily expose error details for debugging (remove after fixing!)
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
