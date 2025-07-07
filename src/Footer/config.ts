import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'footerColumns',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Column Title (e.g., "Connie Platform")',
          },
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 8,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
      maxRows: 4,
      admin: {
        initCollapsed: true,
        description: 'Footer columns with links (e.g., "Connie Platform", "Resources", "Quick Links")',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
