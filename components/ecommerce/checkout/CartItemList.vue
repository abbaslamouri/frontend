<script setup>
const { cart } = useCart()

const quantitySelectors = ref([])

const resetQuantitySelectors = () => {
  for (const prop in cart.value.items) {
    quantitySelectors.value[prop] = false
  }
}

const toggleQuantitySelectors = (status, index) => {
  resetQuantitySelectors()
  quantitySelectors.value[index] = status
  // updateItemQuantity(cart.value.items[index], event.quantity)
}
</script>

<template>
  <div class="cart-item-list">
    <div
      class="cart-items-list__item flex-row gap-2 items-center justify-between py-1 mt--1"
      v-for="(item, index) in cart.items"
      :key="item.product._id"
    >
      <div class="flex-row gap-2 items-center">
        <div class="w-5 h-5" v-if="item.product && item.product.gallery && item.product.gallery[0]">
          <img class="w-full contain" :src="item.product.gallery[0].path || '/placeholder.png'" />
        </div>
        <div class="flex-col text-sm">
          <div class="font-bold">{{ item.product.name }}</div>
          <div class="text-yellow-700">${{ item.product.price }}</div>
        </div>
      </div>
      <EcommerceQuantitySelector
        parentComponent="cart"
        :product="item.product"
        :minVal="0"
        :maxVal="140"
        :stepVal="10"
        :showQuantitySelector="quantitySelectors[index]"
        :btnText="item.quantity"
        @toggleQuantitySelectors="toggleQuantitySelectors($event, index)"
        @cancel="resetQuantitySelectors"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.cart-item-list {
  &__item {
    border-top: 1px solid $stone-300;
    border-bottom: 1px solid $stone-300;
  }
}
</style>
