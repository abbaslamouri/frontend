<script setup>
// const perfectNesChoices = ref(['', '', ''])
// const showCoffeeOptions = ref(false)
// const showRoastOptopns = ref(false)
// const showPerfectForOptopns = ref(false)
const { user } = useAuth()
</script>

<template>
  <div class="home">
    <EcommerceWelcomeOfferBand />
    <!-- <EcommerceHeroBanner /> -->
    <!-- <EcommercePromoBar /> -->
    <!-- <EcommerceProductPathway /> -->
    <!-- <EcommerceGuidedSelling /> -->
    <!-- <div style="height: 300px; background-color: black">
      <img src="assets/venezia-title.svg" alt="" />
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
.home {
  min-height: 70vh;
}
</style>
