<template>
  <svg viewBox="0 0 24 24"
       width="20"
       height="20"
       fill="none"
       stroke="currentColor"
       stroke-width="1.6"
       stroke-linecap="round"
       stroke-linejoin="round"
       aria-hidden="true"
       focusable="false">
    <template v-if="name === 'chat'">
      <path d="M4.5 5.5h15a1.5 1.5 0 0 1 1.5 1.5v8.5a1.5 1.5 0 0 1-1.5 1.5H11l-4.5 3.5V17H4.5A1.5 1.5 0 0 1 3 15.5V7a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path d="M8.5 9.5h6l-6 4h6" />
    </template>
    <template v-else-if="name === 'instagram'">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </template>
    <template v-else-if="name === 'pin'">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </template>
    <template v-else-if="name === 'phone'">
      <path d="M6.6 3.5h2.2l1.4 4-2 1.3a11 11 0 0 0 5 5l1.3-2 4 1.4v2.2a2 2 0 0 1-2.1 2A15.5 15.5 0 0 1 4.6 5.6a2 2 0 0 1 2-2.1Z" />
    </template>
    <template v-else-if="name === 'close'">
      <path d="M6 6l12 12M18 6 6 18" />
    </template>
    <template v-else-if="name === 'prev'">
      <path d="M15 5l-7 7 7 7" />
    </template>
    <template v-else-if="name === 'next'">
      <path d="M9 5l7 7-7 7" />
    </template>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ name: 'chat' | 'instagram' | 'pin' | 'phone' | 'close' | 'prev' | 'next' }>()
</script>
