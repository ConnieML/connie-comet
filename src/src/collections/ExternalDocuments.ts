import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const ExternalDocuments: CollectionConfig = {
  slug: 'external-documents',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'documentCategory', 'externalUrl'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name for this document',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'URL to external document (Box, Google Drive, etc.)',
      },
    },
    {
      name: 'documentCategory',
      type: 'select',
      options: [
        // BizOps categories
        { label: 'Strategic Planning', value: 'strategy' },
        { label: 'Operations Management', value: 'operations' },
        { label: 'Financial Management', value: 'finance' },
        { label: 'Legal & Compliance', value: 'legal' },
        // TechOps categories  
        { label: 'System Architecture', value: 'architecture' },
        { label: 'Security & Compliance', value: 'security' },
        { label: 'Infrastructure & DevOps', value: 'infrastructure' },
        { label: 'API Documentation', value: 'apis' },
        // Investor categories
        { label: 'Quarterly Business Review', value: 'quarterly' },
        { label: 'Financial Reports', value: 'financial' },
        { label: 'Legal Documents', value: 'legal' },
        { label: 'Business Operations', value: 'business' },
        { label: 'Technical Documentation', value: 'technical' },
      ],
      required: true,
      admin: {
        description: 'Category for organizing dataroom documents',
      },
    },
    {
      name: 'accessLevel',
      type: 'select',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Investors', value: 'investors' },
        { label: 'Board Members', value: 'board' },
        { label: 'Restricted', value: 'restricted' },
      ],
      defaultValue: 'public',
      required: true,
      admin: {
        description: 'Who can access this document',
      },
    },
    {
      name: 'documentDescription',
      type: 'textarea',
      admin: {
        description: 'Brief description of the document content',
      },
    },
  ],
  timestamps: true,
}