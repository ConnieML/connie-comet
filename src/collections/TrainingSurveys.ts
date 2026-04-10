import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const TrainingSurveys: CollectionConfig = {
  slug: 'training-surveys',
  access: {
    create: anyone, // Allow public submissions
    read: authenticated, // Only authenticated users can view
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'organization', 'email', 'overallSatisfaction', 'createdAt'],
    description: 'Connie Training Survey responses from users',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Respondent name',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Respondent email address',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Respondent phone number (optional)',
      },
    },
    {
      name: 'organization',
      type: 'text',
      required: true,
      admin: {
        description: 'Organization name',
      },
    },
    {
      name: 'servicesUsed',
      type: 'array',
      admin: {
        description: 'Which Connie services were used',
      },
      fields: [
        {
          name: 'service',
          type: 'text',
        },
      ],
    },
    {
      name: 'overallSatisfaction',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      admin: {
        description: 'Overall satisfaction rating (1-5)',
      },
    },
    {
      name: 'staffProfessionalism',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      admin: {
        description: 'Staff professionalism rating (1-5)',
      },
    },
    {
      name: 'communicationEase',
      type: 'text',
      required: true,
      admin: {
        description: 'How easy is communication (Very Easy, Easy, etc.)',
      },
    },
    {
      name: 'whatWorking',
      type: 'textarea',
      admin: {
        description: 'What do you appreciate most?',
      },
    },
    {
      name: 'whatImprove',
      type: 'textarea',
      admin: {
        description: 'What could we improve?',
      },
    },
    {
      name: 'wouldRecommend',
      type: 'text',
      admin: {
        description: 'Would recommend? (Definitely, Probably, etc.)',
      },
    },
    {
      name: 'additionalComments',
      type: 'textarea',
      admin: {
        description: 'Additional comments or feedback',
      },
    },
  ],
  timestamps: true, // Automatically adds createdAt and updatedAt
}
