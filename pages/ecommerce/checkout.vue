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
const { fetchAll, saveDoc } = useHttp()

// onMounted(() => {
// cart.value = JSON.parse(localStorage.getItem('cart')) || {}
// console.log(cart.value)
// })

const updateDbOrder = async () => {
  const order = await saveDoc('orders', cart.value)
  // console.log('OOOO', order)
  if (order) {
    cart.value._id = order._id
    updateLocalStorage()
  }
}

const response = await fetchAll('products', { price: '0' })
if (response) freeSamples.value = response.docs

const checkout = async () => {
  cart.value.status = 'checkout'
  if (!isAuthenticated.value) {
    updateDbOrder()
    router.push({ name: 'ecommerce-secure' })
  } else {
    const user = await fetchLoggedInUser()
    console.log(user)
    if (!user) {
      updateDbOrder()
      router.push({ name: 'ecommerce-secure' })
    } else {
      cart.value.customer = user
      if (!cart.value.customer.shippingAddresses.length) {
        updateDbOrder()
        router.push({ name: 'ecommerce-address' })
      } else {
        const i = cart.value.customer.shippingAddresses.findIndex((a) => a.selected)
        if (i === -1) {
          const j = cart.value.customer.shippingAddresses.findIndex((a) => a.isDefault)
          if (j !== -1) cart.value.customer.shippingAddresses[j].selected = true
          else cart.value.customer.shippingAddresses[0].selected = true
          updateDbOrder()
        }
        router.push({ name: 'ecommerce-shipping' })
      }
    }
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
