<script setup>
defineProps({
  step: Number,
})
</script>

<template>
  <div class="w-full">
    <!-- {{ cart.customer }}===={{ cart.items }} -->
    <nav class="steps flex-row items-center justify-evenly text-sm px-2 py-2 pb-4">
      <div
        class="step cursor-pointer flex-1 h-6 font-semi-bold text-slate-300 flex-col gap-03"
        :class="{ active: step === 1, completed: step > 1 }"
      >
        <div class="flex-row items-center gap-1">Step 1<IconsCheck class="fill-green-600" v-if="step > 1" /></div>
        <nuxt-link :to="{ name: 'ecommerce-checkout' }">Shopping Bag</nuxt-link>
        <!-- <a v-else class="disabled">Sign In</a> -->
      </div>
      <div
        class="step cursor-pointer flex-1 h-6 font-semi-bold text-slate-300 flex-col gap-03"
        :class="{ active: step === 2, completed: step > 2 }"
      >
        <div class="flex-row items-center gap-1">Step 2<IconsCheck class="fill-green-600" v-if="step > 2" /></div>
        <nuxt-link :to="{ name: 'ecommerce-shipping' }">Shipping</nuxt-link>
        <!-- <a v-else class="disabled">Shipping</a> -->
      </div>
      <div
        class="step cursor-pointer flex-1 h-6 font-semi-bold text-slate-300 flex-col gap-03"
        :class="{ active: step === 3, completed: step > 3 }"
      >
        <div class="flex-row items-center gap-1">Step 3<IconsCheck class="fill-green-600" v-if="step > 3" /></div>
        <nuxt-link :to="{ name: 'ecommerce-payment' }">Payment</nuxt-link>
        <!-- <a v-else class="disabled">Payment</a> -->
      </div>
      <div
        class="step cursor-pointer flex-1 h-6 font-semi-bold text-slate-300 flex-col gap-03"
        :class="{ active: step === 4, completed: step > 4 }"
      >
        <div class="flex-row items-center gap-1">Step 4<IconsCheck class="fill-green-600" v-if="step > 4" /></div>
        <nuxt-link :to="{ name: 'ecommerce-shipping' }">Review</nuxt-link>
        <!-- <a v-else class="disabled">Place Order</a> -->
      </div>
      <div
        class="step cursor-pointer flex-1 h-6 font-semi-bold text-slate-300 flex-col gap-03"
        :class="{ active: step === 5, completed: step > 5 }"
      >
        <div class="flex-row items-center gap-1">Step 5<IconsCheck class="fill-green-600" v-if="step > 4" /></div>
        <nuxt-link :to="{ name: 'ecommerce-shipping' }">Confirmation</nuxt-link>
        <!-- <a v-else class="disabled">Place Order</a> -->
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.step {
  border-bottom: 0.3rem solid $slate-400;

  &.active {
    border-bottom: 0.3rem solid $green-700;
    color: white;
    font-weight: 500;
  }

  &.completed {
    border-bottom-color: $green-700;
  }
}
</style>
