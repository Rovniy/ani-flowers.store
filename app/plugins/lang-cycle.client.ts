// Started after hydration, so the first switch can never cause a mismatch.
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.hook('app:mounted', () => useLangCycle().start())
})
