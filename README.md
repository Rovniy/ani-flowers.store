# Ani Flowers

Business-card site for Ani Flowers, a flower shop in Đà Nẵng — https://ani-flowers.store

Nuxt 4 + TypeScript + Tailwind CSS 4, generated to static files and hosted on Firebase Hosting.

## Commands

```bash
npm install             # .npmrc sets legacy-peer-deps: npm 10.9 crashes on Nuxt's optional peers without it
npm run dev             # dev server
npm run generate        # static build → .output/public
npm run typecheck
npm run deploy          # generate + deploy to the live channel
npm run deploy:preview  # generate + 7-day preview channel
```

## Content

Everything on the page lives in `config.ts`: phones, address, Instagram, gallery photos and
all calls to action in EN / RU / VI. The CTAs switch language together every
`rotateEveryMs` (3 s); the EN / RU / VI buttons under the hero jump to a language.

To add a photo: put the file in `public/img/gallery/` and append it to `gallery`
with its real `width`/`height`, an `alt` describing the bouquet, and a short `caption`.

`scripts/build-assets.py` rebuilds the logo, favicons, gallery copies and `og.jpg`
from `refs/` (needs Python with Pillow).

## Hosting

Firebase project `divarogue-e7d19`, hosting target `ani-flowers` → site `ani-flowers-store`.
One-time setup before the first deploy:

```bash
firebase hosting:sites:create ani-flowers-store
firebase target:apply hosting ani-flowers ani-flowers-store
```

Then connect `ani-flowers.store` in the Firebase console (Hosting → Add custom domain).
CI (`.github/workflows/`) deploys `main` live and PRs to a preview channel; both need the
`FIREBASE_SERVICE_ACCOUNT_DIVAROGUE_E7D19` secret.

There is no catch-all rewrite on purpose: unknown paths return a real 404.
