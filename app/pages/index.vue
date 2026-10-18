<template>
  <div class="overflow-x-clip">
    <main>
      <!-- ── Hero ─────────────────────────────────────────────────────── -->
      <section id="top" class="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] md:gap-16 md:pb-24 md:pt-16">
        <div class="text-center md:text-left">
          <h1 class="mx-auto w-full max-w-[460px] md:mx-0">
            <NuxtImg src="/img/logo.webp"
                     format="webp"
                     width="960"
                     height="611"
                     sizes="320px sm:460px"
                     densities="1x 2x"
                     :alt="meta.siteName"
                     class="h-auto w-full"
                     preload
                     loading="eager"
                     fetchpriority="high" />
          </h1>

          <p class="eyebrow mt-6">Flower shop · {{ address.city }}</p>

          <p class="mt-6 font-display text-[clamp(34px,6vw,58px)] font-medium italic leading-[1.05] text-olive-deep text-balance">
            <RotatingText :phrase="cta.hero" />
          </p>

          <div class="mt-9 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a :href="zaloUrl(phones[0]!)" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
              <AppIcon name="chat" />
              <RotatingText :phrase="cta.zaloButton" />
            </a>
            <a :href="instagram.href" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              <AppIcon name="instagram" />
              <RotatingText :phrase="cta.instagramButton" />
            </a>
          </div>

          <LangDots class="mt-6 justify-center md:justify-start" />
        </div>

        <!-- The arch: same shape as on the link-preview card. Top radii are about
             half the width, not rounded-full: a 9999px radius makes the browser
             scale every corner down to fit, and the bottom ones go square. -->
        <div class="relative mx-auto w-full max-w-[380px]">
          <div class="absolute -inset-x-4 -bottom-5 top-10 rounded-t-[215px] rounded-b-[3rem] bg-peach-soft/70 sm:-inset-x-6 sm:-bottom-6" aria-hidden="true" />
          <NuxtImg :src="heroPhoto.src"
                   format="webp"
                   :width="heroPhoto.width"
                   :height="heroPhoto.height"
                   sizes="320px sm:380px"
                   densities="1x 2x"
                   :alt="heroPhoto.alt"
                   class="relative aspect-[3/4] w-full rounded-t-[190px] rounded-b-[2.5rem] object-cover shadow-[0_30px_60px_-30px_rgb(61_54_46/.6)]"
                   loading="eager" />
          <p class="absolute -left-3 bottom-8 rotate-[-4deg] rounded-2xl bg-paper px-4 py-2.5 font-display text-lg italic text-olive-deep shadow-[0_12px_30px_-14px_rgb(61_54_46/.5)] sm:-left-8">
            wrapped by hand by {{ meta.owner }}
          </p>
        </div>
      </section>

      <!-- ── Gallery ──────────────────────────────────────────────────── -->
      <section id="gallery" class="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20" aria-labelledby="gallery-title">
        <div class="mb-10 flex flex-col items-center text-center">
          <Sprig class="mb-5 w-40 text-olive/70" />
          <h2 id="gallery-title" class="font-display text-[clamp(32px,5vw,46px)] font-medium leading-tight text-olive-deep">A few of our bouquets</h2>
          <p class="mt-3 max-w-[38ch] text-muted">Every one is made to order, so yours will be a little different. Tap a photo to see it closer.</p>
        </div>

        <PhotoGallery :photos="gallery" />

        <div class="mt-6 text-center md:mt-10">
          <a :href="instagram.href" class="link inline-flex font-semibold" target="_blank" rel="noopener noreferrer">
            <RotatingText :phrase="cta.moreOnInstagram" />
          </a>
        </div>
      </section>

      <!-- ── Ni Ni ────────────────────────────────────────────────────── -->
      <section id="about" class="mx-auto max-w-3xl px-5 py-14 text-center sm:px-8 md:py-20">
        <p class="eyebrow" lang="vi">Xin chào!</p>
        <h2 class="mt-3 font-display text-[clamp(32px,5vw,46px)] font-medium leading-tight text-olive-deep">
          I’m {{ meta.owner }}
        </h2>
        <p class="mx-auto mt-5 max-w-[52ch] text-[17px] leading-relaxed text-ink/85">
          {{ meta.siteName }} is my little flower shop in {{ address.city }}. I wrap every
          bouquet by hand, for birthdays, first dates, apologies and ordinary days
          that deserve something nice. Tell me who it’s for and what they love,
          and I’ll make it theirs.
        </p>
        <Sprig class="mx-auto mt-8 w-28 -scale-x-100 text-olive/60" />
      </section>

      <!-- ── Contacts ─────────────────────────────────────────────────── -->
      <section id="contact" class="px-5 pb-20 pt-6 sm:px-8 md:pb-28" aria-labelledby="contact-title">
        <div class="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-linen/80 ring-1 ring-olive/10 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div class="flex flex-col justify-center p-8 sm:p-12">
            <p class="eyebrow">Contacts</p>
            <h2 id="contact-title" class="mt-3 font-display text-[clamp(30px,4.4vw,42px)] font-medium italic leading-[1.1] text-olive-deep">
              <RotatingText :phrase="cta.contact" />
            </h2>

            <a :href="zaloUrl(phones[0]!)" class="btn btn-primary mt-8 self-start" target="_blank" rel="noopener noreferrer">
              <AppIcon name="chat" />
              <RotatingText :phrase="cta.zaloButton" />
            </a>
          </div>

          <dl class="grid content-center gap-7 border-t border-olive/10 bg-paper/70 p-8 sm:p-12 md:border-l md:border-t-0">
            <div>
              <dt class="eyebrow mb-2 flex items-center gap-2"><AppIcon name="chat" class="size-4" /> Zalo · Phone</dt>
              <dd v-for="p in phones" :key="p.e164" class="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-1">
                <a :href="zaloUrl(p)" class="link font-display text-2xl font-semibold tracking-wide" target="_blank" rel="noopener noreferrer"
                   :aria-label="`Zalo ${p.display}`">{{ p.display }}</a>
                <a :href="telUrl(p)" class="inline-flex items-center gap-1.5 text-sm text-muted hover:text-olive-deep"
                   :aria-label="`Call ${p.display}`">
                  <AppIcon name="phone" class="size-3.5" /> call
                </a>
              </dd>
            </div>

            <div>
              <dt class="eyebrow mb-2 flex items-center gap-2"><AppIcon name="pin" class="size-4" /> Address</dt>
              <dd>
                <address class="not-italic text-[17px] leading-snug">
                  <span lang="vi">{{ address.street }}</span><br>
                  <span lang="vi">{{ address.city }}</span>, {{ address.country }}
                </address>
                <a :href="address.mapUrl" class="link mt-2 inline-block text-sm font-semibold" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
              </dd>
            </div>

            <div>
              <dt class="eyebrow mb-2 flex items-center gap-2"><AppIcon name="instagram" class="size-4" /> Instagram</dt>
              <dd>
                <a :href="instagram.href" class="link text-[17px] font-semibold" target="_blank" rel="noopener noreferrer">@{{ instagram.handle }}</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </main>

    <footer class="border-t border-olive/10 px-5 py-10 text-center text-sm text-muted sm:px-8">
      <img src="/icon-192.png" width="48" height="48" alt="" class="mx-auto mb-3 size-12 rounded-full mix-blend-multiply">
      <p>© {{ year }} {{ meta.siteName }} · {{ address.city }}, {{ address.country }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { meta, cta, phones, zaloUrl, telUrl, address, instagram, gallery, heroPhoto, verification } from '~~/config'

const year = new Date(useRuntimeConfig().public.buildTime as string).getFullYear()

useSeoMeta({
  title: meta.title,
  description: meta.description,
  robots: 'index, follow, max-image-preview:large',

  ogType: 'website',
  ogSiteName: meta.siteName,
  ogLocale: 'en_US',
  ogLocaleAlternate: ['ru_RU', 'vi_VN'],
  ogUrl: meta.canonical,
  ogTitle: meta.title,
  ogDescription: meta.description,
  ogImage: `${meta.domain}${meta.ogImage}`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  ogImageAlt: 'Ani Flowers logo next to a bouquet of carnations in lace',

  twitterCard: 'summary_large_image',
  twitterTitle: meta.title,
  twitterDescription: meta.description,
  twitterImage: `${meta.domain}${meta.ogImage}`,
})

useHead({
  link: [{ rel: 'canonical', href: meta.canonical }],
  meta: [
    { name: 'google-site-verification', content: verification.google },
    { name: 'msvalidate.01', content: verification.bing },
  ].filter(t => t.content),
})

useStructuredData()
</script>
