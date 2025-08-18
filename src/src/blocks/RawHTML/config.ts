import type { Block } from 'payload'

export const RawHTML: Block = {
  slug: 'rawHTML',
  interfaceName: 'RawHTMLBlock',
  fields: [
    {
      name: 'html',
      type: 'code',
      label: 'HTML Code',
      admin: {
        language: 'html',
        description: 'Raw HTML will be rendered directly on the page. Use with caution.',
      },
      required: true,
    },
    {
      name: 'wrapperClass',
      type: 'text',
      label: 'Wrapper CSS Class (optional)',
      admin: {
        description: 'CSS class to wrap around your HTML (e.g., "container mx-auto")',
      },
    },
  ],
  labels: {
    singular: 'Raw HTML',
    plural: 'Raw HTML Blocks',
  },
}