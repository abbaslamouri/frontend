<script setup>
const { cart, numberOfItems } = useCart()
const { showCartSlideout } = useAppState()

onMounted(() => {
  if (process.client && localStorage.getItem('cart')) {
    cart.value = JSON.parse(localStorage.getItem('cart'))
  }
})
</script>

<template>
  <div class="border border-slate-50 br-3">
    <button
      class="btn bnt__secondary px-1 py-05 gap-1"
      :class="{ btn__checkout: numberOfItems() }"
      @click="showCartSlideout = true"
    >
      <IconsCartFill class="w-2 h-2 fill-slate-50" />
      <span class="text-xs text-slate-50">Your bag</span>
      <span class="text-slate-50">({{ numberOfItems() }})</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

button {
  &:hover {
    span {
      color: $slate-800;
    }

    svg {
      fill: $slate-800;
    }
  }
}
</style>
