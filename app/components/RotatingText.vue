<template>
  <!-- All three variants are in the HTML, so crawlers and the prerendered page
       carry every language; only the active one is visible and announced. -->
  <span class="rotator">
    <span v-for="l in languages"
          :key="l"
          :lang="l"
          :aria-hidden="l !== lang || undefined">{{ phrase[l] }}</span>
  </span>
</template>

<script setup lang="ts">
import { languages, type TPhrase } from '~~/config'

defineProps<{ phrase: TPhrase }>()

const { lang } = useLangCycle()
</script>
