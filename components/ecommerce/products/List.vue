<script setup>
// import { useCart } from '~/store/useCart'

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
})

const { addItem } = useCart()
const listType = ref('tile')
const quantitySelectors = ref([])

const resetSelectQuantities = () => {
  for (const prop in props.products) {
    quantitySelectors.value[prop] = false
  }
}

const toggleQuantitySelectors = (status, i) => {
  resetSelectQuantities()
  quantitySelectors.value[i] = status
  // addItem(props.products[i], event.quantity)
  // console.log(cart.value)
}
</script>

<template>
  <div class="w-996p border-red">
    <!-- {{products}}====== -->
    <div v-if="products.length">
      <div
        class="header flex-col items-center gap-2 p-2 text-slate-50 bg-norepeat bg-cover"
        :style="{ backgroundImage: `url('/assets/barista-creations-coffee-capsules-desktop2.webp')` }"
      >
        <h3 class="tracking-wider">ISPIRAZIONE ITALIANA</h3>
        <p class="tracking-wide">
          Unique flavors inspired by Italian roasting traditions passed down through generations
        </p>
        <NuxtLink class="flex-row items-center gap-1" :to="{ name: 'index', params: { slug: ' ' } }">
          <span>Discover the range</span>
          <IconsChevronRight class="fill-slate-50" />
        </NuxtLink>
      </div>
      <div class="flex-row wrap">
        <EcommerceProductsCard
          v-for="(product, i) in products"
          :key="product._id"
          :product="product"
          :listType="listType"
          :showQuantitySelector="quantitySelectors[i]"
          @toggleQuantitySelectors="toggleQuantitySelectors($event, i)"
          @resetSelectQuantities="resetSelectQuantities"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
