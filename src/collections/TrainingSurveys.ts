import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const TrainingSurveys: CollectionConfig = {
  slug: 'training-surveys',
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'organization', 'overallSatisfaction', 'npsScore', 'createdAt'],
    description: 'Connie Training Survey responses — 19-question NSS feedback form',
  },
  fields: [
    // Contact Info
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Respondent name' },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: { description: 'Respondent email address' },
    },
    {
      name: 'phone',
      type: 'text',
      admin: { description: 'Respondent phone number (optional)' },
    },
    {
      name: 'organization',
      type: 'text',
      required: true,
      admin: { description: 'Organization name' },
    },

    // Section 1: Onboarding & First Impressions
    {
      name: 'trainingRating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      admin: { description: 'Q1: How would you rate the onboarding/training process? (1-5)' },
    },
    {
      name: 'trainingRatingComment',
      type: 'textarea',
      admin: { description: 'Q1 follow-up comment' },
    },
    {
      name: 'trainingConfidence',
      type: 'text',
      required: true,
      admin: { description: 'Q2: Confident using Connie on your own? (Yes/No/Somewhat)' },
    },
    {
      name: 'trainingConfidenceComment',
      type: 'textarea',
      admin: { description: 'Q2 follow-up comment' },
    },
    {
      name: 'trainingHelpful',
      type: 'textarea',
      admin: { description: 'Q3: Most helpful part of training' },
    },
    {
      name: 'trainingClearer',
      type: 'textarea',
      admin: { description: 'Q4: What could have been clearer' },
    },

    // Section 2: Before vs. After
    {
      name: 'oldCommMethods',
      type: 'array',
      admin: { description: 'Q5: Previous communication methods' },
      fields: [{ name: 'method', type: 'text' }],
    },
    {
      name: 'connieSpeedRating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      admin: { description: 'Q6a: Connie rating — Speed of communication (1-5)' },
    },
    {
      name: 'connieReachRating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      admin: { description: 'Q6b: Connie rating — Ease of reaching clients (1-5)' },
    },
    {
      name: 'connieHistoryRating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      admin: { description: 'Q6c: Connie rating — Tracking conversation history (1-5)' },
    },
    {
      name: 'connieResponseSpeed',
      type: 'text',
      required: true,
      admin: { description: 'Q7: Has Connie changed response speed? (Yes/No/Not sure)' },
    },
    {
      name: 'connieResponseSpeedComment',
      type: 'textarea',
      admin: { description: 'Q7 follow-up comment' },
    },

    // Section 3: What's Working Well
    {
      name: 'usefulFeatures',
      type: 'array',
      admin: { description: 'Q8: Most useful Connie features' },
      fields: [{ name: 'feature', type: 'text' }],
    },
    {
      name: 'connieBetter',
      type: 'textarea',
      admin: { description: 'Q9: What Connie does better than old system' },
    },

    // Section 4: Challenges & Friction Points
    {
      name: 'hasTechnicalIssues',
      type: 'text',
      required: true,
      admin: { description: 'Q10: Experienced technical issues? (Yes/No)' },
    },
    {
      name: 'technicalIssuesDescription',
      type: 'textarea',
      admin: { description: 'Q10 follow-up: Description of technical issues' },
    },
    {
      name: 'confusingFeatures',
      type: 'textarea',
      admin: { description: 'Q11: Confusing or hard-to-use features' },
    },
    {
      name: 'slowdowns',
      type: 'textarea',
      admin: { description: 'Q12: What slowed you down' },
    },

    // Section 5: Support & Training Needs
    {
      name: 'additionalTraining',
      type: 'textarea',
      admin: { description: 'Q13: Additional training/resources needed' },
    },
    {
      name: 'preferredTrainingFormat',
      type: 'array',
      admin: { description: 'Q14: Preferred training format' },
      fields: [{ name: 'format', type: 'text' }],
    },

    // Section 6: Overall Satisfaction
    {
      name: 'overallSatisfaction',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      admin: { description: 'Q15: Overall satisfaction (1-5)' },
    },
    {
      name: 'npsScore',
      type: 'number',
      min: 0,
      max: 10,
      required: true,
      admin: { description: 'Q16: NPS — How likely to recommend Connie (0-10)' },
    },
    {
      name: 'otherFeedback',
      type: 'textarea',
      admin: { description: 'Q17: Other feedback, suggestions, or concerns' },
    },

    // Section 7: Role-Specific Context
    {
      name: 'primaryRole',
      type: 'text',
      admin: { description: 'Q18: Primary role at NSS' },
    },
    {
      name: 'weeklyClientCount',
      type: 'text',
      admin: { description: 'Q19: Clients communicated with per week' },
    },
  ],
  timestamps: true,
}
