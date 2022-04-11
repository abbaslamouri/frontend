<script setup>
const shippingOption = ref(null)
</script>

<template lang="">
  <div class="shipping-options">
    <div class="bg-stone-400 p-1 text-slate-50">Shipping Options</div>
    <div class="text-sm">
      <div class=" ">
        <div class="bg-stone-300 px-1 py-05">Home and Office Deliveries</div>
        <div class="p-2 flex-row gap-1 items-center">
          <div class="radio-button">
            <FormsBaseRadio v-model="shippingOption" value="free" />
          </div>
          <IconsFree />
          <div class="content">
            <div class="title">Standard - Free (from $35)</div>
            <div class="details">Arrives in 3 - 5 business days</div>
          </div>
          <div class="cost">Free</div>
        </div>
        <div class="p-2 flex-row gap-1 items-center">
          <div class="radio-button">
            <FormsBaseRadio v-model="shippingOption" value="paid" />
          </div>
          <IconsFree />
          <div class="content">
            <div class="title">Standard - Paid (from $34.99)</div>
            <div class="details">Arrives in 1 - 3 business days</div>
          </div>
          <div class="cost">$6.95</div>
        </div>
      </div>
      <div class="">
        <div class="bg-stone-300 px-1 py-05">Pickup</div>
        <div class="p-2 flex-row gap-1 items-center">
          <div class="radio-button">
            <FormsBaseRadio v-model="shippingOption" value="fedexUps" />
          </div>
          <IconsFree />
          <div class="content">
            <div class="title">Pick Up Point (FedEx or UPS)</div>
            <div class="details">Arrives in 1 - 3 business days</div>
            <button class="btn btn-secondary learn-more">Learn More <IconsChevronRight /></button>
          </div>
          <div class="cost">Free</div>
        </div>
        <div class="p-2 flex-row gap-1 items-center">
          <div class="radio-button">
            <FormsBaseRadio v-model="shippingOption" value="Boutique" />
          </div>
          <IconsFree />
          <div class="content">
            <div class="title">YRL Boutique</div>
            <div class="details">Immediate. Buy online, pick up in store</div>
            <div class="learn-more">
              Ready in-store 2 hours after your order is placed online. Order will be held until store closing the
              following day. Unclaimed orders will be canceled and refunded 24 hours after purchase.
            </div>
          </div>
          <div class="cost">$6.95</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
</style>
