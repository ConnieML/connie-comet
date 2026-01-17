# Connie Brand Assets DAM - CTO Approved Kit

**Version:** 1.0.0
**Reviewed:** 2026-01-16
**Status:** Ready for deployment

## What's Inside

This kit contains everything needed to add a Brand Assets DAM to connie.one:

| File | Purpose |
|------|---------|
| `CURSOR-DEPLOYMENT-PROMPT.md` | Step-by-step instructions for Cursor |
| `src/collections/BrandAssets/index.ts` | Payload collection for brand assets |
| `src/blocks/BrandPortal/config.ts` | CMS block configuration |
| `src/blocks/BrandPortal/Component.tsx` | React component for asset display |
| `src/app/(frontend)/brand/page.tsx` | Standalone /brand page |

## CTO Review Notes

**Issues Fixed from Original Kit:**

1. **Versioning System** - Replaced custom `_status` field with Payload's built-in versioning. This ensures `authenticatedOrPublished` access control works correctly.

2. **Tags Field** - Simplified from array to comma-separated text field. Easier for users, simpler querying.

3. **No Emojis** - Removed emojis from category labels (per codebase standards).

4. **Component Consistency** - Updated component to match existing codebase patterns.

## Deployment Flow

1. Hand `CURSOR-DEPLOYMENT-PROMPT.md` to Cursor
2. Cursor implements following the checklist
3. Cursor reports back with screenshots
4. CTO reviews
5. If approved, push to main for Amplify deployment

## API Endpoints (Auto-generated)

Once deployed:

```
GET  /api/brand-assets                               # All assets
GET  /api/brand-assets?where[_status][equals]=published  # Published only
GET  /api/brand-assets?where[category][equals]=logos    # Filter by category
GET  /api/brand-assets/:id                           # Single asset
```

## S3 Storage

Brand assets upload to: `s3://admin-connie-one-uploads/brand/`

This keeps them organized separately from general media uploads.
