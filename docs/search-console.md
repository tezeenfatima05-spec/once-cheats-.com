# Search Console workflow (oncecheats.com)

**Last verified:** November 2026

## Domain property

1. Open [Google Search Console](https://search.google.com/search-console) and add the **domain** property for `oncecheats.com` if it is not already there.
2. Under **Sitemaps**, submit: `https://oncecheats.com/sitemap.xml`
3. Use **URL Inspection** on key routes after deploy: `/`, `/products/once-human/pc-software/`, `/blogs/`, `/faq/`.

## Indexing expectations

- Production (`oncecheats.com`): indexable — no `noindex` on public pages.
- Preview hosts (Railway, workers.dev, etc.): served with `noindex` via `scripts/serve.mjs`.
- Do not submit preview URLs or `/go/` affiliate redirect paths.

## Example query → landing page map (candidate keywords, volume unverified)

| Query theme | Primary URL |
| --- | --- |
| once human cheats (broad) | `/` |
| once human esp / aimbot | `/blogs/once-human-esp-guide/`, `/products/once-human/pc-software/` |
| buying / comparison | `/blogs/best-once-human-cheats/`, `/blogs/once-human-cheats-comparison/` |
| hwid spoofer, ugc, cloud dma | `/products/once-human/utilities/`, related blog posts |
| safety / fair play | `/blogs/once-human-cheats-safety/` |

## After major content updates

1. Run `npm run build` and confirm `dist/sitemap.xml` lists new canonical URLs only on `oncecheats.com`.
2. Request indexing for changed URLs if needed (avoid mass spam requests).