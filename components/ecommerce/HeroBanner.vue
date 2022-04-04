<script setup></script>

<script></script>

<template>
  <section class="hero-banner">
    <div class="hero-banner__image">
      <img class="w-full h-full fill" src="assets/vday-1440.webp" alt="LOVE AT First Sip" />
    </div>

    <div class="hero-banner__container flex-col items-center justify-center gap-2">
      <div class="uppercase text-5xl tracking-widest font-bold">Love at first sip</div>
      <div class="text-lg tracking-wider">Make their Valentine Day special with te gift of coffee</div>
      <NuxtLink :to="{ name: 'index', params: { slug: ' ' } }">
        <button class="btn btn__cta">
          <span>Shop Now</span>
        </button>
      </NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.hero-banner {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  &__image {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }
  &__container {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }
}
</style>
