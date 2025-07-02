import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'dataroomRole',
      type: 'select',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Investor', value: 'investor' },
        { label: 'Board Member', value: 'board' },
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'public',
      admin: {
        description: 'Determines dataroom access level',
      },
    },
    {
      name: 'company',
      type: 'text',
      admin: {
        description: 'Organization or company name',
      },
    },
  ],
  timestamps: true,
}
