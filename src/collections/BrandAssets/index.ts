import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const BrandAssets: CollectionConfig<'brand-assets'> = {
  slug: 'brand-assets',
  labels: {
    singular: 'Brand Asset',
    plural: 'Brand Assets',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true, // Public read for brand assets (no drafts/versions)
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    category: true,
  },
  admin: {
    defaultColumns: ['name', 'category', 'assetType', 'usageRights', 'updatedAt'],
    useAsTitle: 'name',
    group: 'Brand',
    description: 'Centralized brand assets for internal teams and external partners',
    listSearchableFields: ['name', 'description'],
  },
  upload: {
    mimeTypes: [
      // Images
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/svg+xml',
      'image/webp',
      // Documents
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      // Fonts
      'font/ttf',
      'font/otf',
      'font/woff',
      'font/woff2',
      'application/x-font-ttf',
      'application/x-font-otf',
      // Video
      'video/mp4',
      'video/webm',
      'video/quicktime',
      // Audio
      'audio/mpeg',
      'audio/wav',
      // Archives
      'application/zip',
      'application/x-zip-compressed',
    ],
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        fit: 'inside',
      },
      {
        name: 'preview',
        width: 800,
        height: 800,
        fit: 'inside',
      },
    ],
  },
  fields: [
    // ============================================
    // MAIN INFO
    // ============================================
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Descriptive name for this asset',
        placeholder: 'e.g., Connie Logo - Primary - White',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of the asset and its intended use',
        placeholder: 'e.g., Primary logo for dark backgrounds. Use for headers and hero sections.',
      },
    },

    // ============================================
    // CATEGORIZATION
    // ============================================
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
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
          admin: { width: '50%' },
        },
        {
          name: 'assetType',
          type: 'select',
          required: true,
          options: [
            { label: 'Primary / Hero', value: 'primary' },
            { label: 'Secondary / Supporting', value: 'secondary' },
            { label: 'Variant / Alternate', value: 'variant' },
            { label: 'Template / Editable', value: 'template' },
            { label: 'Archive / Reference', value: 'archive' },
          ],
          defaultValue: 'primary',
          admin: { width: '50%' },
        },
      ],
    },

    // ============================================
    // SUBCATEGORY & ORGANIZATION
    // ============================================
    {
      type: 'row',
      fields: [
        {
          name: 'subcategory',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Group within category (e.g., "Contributors", "Stock Photos", "Backgrounds")',
            placeholder: 'e.g., Contributors, Stock, Backgrounds',
          },
        },
        {
          name: 'isCategoryHero',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '50%',
            description: 'Use this image as the category hero on the brand landing page',
          },
        },
      ],
    },

    // ============================================
    // TAGS (as text field for simplicity)
    // ============================================
    {
      name: 'tags',
      type: 'text',
      admin: {
        description: 'Comma-separated tags (e.g., "dark-mode, square, animated")',
        placeholder: 'dark-mode, square, primary',
      },
    },

    // ============================================
    // ACCESS & USAGE (Sidebar)
    // ============================================
    {
      name: 'usageRights',
      type: 'select',
      required: true,
      defaultValue: 'internal',
      options: [
        { label: 'Public - Anyone can use', value: 'public' },
        { label: 'Partners - External partners & contractors', value: 'partners' },
        { label: 'Internal - Team members only', value: 'internal' },
        { label: 'Restricted - Requires approval', value: 'restricted' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Who can access and use this asset',
      },
    },
    {
      name: 'usageNotes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Specific usage instructions or restrictions',
        placeholder: 'e.g., Do not stretch. Maintain clear space of 20px.',
      },
    },

    // ============================================
    // METADATA (Sidebar)
    // ============================================
    {
      name: 'version',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Version number (e.g., v2.1)',
        placeholder: 'v1.0',
      },
    },
    {
      name: 'sourceFile',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Link to editable source (Figma, Google Drive, etc.)',
        placeholder: 'https://figma.com/file/...',
      },
    },
    {
      name: 'relatedAssets',
      type: 'relationship',
      relationTo: 'brand-assets',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Link to related assets (variants, packages)',
      },
    },

    // ============================================
    // PUBLISHING (Sidebar)
    // ============================================
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        req.payload.logger.info(`Brand asset updated: ${doc.name}`)
        return doc
      },
    ],
  },
  // Versioning disabled - was causing 500 errors with locale handling
  // versions: {
  //   drafts: {
  //     autosave: false,
  //     schedulePublish: true,
  //   },
  //   maxPerDoc: 10,
  // },
}
