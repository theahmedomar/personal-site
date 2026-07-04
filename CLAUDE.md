# CLAUDE.md

## Commands

```bash
pnpm dev            # http://localhost:4321
pnpm build          # static build to ./dist — also the type/content-schema check
pnpm preview        # serve ./dist locally
pnpm lint           # eslint
pnpm format         # prettier --write
pnpm format:check   # prettier --check
```

Husky runs lint-staged on `git commit` (eslint --fix + prettier --write on staged files) — a failing lint error blocks the commit.

## Architecture

- Astro 5, static output, no client-side framework — one small inline theme-toggle script in `Nav.astro`, otherwise static HTML (`astro add react` etc. if an interactive island is ever needed).
- Two pages: home (`index.astro`) and `work.astro`, a hand-authored portfolio page. No content collections currently.
- Everything routes through `src/layouts/Base.astro` (head/meta/OG, theme script, nav, footer). Site-wide constants (name, links) live in `src/lib/site.ts`; the nav array lives in `src/components/Nav.astro`.
- One global stylesheet (`src/styles/global.css`), no component library, no Tailwind. Forest accent `#2f7d4f`, system serif (Georgia/Times) for display type, system-ui for body. Motion must stay behind `prefers-reduced-motion`.
- Photos (`src/assets/*.jpg`) are imported and rendered through `astro:assets`' `<Image>`, not plain `<img src="/...">` — it strips EXIF and generates optimized `.webp` at build time. Requires `sharp` (already a dependency).
