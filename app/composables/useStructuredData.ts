import { meta, phones, address, instagram, gallery } from '~~/config'

/**
 * schema.org Florist (a LocalBusiness subtype): what Google Maps and local
 * search read for name, address and phone. Built from config.ts only.
 * Opening hours and price range are left out until they are known for sure.
 */
export function useStructuredData() {
    const graph = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': `${meta.domain}/#website`,
                url: meta.canonical,
                name: meta.siteName,
                inLanguage: ['en', 'ru', 'vi'],
                publisher: { '@id': `${meta.domain}/#shop` },
            },
            {
                '@type': 'Florist',
                '@id': `${meta.domain}/#shop`,
                name: meta.siteName,
                url: meta.canonical,
                description: meta.description,
                logo: `${meta.domain}${meta.logo}`,
                image: gallery.map(p => `${meta.domain}${p.src}`),
                telephone: phones.map(p => p.e164),
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: address.street,
                    addressLocality: address.city,
                    addressCountry: address.countryCode,
                },
                hasMap: address.mapUrl,
                sameAs: [instagram.href],
            },
        ],
    }

    useHead({
        script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(graph) }],
    })
}
