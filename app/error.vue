<template>
  <main class="flex min-h-svh flex-col items-center justify-center gap-4 px-5 text-center">
    <!-- Plain <img>, not NuxtImg: this page renders client-side from 404.html,
         outside the prerender pass, so no /_ipx/ variant exists for it. -->
    <img src="/img/logo.webp" width="960" height="611" :alt="meta.siteName" class="h-auto w-64">

    <p class="eyebrow mt-4">{{ error?.statusCode ?? 404 }}</p>
    <h1 class="font-display text-5xl font-medium italic text-olive-deep">
      {{ isMissing ? 'This page has wilted' : 'Something went wrong' }}
    </h1>
    <p class="max-w-[34ch] text-muted">
      {{ isMissing ? 'There is nothing at this address. The bouquets are back on the main page.' : 'Please try again in a moment.' }}
    </p>

    <a href="/" class="btn btn-ghost mt-4">Back to {{ meta.siteName }}</a>
  </main>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import { meta } from '~~/config'

const props = defineProps<{ error?: NuxtError }>()

const isMissing = computed(() => props.error?.statusCode === 404)

useHead({
  title: `Page not found — ${meta.siteName}`,
  meta: [{ name: 'robots', content: 'noindex, follow' }],
})
</script>
