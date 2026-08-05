// Shared formatting for the Testing Partner Intake pipeline (S25).
// Turns the raw form payload into (a) label/value sections for the respondent
// confirmation email and (b) an HTML description for the PeoplePerson lead.

type FormData = Record<string, unknown>

type Section = { title: string; items: Array<{ label: string; value: string }> }

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const str = (v: unknown): string => (v === null || v === undefined ? '' : String(v).trim())
const arr = (v: unknown): string[] => (Array.isArray(v) ? v.map(String).filter(Boolean) : [])

const to12h = (hhmm: string): string => {
  const [hStr, m] = hhmm.split(':')
  let h = parseInt(hStr, 10)
  if (Number.isNaN(h)) return hhmm
  const suffix = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${h}:${m ?? '00'} ${suffix}`
}

export const formatHours = (formData: FormData): string => {
  const hours = formData.hoursByDay as
    | Record<string, { open: string; close: string; closed: boolean }>
    | undefined
  if (!hours) return ''
  return DAY_ORDER.filter((d) => hours[d])
    .map((d) => {
      const h = hours[d]
      return h.closed ? `${d}: Closed` : `${d}: ${to12h(h.open)} – ${to12h(h.close)}`
    })
    .join('\n')
}

const push = (items: Section['items'], label: string, value: string) => {
  if (value) items.push({ label, value })
}

export const buildEmailSections = (formData: FormData): Section[] => {
  const sections: Section[] = []

  const org: Section = { title: 'Organization Information', items: [] }
  push(org.items, 'Organization Name', str(formData.orgName))
  push(
    org.items,
    'Organization Type',
    str(formData.orgType) === 'Other' && str(formData.orgTypeOther)
      ? `Other — ${str(formData.orgTypeOther)}`
      : str(formData.orgType),
  )
  push(org.items, 'Primary Contact', str(formData.contactName))
  push(org.items, 'Title / Role', str(formData.contactTitle))
  push(org.items, 'Email', str(formData.email))
  push(org.items, 'Phone', str(formData.phone))
  push(org.items, 'Service Area', str(formData.serviceArea))
  push(org.items, 'Clients Served Monthly', str(formData.clientsServed))
  sections.push(org)

  const hours: Section = { title: 'Hours of Operation', items: [] }
  push(hours.items, 'Weekly Hours', formatHours(formData))
  push(hours.items, 'After-Hours Coverage', str(formData.afterHoursSupport))
  push(hours.items, 'How After-Hours Works', str(formData.afterHoursDescription))
  sections.push(hours)

  const staffing: Section = { title: 'Staffing', items: [] }
  const agents = str(formData.agentCount)
  const sups = str(formData.supervisorCount)
  const admins = str(formData.adminCount)
  const total = [agents, sups, admins]
    .map((n) => parseInt(n, 10) || 0)
    .reduce((a, b) => a + b, 0)
  push(staffing.items, 'Agents', agents)
  push(staffing.items, 'Supervisors / Managers', sups)
  push(staffing.items, 'Administrators', admins)
  if (total > 0) push(staffing.items, 'Total Seats', String(total))
  push(staffing.items, 'Team Structure Notes', str(formData.teamNotes))
  push(staffing.items, 'Contact Volume Patterns', str(formData.volumePatterns))
  sections.push(staffing)

  const channels: Section = { title: 'Communication Channels', items: [] }
  push(channels.items, 'Channels to Migrate', arr(formData.channelsToMigrate).join(', '))
  push(channels.items, 'Monthly Inbound Calls', str(formData.inboundCalls))
  push(channels.items, 'Monthly Outbound Calls', str(formData.outboundCalls))
  push(channels.items, 'Average Call Duration', str(formData.avgCallDuration))
  push(channels.items, 'Monthly SMS Volume', str(formData.smsVolume))
  push(channels.items, 'Monthly Webchat Conversations', str(formData.webchatVolume))
  push(channels.items, 'Monthly Form Submissions', str(formData.formSubmissions))
  push(channels.items, 'Monthly Emails Sent', str(formData.emailsSent))
  push(channels.items, 'Monthly Emails Received', str(formData.emailsReceived))
  push(channels.items, 'Monthly Inbound Faxes', str(formData.inboundFaxes))
  push(channels.items, 'Monthly Outbound Faxes', str(formData.outboundFaxes))
  push(channels.items, 'Avg Pages / Inbound Fax', str(formData.avgFaxPagesInbound))
  push(channels.items, 'Avg Pages / Outbound Fax', str(formData.avgFaxPagesOutbound))
  const socials = arr(formData.socialMediaPlatforms)
  if (socials.length) {
    const vols = (formData.socialVolumes as Record<string, string>) || {}
    push(
      channels.items,
      'Social Platforms',
      socials.map((p) => (str(vols[p]) ? `${p} (~${str(vols[p])}/mo)` : p)).join(', '),
    )
  }
  sections.push(channels)

  const tech: Section = { title: 'Current Technology', items: [] }
  push(tech.items, 'Technical Resources', arr(formData.techResourceTypes).join(', ') || str(formData.hasTechnicalResources))
  push(tech.items, 'Tech Resource Notes', str(formData.technicalResourcesDescription))
  push(tech.items, 'Staff Device Access', arr(formData.staffAccess).join(', '))
  push(tech.items, 'Phone System', str(formData.phoneSystem))
  push(tech.items, 'Phone System Details', str(formData.phoneSystemDetails))
  push(tech.items, 'Main Business Line(s)', str(formData.mainBusinessLines))
  push(tech.items, 'Phone Provider', str(formData.businessPhoneProvider))
  push(tech.items, 'Fax System', str(formData.faxSystem))
  push(tech.items, 'Fax System Details', str(formData.faxSystemDetails))
  push(tech.items, 'Email System', str(formData.emailSystem))
  push(tech.items, 'Email System Details', str(formData.emailSystemDetails))
  push(tech.items, 'Website', str(formData.websiteStatus))
  push(tech.items, 'Website URL', str(formData.websiteUrl))
  push(tech.items, 'Biggest Pain Points', str(formData.painPoints))
  sections.push(tech)

  const vision: Section = { title: 'Vision & Additional Information', items: [] }
  push(vision.items, 'Goals & Aspirations', str(formData.excitedAbout))
  push(vision.items, 'Additional Context', str(formData.additionalContext))
  push(
    vision.items,
    'How They Heard About Connie',
    str(formData.referralDetails)
      ? `${str(formData.howHeard)} — ${str(formData.referralDetails)}`
      : str(formData.howHeard),
  )
  sections.push(vision)

  return sections.filter((s) => s.items.length > 0)
}

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// S25/F18 — one-click sales handoff: a P&L-calculator link preloaded with the
// submitter's volumes. Voice = inbound + outbound calls; fax = both directions;
// email = received (inbound is the calculator's cost driver).
export const buildCalculatorLink = (formData: FormData, refNumber: string): string => {
  const n = (v: unknown): number => parseInt(str(v), 10) || 0
  // Single compact param, deliberately AMPERSAND-FREE: Perfex's REST PUT
  // re-parses the request body, so a multi-param URL inside the description
  // (`...&fax=160...`) becomes stray DB fields → mysqli "Unknown column 'fax'"
  // (observed live 2026-08-04). Format: p=<voice>~<fax>~<email>~<webforms>~<ref>
  const p = [
    n(formData.inboundCalls) + n(formData.outboundCalls),
    n(formData.inboundFaxes) + n(formData.outboundFaxes),
    n(formData.emailsReceived),
    n(formData.formSubmissions),
    refNumber,
  ].join('~')
  return `https://connie.one/dataroom/p-and-l-calculator?p=${p}`
}

// PP lead description: the FULL submission, formatted as simple HTML so staff
// working the lead in PeoplePerson see everything without leaving the CRM.
export const buildPPLeadDescription = (formData: FormData, refNumber: string): string => {
  const sections = buildEmailSections(formData)
  const parts: string[] = [
    `<p><strong>Testing Partner Intake — ${esc(refNumber)}</strong><br>Submitted via connie.one/intake</p>`,
    `<p>💰 <a href="${buildCalculatorLink(formData, refNumber)}">Open P&amp;L calculator — prefilled with this submission's volumes</a></p>`,
  ]
  for (const section of sections) {
    parts.push(`<p><strong>${esc(section.title)}</strong></p>`)
    parts.push(
      '<ul>' +
        section.items
          .map((i) => `<li><strong>${esc(i.label)}:</strong> ${esc(i.value).replace(/\n/g, '<br>')}</li>`)
          .join('') +
        '</ul>',
    )
  }
  return parts.join('\n')
}
