<script setup>
const promoCode = ref(null)
</script>

<template>
  <div class="flex-col gap-1 border-b-stone-300 py-2">
    <div class="bg-stone-200 p-1">Promo Code</div>
    <div class="flex-row gap-2 items-center px-2">
      <div class="title">Enter promo code</div>
      <form class="flex-1 flex-row gap-1 items-center">
        <div class="w-full">
          <FormsBaseInput
            label="Promo Code"
            placeholder="Promo Code"
            v-model="promoCode"
            hint="Please enter a valid coupon code"
          />
        </div>
        <button class="btn btn__secondary px-2 py-1">Apply&nbsp;Coupon</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
