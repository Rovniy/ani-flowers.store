import tailwindcss from '@tailwindcss/vite'
import { meta } from './config'

export default defineNuxtConfig({
	compatibilityDate: '2026-08-01',

	devtools: { enabled: true },

	// Stamped at build so sitemap lastmod never has to be written by hand.
	runtimeConfig: {
		public: {
			buildTime: new Date().toISOString(),
		},
	},

	app: {
		head: {
			htmlAttrs: {
				lang: 'en',
			},
			// Invariants only. Title, description and og:/twitter: tags come
			// from the single useSeoMeta call in pages/index.vue.
			meta: [
				{ name: 'theme-color', content: meta.themeColor },
				{ name: 'apple-mobile-web-app-title', content: meta.siteName },
			],
			link: [
				{ rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
				{ rel: 'icon', href: '/icon-192.png', type: 'image/png', sizes: '192x192' },
				{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
				{ rel: 'manifest', href: '/site.webmanifest' },
			],
		},
	},

	modules: ['@nuxt/image', '@nuxt/fonts'],

	css: ['~/assets/css/main.css'],

	vite: {
		plugins: [tailwindcss()],
	},

	// Every face needs Cyrillic and Vietnamese: the calls to action cycle
	// through EN, RU and VI, and a missing subset would swap fonts mid-cycle.
	fonts: {
		defaults: {
			subsets: ['latin', 'latin-ext', 'vietnamese', 'cyrillic', 'cyrillic-ext'],
		},
		families: [
			{ name: 'Cormorant Garamond', provider: 'google', weights: [400, 500, 600], styles: ['normal', 'italic'], global: true },
			{ name: 'Nunito', provider: 'google', weights: [400, 600, 700], styles: ['normal'], global: true },
		],
	},

	// Format is set per <NuxtImg>: in @nuxt/image 2 this option only reaches <NuxtPicture>.
	image: {
		quality: 80,
	},

	nitro: {
		prerender: {
			routes: ['/sitemap.xml', '/llms.txt'],
		},
	},
})
