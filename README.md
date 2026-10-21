# Kavyamoment — Indian Wedding Invitation Websites

Marketing site, template catalogue and `/admin` panel built with Next.js 15 (App Router), TypeScript, Tailwind CSS 4, GSAP and Lucide.

## Getting started

```bash
cp .env.example .env.local   # set ADMIN_PASSWORD and ADMIN_SECRET
npm install
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (sign in with `ADMIN_PASSWORD`)

## How it fits together

| Area | Where |
| --- | --- |
| Homepage sections | `src/components/home/*`, assembled in `src/app/(site)/page.tsx` |
| Template catalogue + filters | `src/components/templates/*` (`TemplateGrid`, `CategoryFilter`, `TemplateCard`, `ImageGallery`) |
| Template detail page | `src/app/(site)/templates/[slug]` (dynamic metadata + OG image) |
| Marketing copy (FAQs, testimonials, features…) | `src/lib/content.ts` |
| Editorial photos (single registry) | `src/lib/images.ts` |
| Template data store | `src/lib/store.ts` → `storage/templates.json` (seeded from `src/lib/seed.ts` on first run) |
| Admin UI + server actions | `src/app/admin/*`, `src/components/admin/*` |
| Uploaded media | `storage/uploads`, served at `/media/...` |
| Scroll animations | `src/components/Motion.tsx` — add `data-reveal`, `data-reveal="scale"` or `data-parallax` to any element |

Admin changes (add / edit / delete, uploads, featured, new, published, ordering) revalidate the public pages immediately.

### Template fields

`title, slug, description, category, style, price, compareAtPrice?, thumbnail, previewImages[], video?, featured, newRelease, published, sortOrder`

### Placeholder artwork

The seed templates use generated SVG invitation designs in `public/templates`. Regenerate them with `node scripts/generate-previews.mjs`, or replace them by uploading real previews from `/admin`.

## Deployment notes

- The store is file-based, so deploy to a host with a **persistent disk** (VPS, Render/Railway volume, etc.) and point `STORAGE_DIR` at it. Serverless hosts like Vercel have a read-only, ephemeral filesystem — swap `src/lib/store.ts` and the upload helper for a database + object storage there; nothing else needs to change.
- Set `NEXT_PUBLIC_SITE_URL` for correct canonical URLs, sitemap and Open Graph links.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` makes "Choose This Template" open WhatsApp; otherwise it falls back to email.
- Legal pages (`src/lib/pages.ts`) contain placeholder copy — have them reviewed before launch.
