<script setup>
useMeta({
  title: 'Checkout | YRL',
})
definePageMeta({
  layout: 'checkout',
})
const { cart } = useCart()
onMounted(async () => {
  console.log(cart.value)
})
const freeSamples = ref([])
// const { $fetchAll } = useNuxtApp()
const { fetchAll } = useHttp()
const response = await fetchAll('products', { price: '0' })
freeSamples.value = response.docs
</script>

<template>
  <div class="flex-1 flex-col items-center bg-slate-900 p-3">
    <div class="w-996p">
      <div><EcommerceCheckoutSteps :step="1" /></div>
      <ClientOnly>
        <div class="flex-row items-start gap-2 w-996p" v-if="cart.items.length">
          <div class="flex-1 bg-slate-50 flex-col gap-2">
            <EcommerceCheckoutProductList />
            <nuxt-link class="link" :to="{ name: 'index' }">
              <IconsChevronLeft />
              <div>Continue Shopping</div>
            </nuxt-link>
            <EcommerceCheckoutCoupons />
            <div class="px-3">
              <EcommerceCheckoutCartTotal :showTaxesAndTotal="true" />
            </div>
            <div class="px-3 py-2 items-self-end">
              <NuxtLink class="btn btn__checkout text-xs px-2 py-1" :to="{ name: 'ecommerce-address' }">
                <span>Continue</span><IconsChevronRight />
              </NuxtLink>
            </div>
          </div>
          <EcommerceCheckoutFreeItems :freeSamples="freeSamples" />
        </div>
        <EcommerceCheckoutEmptyCart v-else class="bg-slate-50 p3" />
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
