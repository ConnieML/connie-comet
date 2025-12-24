import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import ConnieContactSubmission from '../../../../emails/templates/connie-contact-submission'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.company || !formData.inquiryType || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format (same regex as client-side ContactForm.tsx)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      )
    }

    // Send email notification
    await resend.emails.send({
      from: `${formData.name} via Connie <contact@connie.one>`,
      replyTo: formData.email,
      to: ['admin@connie.direct', 'careteam@connie.support'],
      subject: `New Contact Form Submission - ${formData.company}`,
      react: ConnieContactSubmission({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        inquiryType: formData.inquiryType,
        message: formData.message,
        submissionDate: new Date().toISOString(),
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
