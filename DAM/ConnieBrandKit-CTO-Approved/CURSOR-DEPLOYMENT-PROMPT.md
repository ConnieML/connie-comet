# CONNIE BRAND ASSETS DAM - CTO-APPROVED DEPLOYMENT

**Status:** Reviewed and approved by CTO
**Risk Level:** Low (follows existing patterns exactly)
**Estimated Implementation:** 15-20 minutes

---

## MISSION BRIEF

Deploy a Brand Assets Digital Asset Management (DAM) system for connie.one. This kit has been reviewed against the existing codebase and all issues have been pre-fixed.

**What you're building:**
1. `BrandAssets` collection - for uploading/managing brand files
2. `BrandPortal` block - reusable component for displaying assets
3. `/brand` page - standalone brand assets page

**Success criteria:**
- [ ] `/admin/collections/brand-assets` loads
- [ ] Can upload an image and publish it
- [ ] `/brand` page displays published assets
- [ ] Download button works
- [ ] Copy URL button works

---

## STEP 1: Create the BrandAssets Collection

**Create file:** `src/collections/BrandAssets/index.ts`

Copy the entire contents from the provided `src/collections/BrandAssets/index.ts` file in this kit.

**IMPORTANT:** This collection uses Payload's built-in versioning system (not a custom `_status` field). This ensures proper integration with existing access control.

---

## STEP 2: Register Collection in payload.config.ts

**File:** `src/payload.config.ts`

### 2a. Add import at top (near other collection imports):

```typescript
import { BrandAssets } from './collections/BrandAssets'
```

### 2b. Add to collections array:

Find this line:
```typescript
collections: [Pages, Posts, Media, Categories, Users, ExternalDocuments],
```

Change to:
```typescript
collections: [Pages, Posts, Media, Categories, Users, ExternalDocuments, BrandAssets],
```

### 2c. Update S3 storage config:

Find the `s3Storage` plugin configuration. It currently looks like:

```typescript
s3Storage({
  collections: {
    media: {
      generateFileURL: ({ filename }) => {
        return `https://${process.env.S3_BUCKET_UPLOADS || 'admin-connie-one-uploads'}.s3.${process.env.S3_REGION || 'us-east-1'}.amazonaws.com/${filename}`
      },
    },
  },
  bucket: process.env.S3_BUCKET_UPLOADS || 'admin-connie-one-uploads',
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: process.env.S3_REGION || 'us-east-1',
  },
}),
```

Change to (add brand-assets collection):

```typescript
s3Storage({
  collections: {
    media: {
      generateFileURL: ({ filename }) => {
        return `https://${process.env.S3_BUCKET_UPLOADS || 'admin-connie-one-uploads'}.s3.${process.env.S3_REGION || 'us-east-1'}.amazonaws.com/${filename}`
      },
    },
    'brand-assets': {
      generateFileURL: ({ filename }) => {
        return `https://${process.env.S3_BUCKET_UPLOADS || 'admin-connie-one-uploads'}.s3.${process.env.S3_REGION || 'us-east-1'}.amazonaws.com/brand/${filename}`
      },
      prefix: 'brand/',
    },
  },
  bucket: process.env.S3_BUCKET_UPLOADS || 'admin-connie-one-uploads',
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: process.env.S3_REGION || 'us-east-1',
  },
}),
```

---

## STEP 3: Create the BrandPortal Block

**Create file:** `src/blocks/BrandPortal/config.ts`

Copy from the provided `src/blocks/BrandPortal/config.ts` file.

**Create file:** `src/blocks/BrandPortal/Component.tsx`

Copy from the provided `src/blocks/BrandPortal/Component.tsx` file.

---

## STEP 4: Register the Block

### 4a. Update RenderBlocks.tsx

**File:** `src/blocks/RenderBlocks.tsx`

Add import near other block imports:

```typescript
import { BrandPortalBlock } from '@/blocks/BrandPortal/Component'
```

Add to `blockComponents` object:

```typescript
const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  rawHTML: RawHTMLBlock,
  waitlistLanding: WaitlistLanding,
  waitlistStatic: WaitlistStatic,
  hero: HeroBlock,
  brandPortal: BrandPortalBlock,  // ADD THIS LINE
}
```

Add brandPortal to the full-width block check (around line 47):

```typescript
if (blockType === 'hero' || blockType === 'rawHTML' || blockType === 'waitlistLanding' || blockType === 'waitlistStatic' || blockType === 'brandPortal') {
```

### 4b. Update Pages Collection (Optional - for CMS page builder)

**File:** `src/collections/Pages/index.ts`

Add import:

```typescript
import { BrandPortal } from '../../blocks/BrandPortal/config'
```

Add to blocks array (find the `blocks:` array in the layout field):

```typescript
blocks: [Hero, CallToAction, Content, MediaBlock, Archive, FormBlock, RawHTML, WaitlistLanding, WaitlistStatic, BrandPortal],
```

---

## STEP 5: Create Standalone Brand Page

**Create file:** `src/app/(frontend)/brand/page.tsx`

Copy from the provided `src/app/(frontend)/brand/page.tsx` file.

---

## STEP 6: Generate Types and Test

Run these commands in order:

```bash
# Generate TypeScript types for new collection
pnpm payload generate:types

# Generate import map
pnpm payload generate:importmap

# Start dev server
pnpm dev
```

---

## VERIFICATION CHECKLIST

After `pnpm dev` is running:

1. [ ] Visit `http://localhost:3000/admin` - login works
2. [ ] Navigate to "Brand Assets" in sidebar (under "Brand" group)
3. [ ] Create a new Brand Asset:
   - Upload any image (PNG, JPG, SVG)
   - Fill in name: "Test Logo"
   - Select category: "Logos & Marks"
   - Select usage rights: "Public"
   - Click "Save Draft" then "Publish"
4. [ ] Visit `http://localhost:3000/brand`
5. [ ] Verify the test asset appears
6. [ ] Click "Download" - file downloads
7. [ ] Click "URL" - URL copied to clipboard
8. [ ] Open browser console - no errors

---

## TROUBLESHOOTING

### "Collection not found" error
- Verify import statement in `payload.config.ts`
- Verify collection is added to `collections` array
- Restart dev server

### S3 upload fails
- Check S3 credentials in `.env.local`
- Verify bucket name and region
- Check AWS console for bucket permissions

### Block not rendering
- Verify import in `RenderBlocks.tsx`
- Verify key in `blockComponents` matches slug: `brandPortal`
- Check browser console for errors

### Types error
- Run `pnpm payload generate:types` again
- Restart TypeScript server in your editor

---

## FILES IN THIS KIT

```
src/
  collections/
    BrandAssets/
      index.ts          <- Main collection file
  blocks/
    BrandPortal/
      config.ts         <- Block config
      Component.tsx     <- React component
  app/
    (frontend)/
      brand/
        page.tsx        <- Standalone page
```

---

## DO NOT

- Do NOT modify existing collections
- Do NOT change the s3Storage bucket name
- Do NOT add new npm dependencies
- Do NOT modify existing block components
- Do NOT push to main without local verification

---

## WHEN COMPLETE

Report back with:
1. Screenshot of `/admin/collections/brand-assets`
2. Screenshot of `/brand` page with test asset
3. Confirmation that `pnpm build` passes

CTO will review before Amplify deployment.
