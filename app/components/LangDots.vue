<template>
  <div class="flex items-center gap-1" role="group" aria-label="Language">
    <button v-for="l in languages"
            :key="l"
            type="button"
            :lang="l"
            :aria-pressed="l === lang"
            :title="languageNames[l]"
            class="relative rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] transition-colors duration-500"
            :class="l === lang ? 'bg-olive/10 text-olive-deep' : 'text-muted/70 hover:text-olive-deep'"
            @click="select(l)">
      {{ l }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { languages, languageNames } from '~~/config'

const { lang, select } = useLangCycle()
</script>
