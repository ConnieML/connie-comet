import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const UATSubmissions: CollectionConfig = {
  slug: 'uat-submissions',
  access: {
    // Created only by the /api/intake route (server-side), never directly by visitors
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'orgName',
    defaultColumns: ['refNumber', 'orgName', 'contactName', 'email', 'ppSyncStatus', 'createdAt'],
    description:
      'Testing Partner Intake Form submissions (V2, connie.one/intake) — system of record. PP lead is the staff-facing surface.',
  },
  fields: [
    {
      name: 'refNumber',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Submission reference, e.g. UAT-20260804-K3X' },
    },
    { name: 'orgName', type: 'text', required: true },
    { name: 'contactName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'ppLeadId',
      type: 'text',
      admin: { description: 'PeoplePerson lead record id (connie tenant), set on successful sync' },
    },
    {
      name: 'ppSyncStatus',
      type: 'select',
      options: ['synced', 'failed', 'skipped'],
      defaultValue: 'skipped',
      admin: { description: 'PP lead-create outcome. failed → use /api/intake/pp-retry' },
    },
    {
      name: 'ppSyncError',
      type: 'text',
      admin: { description: 'Last PP sync error, if any' },
    },
    {
      name: 'ppDedupeNote',
      type: 'text',
      admin: {
        description: 'F17 dedupe outcome — e.g. "follow-up appended to existing lead #358 (matched by email)"',
      },
    },
    {
      name: 'confirmationSent',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Respondent confirmation email delivered' },
    },
    {
      name: 'internalNotified',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Internal notification (incl. CareTeam task address) delivered' },
    },
    {
      name: 'data',
      type: 'json',
      required: true,
      admin: { description: 'Complete structured submission payload (all form fields)' },
    },
  ],
}
