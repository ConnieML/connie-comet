import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getPayload } from 'payload'
import config from '@payload-config'
import ConnieTrainingSurveyNotification from '../../../../emails/templates/connie-training-survey-notification'

const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not configured')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Get Payload instance
    const payload = await getPayload({ config })

    // Save to Payload collection
    const surveyResponse = await payload.create({
      collection: 'training-surveys',
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        organization: formData.organization,
        servicesUsed: formData.servicesUsed.map((service: string) => ({ service })),
        overallSatisfaction: parseInt(formData.overallSatisfaction, 10),
        staffProfessionalism: parseInt(formData.staffProfessionalism, 10),
        communicationEase: formData.communicationEase,
        whatWorking: formData.whatWorking || '',
        whatImprove: formData.whatImprove || '',
        wouldRecommend: formData.wouldRecommend || '',
        additionalComments: formData.additionalComments || '',
      },
    })

    // Send email notifications
    const submissionDate = new Date().toISOString()
    const adminUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/training-surveys/${surveyResponse.id}`

    try {
      const resend = getResendClient()
      await resend.emails.send({
        from: 'Connie Surveys <surveys@send.connie.one>',
        to: ['admin@connie.direct', 'andrea@connie.tel'],
        subject: `New Training Survey - ${formData.organization}`,
        react: ConnieTrainingSurveyNotification({
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          overallSatisfaction: formData.overallSatisfaction,
          submissionDate,
          spreadsheetUrl: adminUrl,
        }),
      })

      console.log('Email notification sent successfully')
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error submitting training survey:', error)
    return NextResponse.json(
      {
        error: 'Failed to submit form',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
