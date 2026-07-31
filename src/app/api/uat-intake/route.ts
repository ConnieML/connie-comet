import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Resend } from 'resend'
import ConnieUATSubmissionNotification from '../../../../emails/templates/connie-uat-submission-notification'

// Lazy initialization to prevent build-time errors when env var is missing
const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not configured')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

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

    // Write the row at an explicitly computed position.
    //
    // Do NOT use values.append here. append() anchors to the first column of the
    // data block it detects, not to the range it is given. The original range
    // 'Intake Data!A:AZ' was 52 columns wide while rowData is 58 fields, so from
    // 2025-12-22 rows drifted right and landed at column AZ — and once a drifted
    // block existed, append kept detecting THAT block and writing at AZ even
    // after the range was widened. Seven rows (including two real prospects) were
    // repaired on 2026-07-31; this write is deterministic so it cannot recur.
    const existingRows = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Intake Data!A:A',
    })
    const nextRow = (existingRows.data.values?.length ?? 1) + 1

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Intake Data!A${nextRow}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData]
      }
    })

    // Send email notifications
    const submissionDate = new Date().toISOString()
    const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`

    // A failed notification must never be reported as an unqualified success.
    // From 2025-11-06 to 2026-07-31 this block caught a hard 403 (unverified
    // sender domain) and still returned {success: true}, so a nine-month
    // notification outage looked healthy to every caller and every smoke test.
    // The submission itself is already safely in the sheet by this point, so we
    // still return 200 — losing a lead or prompting a duplicate submission would
    // be worse than a missed email — but `notified` now carries the truth and is
    // the field to assert in any health check.
    let notified = false
    let notificationError: string | undefined

    try {
      const resend = getResendClient()
      const { error } = await resend.emails.send({
        // send.connie.one was never verified in Resend. connie.one is.
        from: 'Connie Team <uat@connie.one>',
        to: ['cberno@nevadaseniorservices.org', 'admin@connie.direct', 'cmorris@thebensonagency.com'],
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

      // The Resend SDK reports API-level rejections (403 unverified domain,
      // invalid recipient) in `error` rather than by throwing — the original
      // catch block could never have seen them.
      if (error) {
        notificationError = `${error.name}: ${error.message}`
        console.error('[uat-intake] NOTIFICATION FAILED (row saved):', notificationError)
      } else {
        notified = true
        console.log('[uat-intake] notification sent for', formData.orgName)
      }
    } catch (emailError) {
      notificationError = emailError instanceof Error ? emailError.message : 'Unknown error'
      console.error('[uat-intake] NOTIFICATION THREW (row saved):', emailError)
    }

    return NextResponse.json({ success: true, row: nextRow, notified, notificationError })
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
