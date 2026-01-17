import type { Block } from 'payload'

export const BrandPortal: Block = {
  slug: 'brandPortal',
  labels: {
    singular: 'Brand Portal',
    plural: 'Brand Portals',
  },
  interfaceName: 'BrandPortalBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Brand Assets',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Download logos, templates, and brand materials for your projects.',
    },
    {
      name: 'showCategories',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Logos & Marks', value: 'logos' },
        { label: 'Colors & Palettes', value: 'colors' },
        { label: 'Typography & Fonts', value: 'fonts' },
        { label: 'Templates & Documents', value: 'templates' },
        { label: 'Photography & Images', value: 'photos' },
        { label: 'Video & Motion', value: 'video' },
        { label: 'Audio & Sound', value: 'audio' },
        { label: 'Presentations & Decks', value: 'presentations' },
        { label: 'Developer & Technical', value: 'developer' },
        { label: 'Social Media', value: 'social' },
        { label: 'Asset Packages', value: 'packages' },
        { label: 'Guidelines & Docs', value: 'guidelines' },
      ],
      admin: {
        description: 'Leave empty to show all categories',
      },
    },
    {
      name: 'usageFilter',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Partners', value: 'partners' },
        { label: 'Internal', value: 'internal' },
      ],
      defaultValue: ['public'],
      admin: {
        description: 'Which usage rights levels to display',
      },
    },
  ],
}
