<script setup>
useMeta({
  title: 'Checkout | YRL',
})
definePageMeta({
  layout: 'checkout',
})

const router = useRouter()
const { cart, cartTotal, updateLocalStorage } = useCart()
const freeSamples = ref([])
const { isAuthenticated, fetchLoggedInUser } = useAuth()
const { fetchAll } = useHttp()

onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem('cart')) || {}
  console.log(cart.value)
})

const response = await fetchAll('products', { price: '0' })
if(response) freeSamples.value = response.docs

const checkout = async () => {
  // cart.value.total = cartTotal()
  // cart.value.shippingAddress = {}
  // cart.value.customer = {}
  updateLocalStorage()

  if (isAuthenticated.value) {
    const data = await fetchLoggedInUser()
    if (!data) return
    const user = data.doc
    console.log(user)
    cart.value.customer = user
    cart.value.email = user.email
    if (!user.shippingAddresses.length) {
      cart.value.shippingAddress = {}
      updateLocalStorage()
      console.log('SA', cart.value)
      return router.push({ name: 'ecommerce-address' })
    }
    const shippingAddress = user.shippingAddresses.find((sa) => sa.isDefault === true)
    cart.value.shippingAddress = shippingAddress ? shippingAddress : user.shippingAddresses[0]
    updateLocalStorage()
    console.log('CCC', cart.value)
    router.push({ name: 'ecommerce-shipping' })
  } else {
    console.log(cart.value)
    router.push({ name: 'ecommerce-secure' })
  }
}
</script>

<template>
  <div class="flex-1 flex-col items-center bg-slate-900 p-3">
    <div class="w-996p">
      <div><EcommerceCheckoutSteps :step="1" /></div>
      <ClientOnly>
        <div class="flex-row items-start gap-2 w-996p" v-if="cart.items && cart.items.length">
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
              <button class="btn btn__checkout px-3 py-1" @click="checkout">Continue</button>
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
