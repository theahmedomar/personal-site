# Personal site

Source for [theahmedomar.com](https://theahmedomar.com) — my portfolio.

Built with [Astro 5](https://astro.build): static HTML, no client-side framework (just a small inline theme-toggle script). One global stylesheet, no CSS framework.

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # static build to ./dist (also runs the type check)
pnpm preview  # serve the built ./dist locally
pnpm lint     # eslint
pnpm format   # prettier --write
```

Husky runs lint-staged on `git commit` (eslint --fix + prettier --write on staged files).

## Structure

- `src/pages/` — routes: `index.astro` (home) and `work.astro`, the hand-authored portfolio page, plus `404.astro` and `robots.txt.js`.
- `src/layouts/Base.astro` — the single layout: head/meta, OG/Twitter tags, canonical URLs, JSON-LD `Person`, theme script, nav, footer.
- `src/components/` — `Nav.astro` (nav links + theme toggle) and `IconLink.astro`.
- `src/lib/site.ts` — site-wide constants (name, links). The nav array lives in `Nav.astro`.
- `src/assets/` — images, imported through `astro:assets` `<Image>` (EXIF-stripped, served as optimized `.webp`).

## Deploy — Cloudflare Pages

- Framework preset: **Astro**
- Build command: `pnpm build`
- Build output directory: `dist`
- Node version: 24 (see `.nvmrc`)
