import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Hero Title',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Hero Subtitle',
    },
    {
      name: 'showEmailSignup',
      type: 'checkbox',
      label: 'Show Email Signup Form',
      defaultValue: true,
    },
    {
      name: 'emailPlaceholder',
      type: 'text',
      label: 'Email Input Placeholder',
      defaultValue: 'your-email@company.com',
      admin: {
        condition: (_, siblingData) => siblingData?.showEmailSignup,
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'Join Waitlist',
      admin: {
        condition: (_, siblingData) => siblingData?.showEmailSignup,
      },
    },
    {
      name: 'backgroundEffect',
      type: 'select',
      label: 'Background Effect',
      defaultValue: 'dotMatrix',
      options: [
        { label: 'Dot Matrix Animation', value: 'dotMatrix' },
        { label: 'Gradient Only', value: 'gradient' },
        { label: 'None', value: 'none' },
      ],
    },
  ],
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
}