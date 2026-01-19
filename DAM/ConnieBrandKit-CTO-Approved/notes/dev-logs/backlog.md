# Connie.one Development Backlog

**Last Updated:** January 19, 2026
**Maintained By:** Engineering Team

---

## Backlog Items

### BL-001: Enhanced PDF Viewer for Dataroom

**Priority:** Medium
**Category:** Dataroom / UX
**Status:** Backlog

**Current State:**
The dataroom document viewer (`/dataroom/view/[id]/page.tsx`) uses a basic browser iframe to render PDFs. This relies on the browser's native PDF plugin which varies by browser/device.

**Proposed Enhancement:**
Implement a proper PDF viewer library with advanced features:
- Page navigation (prev/next, jump to page)
- Zoom controls (fit width, fit page, custom zoom)
- Search within document
- Thumbnail sidebar for page preview
- Download button
- Optional: Watermarking for restricted documents
- Optional: Disable copy/print for sensitive docs

**Candidate Libraries:**
- `react-pdf` (uses pdf.js under the hood)
- `@react-pdf-viewer/core` (feature-rich, modular)
- `pdfjs-dist` (direct pdf.js integration)

**Files to Modify:**
- `src/app/(frontend)/dataroom/view/[id]/page.tsx`
- `package.json` (add PDF viewer dependency)

**Acceptance Criteria:**
- [ ] PDFs render consistently across browsers
- [ ] Page navigation works
- [ ] Zoom controls functional
- [ ] Mobile-responsive viewer
- [ ] Loading state while PDF loads

---

### BL-002: Enforce Dataroom Access Control

**Priority:** High
**Category:** Dataroom / Security
**Status:** Backlog

**Current State:**
Access control infrastructure exists but is not enforced:
- `src/lib/dataroom-access.ts` defines role hierarchy (public < investor < board < admin)
- `src/collections/Users/index.ts` has `dataroomRole` field
- `src/collections/Media.ts` has `accessLevel` field on documents
- Okta callback sets `dataroomRole: 'admin'` for authenticated users

However, the dataroom UI currently shows all documents to all visitors regardless of access level.

**Proposed Enhancement:**
Enforce the existing access control system:

1. **Route Protection:**
   - Add auth check middleware to `/dataroom/*` routes
   - Redirect unauthenticated users to login for non-public docs
   - Show "Access Denied" for users without sufficient role

2. **Document Filtering:**
   - Filter API queries by user's access level
   - Only return documents user is authorized to view
   - Hide restricted categories from navigation

3. **UI Indicators:**
   - Show lock icons on restricted documents
   - Display user's current access level
   - "Request Access" flow for higher-tier docs

**Files to Modify:**
- `src/app/(frontend)/dataroom/page.tsx` - Add access filtering
- `src/app/(frontend)/dataroom/[category]/page.tsx` - Filter by access level
- `src/app/(frontend)/dataroom/view/[id]/page.tsx` - Verify access before render
- `src/lib/dataroom-access.ts` - May need middleware wrapper
- Possibly add auth context/provider for dataroom section

**Dependencies:**
- Okta authentication must be working
- User must be logged in to access restricted content

**Acceptance Criteria:**
- [ ] Public docs visible to all
- [ ] Investor docs require investor+ role
- [ ] Board docs require board+ role
- [ ] Admin docs require admin role
- [ ] Unauthenticated users see only public content
- [ ] Access denied page for unauthorized access attempts

---

## Completed Items

_Move items here when completed with completion date_

---

## Notes

- Backlog items are not yet scheduled for implementation
- Priority levels: Critical, High, Medium, Low
- Items may be promoted to sprint dev-logs when work begins
