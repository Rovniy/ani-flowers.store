# CLAUDE.md

Single-page Nuxt 4 static site for the Ani Flowers flower shop in Đà Nẵng (https://ani-flowers.store), run by Ni Ni. Firebase Hosting. See README.md for commands and hosting setup.

Verify changes with `npm run typecheck` and `npm run generate`, then check `.output/public/index.html`. There are no tests.

## Architecture

- **`config.ts` is the single source of truth for content**: meta, phones, address, Instagram, gallery, and every call to action as a `{ en, ru, vi }` phrase. Don't hardcode copy, phone numbers or URLs in components. `pages/index.vue`, `composables/useStructuredData.ts` (schema.org `Florist`) and `server/routes/{sitemap.xml,llms.txt}.ts` all derive from it.
- **Language rotation**: `composables/useLangCycle.ts` holds one shared index (`useState`) and one interval, started by `plugins/lang-cycle.client.ts` after mount. `<RotatingText :phrase>` renders all three variants stacked in one grid cell (`.rotator` in `main.css`) so the box never resizes; inactive ones get `aria-hidden`. Only calls to action rotate; the rest of the copy is English.
- Instagram `href` is kept free of share-sheet tracking params because it also feeds schema.org `sameAs`.
- Opening hours and price range are deliberately absent from schema.org until the owner confirms them.

## Styling

Tailwind 4 via `@tailwindcss/vite`; tokens are in `@theme` in `app/assets/css/main.css` (cream / olive / peach, from the logo). Fonts: Cormorant Garamond + Nunito via `@nuxt/fonts`, with Cyrillic and Vietnamese subsets — any new font must have both.

Images: `<NuxtImg format="webp">` with fixed px `sizes`. In @nuxt/image 2 the global `format` option doesn't reach `<NuxtImg>`. The lightbox and `error.vue` use plain `<img>` of originals, because `_ipx` variants only exist for sizes the prerender saw.

Arches use top radii of about half the element width, not `rounded-t-full`: a 9999px radius makes the browser scale every corner down and the bottom corners go square.
