# Phase 33 — Implementation report (oncecheats.com)

**Date:** 2026-11-14  
**Branch:** `checkpoint/pre-master-prompt`  
**Build:** `npm run build` — **PASS** (50 pages, sitemap 49 URLs)

---

## A. Template usage

| Category | Detail |
| --- | --- |
| **Kept** | Starwind UI, dark theme, header/footer, product gallery layout, forum CSS, blog cards, `nixpacks.toml` + `scripts/serve.mjs` |
| **Extended** | `checkout-redirects.mjs`, Once Human data (`products.ts`, `posts.ts`, `forum.ts`), preview noindex in `serve.mjs` |
| **Added** | 16 blog articles total, `check-seo.mjs`, expanded `check-leftovers.mjs`, `generate-seo-baseline.mjs`, reviews filter shell, keyword-map updates |

---

## B. Repository cleanup

| Found | Action |
| --- | --- |
| `public/site.webmanifest` (old brand name) | Replaced with Once Human Cheats |
| `docs/search-console.md` (old domain copy) | Rewritten for oncecheats.com |
| `.seo-baseline/fields.txt` (stale snapshot) | Regenerated from `dist/` via `npm run build` |
| Root `index.html` (legacy Font Awesome) | Deleted |
| `src/data/productPricing.ts` | Deleted (unused subscription UI) |
| Blog sidebar “Elite cheats” | → PC software link |

**Legitimate exceptions:** legacy product URL 301 → Once Human catalog in `astro.config.mjs`, `src/utils/path.ts`, `scripts/redirects.mjs`.

**Validator:** `check-leftovers` — **PASS**

---

## C. Website functionality

- **Products:** pc-software, hwid-spoofer, ugc, cloud-dma — feature cards + Proceed to Checkout (no on-site pricing).
- **Blogs:** 16 posts, search `?q=`, filter/sort on index.
- **Forum:** 20 illustrative threads, read-only UI.
- **Reviews:** Filter/sort UI with empty state (no fabricated reviews).
- **Affiliate:** Four TAZEEN URLs centralized in `src/config/checkout-redirects.mjs`.

---

## D. SEO

- Canonical origin: `https://oncecheats.com`
- Unique meta on blog posts (`metaTitle` / `metaDescription`); product pages use `pageSeo.ts`
- One H1 per indexable page: `SectionHeader` defaults to `h2`; page-level `heading="h1"` where needed (e.g. FAQ)
- `WebSite` schema includes `SearchAction` for `/blogs/?q=`
- Product `Offer` schema without invented price fields
- **Sitemap:** 49 URLs on oncecheats.com (excludes `/go/`, legacy noindex redirects where filtered)
- **robots.txt:** `Sitemap: https://oncecheats.com/sitemap.xml`, `Disallow: /go/`

**Validator:** `check-seo` — **PASS** (54 HTML files)

---

## E. Hosting / deployment

- **Host pattern:** Railway-style static via `nixpacks.toml` → `npm run build` → `npm run start` (`scripts/serve.mjs`)
- **Preview noindex:** `X-Robots-Tag` + HTML meta on non-canonical hosts in `serve.mjs`
- **Live production:** **UNVERIFIED** (DNS to `oncecheats.com` did not resolve from build environment)

---

## F. QA checklist

| ID | Result | Evidence |
| --- | --- | --- |
| QA1 Build | **PASS** | `npm run build` exit 0 |
| QA2 Responsive | **UNVERIFIED** | No automated viewport matrix in CI |
| QA3 Sitemap/robots | **PASS** | `dist/sitemap.xml` (49 URLs), `public/robots.txt` |
| QA4 Metadata | **PASS** | `check-seo.mjs` |
| QA5 Affiliate | **PASS** | `check-leftovers` merchant URL allowlist; CTAs use `/go/*/` |
| QA6 Images | **PASS** | `optimize-images.mjs` in build; manifest rebranded |
| QA7 Content | **PASS** | `check-leftovers`; 16 Once Human blogs |
| QA8 Template UI | **PASS** | Starwind components unchanged visually; sections demoted to h2 |

---

## G. Tests run

```text
npm run build          → PASS (includes leftovers + SEO)
node scripts/check-leftovers.mjs → PASS
node scripts/check-seo.mjs       → PASS (via build)
```

---

## H. Remaining blockers

1. **DNS / deploy:** Point `oncecheats.com` to Railway (or current host) and redeploy this branch.
2. **Live verification:** Re-run curl checks for canonical, robots, and preview noindex headers post-deploy.
3. **Genuine reviews:** Reviews page awaits real data before AggregateRating.
4. **Search Console:** Submit sitemap per `docs/search-console.md`.