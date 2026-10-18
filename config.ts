export const meta = {
    siteName: 'Ani Flowers',
    title: 'Ani Flowers — Flower Shop in Đà Nẵng',
    description: 'Hand-wrapped bouquets from Ani Flowers, a small flower shop at 66 Nguyễn Đình Chiểu, Đà Nẵng. Order on Zalo or Instagram.',
    domain: 'https://ani-flowers.store',
    canonical: 'https://ani-flowers.store/',
    owner: 'Ni Ni',
    ogImage: '/og.jpg',
    logo: '/img/logo.png',
    themeColor: '#F7F0E6',
}

/** Order matters: it is the order the rotating copy cycles through. */
export const languages = ['en', 'ru', 'vi'] as const
export type TLang = typeof languages[number]
export type TPhrase = Record<TLang, string>

export const rotateEveryMs = 3000

export const languageNames: TPhrase = {
    en: 'English',
    ru: 'Русский',
    vi: 'Tiếng Việt',
}

/**
 * Every call to action on the page, in all three languages. They cycle
 * together, so the whole page is in one language at any moment.
 */
export const cta = {
    hero: {
        en: 'Order a bouquet for someone you love',
        ru: 'Закажите букет для любимого человека',
        vi: 'Đặt hoa tặng người thương',
    },
    zaloButton: {
        en: 'Order on Zalo',
        ru: 'Заказать в Zalo',
        vi: 'Đặt hoa qua Zalo',
    },
    instagramButton: {
        en: 'See us on Instagram',
        ru: 'Мы в Instagram',
        vi: 'Xem shop trên Instagram',
    },
    contact: {
        en: 'Message us on Zalo to order',
        ru: 'Напишите нам в Zalo, чтобы заказать букет',
        vi: 'Nhắn Zalo cho shop để đặt hoa nhé',
    },
    moreOnInstagram: {
        en: 'More bouquets on Instagram',
        ru: 'Больше букетов в Instagram',
        vi: 'Thêm nhiều mẫu hoa trên Instagram',
    },
} satisfies Record<string, TPhrase>

export type TPhone = {
    /** As people write it in Vietnam */
    display: string
    /** E.164, for tel: links and schema.org */
    e164: string
}

export const phones: TPhone[] = [
    { display: '077.759.6180', e164: '+84777596180' },
    { display: '070.247.6897', e164: '+84702476897' },
]

/** zalo.me takes the national number without separators. */
export const zaloUrl = (p: TPhone) => `https://zalo.me/0${p.e164.slice(3)}`
export const telUrl = (p: TPhone) => `tel:${p.e164}`

export const address = {
    street: '66 Nguyễn Đình Chiểu',
    city: 'Đà Nẵng',
    country: 'Vietnam',
    countryCode: 'VN',
    get full(): string {
        return `${address.street}, ${address.city}, ${address.country}`
    },
    get mapUrl(): string {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address.street}, ${address.city}`)}`
    },
}

// Kept free of the share-sheet tracking params: it also goes into schema.org sameAs.
export const instagram = {
    handle: 'ani_flowers.store',
    href: 'https://www.instagram.com/ani_flowers.store/',
}

export type TPhoto = {
    src: string
    width: number
    height: number
    alt: string
    caption: string
}

export const gallery: TPhoto[] = [
    {
        src: '/img/gallery/chamomile-by-the-window.jpg',
        width: 960, height: 1280,
        alt: 'A large bouquet of chamomile in lace-cut kraft paper with a cream ribbon, on a sunny windowsill',
        caption: 'Chamomile by the window',
    },
    {
        src: '/img/gallery/carnations-in-lace.jpg',
        width: 960, height: 1280,
        alt: 'Pink and pale green carnations with sprigs of greenery, wrapped in white lace with a pink ribbon',
        caption: 'Carnations in lace',
    },
    {
        src: '/img/gallery/pink-spray-roses.jpg',
        width: 1024, height: 1280,
        alt: 'A dense bouquet of pink spray roses in black wrapping paper with a blush satin ribbon',
        caption: 'Pink spray roses',
    },
    {
        src: '/img/gallery/green-bell-bouquet.jpg',
        width: 960, height: 1280,
        alt: 'A fluffy all-green bouquet wrapped in coral paper printed with little hearts, tied with green twine',
        caption: 'All green',
    },
    {
        src: '/img/gallery/red-roses.jpg',
        width: 1024, height: 1280,
        alt: 'Classic red roses in black paper with a red satin bow',
        caption: 'Red roses',
    },
]

/** The photo next to the logo in the hero. */
export const heroPhoto: TPhoto = gallery[0]!

/**
 * Search-engine ownership tokens. Paste the content="…" value from each
 * console; empty ones emit no tag.
 */
export const verification = {
    google: '',
    bing: '',
}
