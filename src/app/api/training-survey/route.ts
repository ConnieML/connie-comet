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

    const payload = await getPayload({ config })

    const surveyResponse = await payload.create({
      collection: 'training-surveys',
      data: {
        // Contact Info
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        organization: formData.organization,

        // Section 1: Onboarding
        trainingRating: parseInt(formData.trainingRating, 10),
        trainingRatingComment: formData.trainingRatingComment || '',
        trainingConfidence: formData.trainingConfidence,
        trainingConfidenceComment: formData.trainingConfidenceComment || '',
        trainingHelpful: formData.trainingHelpful || '',
        trainingClearer: formData.trainingClearer || '',

        // Section 2: Before/After
        oldCommMethods: (formData.oldCommMethods || []).map((method: string) => ({ method })),
        connieSpeedRating: parseInt(formData.connieSpeedRating, 10),
        connieReachRating: parseInt(formData.connieReachRating, 10),
        connieHistoryRating: parseInt(formData.connieHistoryRating, 10),
        connieResponseSpeed: formData.connieResponseSpeed,
        connieResponseSpeedComment: formData.connieResponseSpeedComment || '',

        // Section 3: What's Working
        usefulFeatures: (formData.usefulFeatures || []).map((feature: string) => ({ feature })),
        connieBetter: formData.connieBetter || '',

        // Section 4: Challenges
        hasTechnicalIssues: formData.hasTechnicalIssues,
        technicalIssuesDescription: formData.technicalIssuesDescription || '',
        confusingFeatures: formData.confusingFeatures || '',
        slowdowns: formData.slowdowns || '',

        // Section 5: Support
        additionalTraining: formData.additionalTraining || '',
        preferredTrainingFormat: (formData.preferredTrainingFormat || []).map((format: string) => ({ format })),

        // Section 6: Satisfaction
        overallSatisfaction: parseInt(formData.overallSatisfaction, 10),
        npsScore: parseInt(formData.npsScore, 10),
        otherFeedback: formData.otherFeedback || '',

        // Section 7: Role Context
        primaryRole: formData.primaryRole || '',
        weeklyClientCount: formData.weeklyClientCount || '',
      },
    })

    // Send email notifications
    const submissionDate = new Date().toISOString()
    const adminUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/training-surveys/${surveyResponse.id}`
    const npsNum = parseInt(formData.npsScore, 10)
    const npsLabel = npsNum >= 9 ? 'Promoter' : npsNum >= 7 ? 'Passive' : 'Detractor'

    try {
      const resend = getResendClient()
      await resend.emails.send({
        from: 'Connie Surveys <surveys@connie.one>',
        to: ['chris@connie.team', 'andrea@connie.team'],
        subject: `New Training Survey - ${formData.organization} (NPS: ${formData.npsScore}/10 - ${npsLabel})`,
        react: ConnieTrainingSurveyNotification({
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          trainingRating: formData.trainingRating,
          overallSatisfaction: formData.overallSatisfaction,
          npsScore: formData.npsScore,
          npsLabel,
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
