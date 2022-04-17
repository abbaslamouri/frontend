<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  listType: {
    type: String,
  },
  showSelectQty: {
    type: Boolean,
  },
})

const emit = defineEmits([
  'selectQuantityBtnClicked',
  'closeSelectQuantity',
  'itemQuantitySelected',
  'resetSelectQuantities',
])

const { cart } = useCart()
const hide = ref(true)
// const variants = ref([])

onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem('cart')) || {}
  console.log(cart.value)
})

const getcartItemCount = () => {
  if (cart.value.items && cart.value.items.length) {
    const found = cart.value.items.find((i) => i.product == props.product._id)
    return found ? found.quantity : 0
  }
  return 0
}

// variants.value = props.product._id
//   ? await fetchAll('variants', {
//       fields: 'product, attrattributeTerms, gallery',
//       product: props.product._id,
//     })
//   : []

// console.log(variants.value)

// const response = await fetchVariants(props.product._id)
// if (state.errorMsg) {
//   cart.errorMsg = state.errorMsg
//   variants.value = []
// } else {
//   variants.value = response.docs
// }
</script>

<template>
  <div
    class="flex-col items-center justify-between gap-1 py-1 mt--1 ml--1 w-25-percent h-300p border border-slate-300"
    :class="{ tile: listType === 'tile', list: listType === 'list' }"
  >
    <div class="flex-col items-center justify-center gap-2">
      <div
        class="thumb-and-description w-full h-12 cursor-pointer"
        @mouseenter="hide = false"
        @mouseleave="hide = true"
      >
        <div class="thumb w-full h-12" :class="{ hide: !hide }" v-if="product.gallery.length > 1">
          <img class="w-full h-full contain" :src="product.gallery[0].path" :alt="`${product.gallery[0].name} Image`" />
        </div>
        <div class="description flex-row items-center justify-center text-center p-1 text-xs" :class="{ hide: hide }">
          {{ product.excerpt }}
        </div>
      </div>
      <NuxtLink class="link" :to="{ name: 'index', params: { productSlug: product.slug } }">
        <div class="font-bold">{{ product.name }}</div>
      </NuxtLink>
      <div class="roastiness">{{ product.roastiness }}</div>
      <div class="intensity">
        <EcommerceProductsCoffeeIntensity :intensity="product.intensity" :total="13" v-if="product.intensity" />
      </div>
    </div>
    <div class="flex-row items-center gap-2">
      <div v-if="product.salePrice">
        <div class="text-slate-400 line-through" :class="{ strikeout: product.salePrice }">${{ product.price }}</div>
        <div>${{ product.salePrice }}</div>
      </div>
      <div v-else>${{ product.price }}</div>
      <EcommerceCheckoutQuantitySelector
        v-if="product.productType === 'simple'"
        :minVal="0"
        :maxVal="140"
        :stepVal="10"
        :btnText="getcartItemCount()"
        :showSelectQty="showSelectQty"
        @okBtnClicked="$emit('itemQuantitySelected', $event)"
        @cancel="$emit('resetSelectQuantities')"
      />
      <div v-if="product.productType === 'variable'">
        <NuxtLink class="link items-self-end" :to="{ name: 'index', params: { productSlug: product.slug } }">
          <button class="btn btn__primary py-05 px2- text-xs">Select Options</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.thumb-and-description {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;

  .thumb {
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    &.hide {
      display: none;
    }
  }

  .description {
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    &.hide {
      display: none;
    }
  }
}
</style>
