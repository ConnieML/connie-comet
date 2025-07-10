import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    // Dataroom fields
    {
      name: 'isDataroomDocument',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Include this document in the dataroom',
      },
    },
    {
      name: 'documentSource',
      type: 'select',
      options: [
        { label: 'Upload File', value: 'upload' },
        { label: 'External Link', value: 'external' }
      ],
      defaultValue: 'upload',
      admin: {
        condition: (data) => data.isDataroomDocument,
        description: 'Choose how to provide this document',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        condition: (data) => data.isDataroomDocument && data.documentSource === 'external',
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
      admin: {
        condition: (data) => data.isDataroomDocument,
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
      admin: {
        condition: (data) => data.isDataroomDocument,
        description: 'Who can access this document',
      },
    },
    {
      name: 'documentDescription',
      type: 'textarea',
      admin: {
        condition: (data) => data.isDataroomDocument,
        description: 'Brief description of the document content',
      },
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
