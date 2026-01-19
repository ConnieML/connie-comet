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
The dataroom document viewer uses a basic browser iframe to render PDFs.

**Proposed Enhancement:**
Implement a proper PDF viewer library with page navigation, zoom, search.

---

### BL-002: Enforce Dataroom Access Control

**Priority:** High
**Category:** Dataroom / Security
**Status:** Backlog

**Current State:**
Access control infrastructure exists but is not enforced.

**Proposed Enhancement:**
Enforce the existing access control system with route protection and document filtering.

---

### BL-003: Dynamic Brand Categories (Admin-Managed)

**Priority:** Medium
**Category:** Brand Portal / Admin UX
**Status:** Backlog

**Current State:**
Brand asset categories are hardcoded in schema and frontend.

**Proposed Enhancement:**
New BrandCategories collection so admins can add/edit categories without code deploys.

---

### BL-004: S3 URL Display Field for Brand Assets

**Priority:** Low
**Category:** Brand Portal / Admin UX
**Status:** Backlog

**Current State:**
S3 URL not visible in admin. Previous implementation removed during debugging.

**Proposed Enhancement:**
Add read-only UI field with copy button. Needs careful testing.

---

## Notes

- **IMPORTANT:** Avoid clicking around admin during deployments to prevent preference corruption
