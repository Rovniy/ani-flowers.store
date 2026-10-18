<template>
  <div>
    <!-- Phones: a swipeable row. Desktop: five cards, every other one dropped
         a little, like prints laid out on a table. -->
    <ul class="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-0 md:pb-12 [&::-webkit-scrollbar]:hidden">
      <li v-for="(p, i) in photos"
          :key="p.src"
          class="w-[68%] shrink-0 snap-center sm:w-[42%] md:w-auto"
          :class="i % 2 ? 'md:translate-y-10' : ''">
        <button type="button"
                class="group block w-full cursor-zoom-in text-left"
                :aria-label="`Open photo: ${p.caption}`"
                @click="show(i)">
          <span class="block overflow-hidden bg-linen shadow-[0_18px_40px_-24px_rgb(61_54_46/.55)] ring-1 ring-ink/5"
                :class="i === 2 ? 'rounded-t-[140px] rounded-b-3xl' : 'rounded-3xl'">
            <!-- Fixed px widths per breakpoint: a bare vw value gave a 2px srcset in the reference project. -->
            <NuxtImg :src="p.src"
                     format="webp"
                     :width="p.width"
                     :height="p.height"
                     sizes="280px md:240px"
                     densities="1x 2x"
                     :alt="p.alt"
                     loading="lazy"
                     class="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.04]" />
          </span>
          <span class="mt-3 block text-center font-display text-lg italic text-olive-deep">{{ p.caption }}</span>
        </button>
      </li>
    </ul>

    <dialog ref="dialog"
            class="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
            aria-label="Photo viewer"
            @click="onBackdropClick"
            @keydown.left.prevent="step(-1)"
            @keydown.right.prevent="step(1)"
            @close="current = null">
      <figure v-if="photo" class="relative flex flex-col items-center px-4">
        <!-- Plain <img> of the original: an _ipx variant only exists on disk for
             sizes the prerender saw, and this one is chosen at runtime. -->
        <img :src="photo.src"
             :width="photo.width"
             :height="photo.height"
             :alt="photo.alt"
             class="h-auto max-h-[82svh] w-auto max-w-[min(92vw,640px)] rounded-3xl object-contain shadow-2xl">
        <figcaption class="mt-4 font-display text-2xl italic text-cream">
          {{ photo.caption }}
          <span class="ml-2 font-sans text-xs not-italic tracking-[.2em] text-cream/60">{{ (current ?? 0) + 1 }} / {{ photos.length }}</span>
        </figcaption>
      </figure>

      <button type="button" class="lb-btn right-4 top-4" aria-label="Close" @click="close">
        <AppIcon name="close" />
      </button>
      <button type="button" class="lb-btn left-3 top-1/2 -translate-y-1/2 md:left-8" aria-label="Previous photo" @click="step(-1)">
        <AppIcon name="prev" />
      </button>
      <button type="button" class="lb-btn right-3 top-1/2 -translate-y-1/2 md:right-8" aria-label="Next photo" @click="step(1)">
        <AppIcon name="next" />
      </button>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import type { TPhoto } from '~~/config'

const props = defineProps<{ photos: TPhoto[] }>()

const dialog = ref<HTMLDialogElement>()
const current = ref<number | null>(null)
const photo = computed(() => current.value === null ? null : props.photos[current.value])

const show = (i: number) => {
  current.value = i
  dialog.value?.showModal()
}

const close = () => dialog.value?.close()

const step = (d: number) => {
  if (current.value === null) return
  current.value = (current.value + d + props.photos.length) % props.photos.length
}

// The dialog element itself fills the viewport; a click that lands on it
// rather than on a child is a click on the backdrop.
const onBackdropClick = (e: MouseEvent) => {
  if (e.target === dialog.value || e.target === e.currentTarget) close()
}
</script>

<style scoped>
@reference "~/assets/css/main.css";

dialog[open] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100svh;
}

.lb-btn {
  @apply absolute grid size-11 place-items-center rounded-full bg-cream/90 text-olive-deep shadow-lg transition-colors hover:bg-cream;
}
</style>
