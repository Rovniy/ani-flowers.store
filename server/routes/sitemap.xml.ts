import { meta, gallery } from '~~/config'

// Prerendered to a static file (see nitro.prerender.routes). Generated rather
// than hand-written so lastmod tracks the build instead of rotting.
export default defineEventHandler((event) => {
    const lastmod = (useRuntimeConfig().public.buildTime as string).slice(0, 10)

    setHeader(event, 'content-type', 'application/xml; charset=utf-8')

    const images = [meta.logo, ...gallery.map(p => p.src)]
        .map(src => `    <image:image><image:loc>${meta.domain}${src}</image:loc></image:image>`)
        .join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${meta.canonical}</loc>
    <lastmod>${lastmod}</lastmod>
${images}
  </url>
</urlset>
`
})
