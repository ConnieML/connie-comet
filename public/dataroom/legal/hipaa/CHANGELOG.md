# Connie HIPAA Compliance Statement — Changelog

All notable changes to the Connie HIPAA Compliance Statement and associated public-facing HIPAA documents.

The canonical copy of each version is the PDF in this directory. Markdown sources are versioned in `~/projects/connie/vault/connie-vault/operations/sprints/2026-05-08-hipaa-compliance-sprint/`.

## v1.1 — Effective 2025-10-14 (Functional Prototype)

**Status:** Functional Prototype — NSS Internal & Stakeholders Only

**Predecessor:** v1.0 (effective 2026-05-08, internal review only) — superseded by v1.1 prior to broader stakeholder distribution.

**Material changes vs. v1.0:**

- **Reframed as Functional Prototype** with NSS Internal & Stakeholders Only classification banner; intent is to mark the document as in active development through the HIPAA-1 sprint rather than as a final shipped artifact
- **Effective date set to 2025-10-14** to reflect when Connie's underlying HIPAA posture began operating, not just when the document was authored
- **Connie logo added to header**; classification chip top-right
- **Footer updated** to "Connie by Nevada Senior Services" framing
- **Visual palette shifted** from navy blue to muted rose-red, on-brand with Connie's pink/coral identity
- **Shared Responsibility section** expanded with stakeholder pointers to the Connie data room, Terms of Use, and Acceptable Use Policy
- **Subprocessors & BAA Chain table updated:**
  - Added **TicketTack** (ticketing / case-tracking integration) — BAA audit / precondition required
  - **AWS S3 / CloudFront** status changed to "BAA audit / precondition required" (was: "no PHI stored — covered by AWS BAA where used")
  - **PeoplePerson** status changed to "BAA audit / precondition required" (was: "internal processing arrangement under formal documentation")
- **Email channel** disclosure amended in "Not Currently HIPAA-Eligible" section to specify pending Mailgun BAA audit and configuration review, with eligibility under reassessment (was: a flat statement of ineligibility)
- **Connie Care Team contact** added to Questions section: +1 (877) 606-4520 / contact@connie.one

**Why this matters:** The v1.1 framing is more accurate to where Connie actually is — a functional prototype with strong architectural foundations and active compliance work in progress, distributed to NSS and stakeholders rather than the broader external SaaS market.

## v1.0 — 2026-05-08

**Status:** Superseded by v1.1 (internal review only — never broadly distributed)

Initial structured Compliance Statement authored during HIPAA-1 sprint kickoff. Drew from prior internal draft (2026-05-07) and the Twilio support tailoring questionnaire reply. Introduced the Subprocessors & BAA Chain section, Internal Audit & Monitoring section, Breach Notification section, and "Where Connie Operates Today" framing reflecting NSS as parent organization.
