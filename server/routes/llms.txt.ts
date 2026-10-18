import { meta, phones, zaloUrl, address, instagram, cta } from '~~/config'

// llmstxt.org shape, generated from config.ts so it cannot drift from the page.
export default defineEventHandler((event) => {
    setHeader(event, 'content-type', 'text/plain; charset=utf-8')

    const contacts = phones.map(p => `- Zalo / phone: ${p.display} (${zaloUrl(p)})`).join('\n')

    return `# ${meta.siteName}

> ${meta.description} Official site: ${meta.canonical}

## Contacts

${contacts}
- Address: ${address.full} (${address.mapUrl})
- Instagram: @${instagram.handle} (${instagram.href})

## How to order

- EN: ${cta.contact.en}
- RU: ${cta.contact.ru}
- VI: ${cta.contact.vi}
`
})
