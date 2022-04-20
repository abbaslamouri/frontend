<script setup>
useMeta({ title: 'Payment | YRL' })
definePageMeta({ layout: 'checkout' })

const { cart, fetchPublishableKey, fetchClientSecret } = useCart()
const { saveDoc } = useHttp()
const order = ref({})
const stripe = ref(null)
const paymentElement = ref(null)
const elements = ref(null)
const clientSecret = ref(null)

const publishableKey = await fetchPublishableKey()

onMounted(async () => {
  // cart.value = JSON.parse(localStorage.getItem('cart')) || {}
  console.log(cart.value)
  // order.value.items = []
  // for (const prop in cart.value.items) {
  //   order.value.items[prop] = {
  //     product: cart.value.items[prop].product,
  //     name: cart.value.items[prop].product.name,
  //     price: cart.value.items[prop].product.price,
  //     salePrice: cart.value.items[prop].product.salePrice,
  //     thumb: cart.value.items[prop].product.gallery[0],
  //     productType: cart.value.items[prop].product.productType,
  //     quantity: cart.value.items[prop].quantity,
  //   }
  // }
  // order.value.customer = cart.value.customer
  // order.value.shippingAddress = cart.value.customer.shippingAddresses.find((a) => a.selected == true)
  // order.value.total = cart.value.total
  // order.value.state = 'order'
  // console.log(order.value)
  // const response = await saveDoc('orders', order.value)
  // console.log(response)
  // cart.value.total = cartTotal()
  stripe.value = Stripe(publishableKey)
  clientSecret.value = await fetchClientSecret(cart.value)
  console.log(clientSecret.value)
  const options = {
    clientSecret: clientSecret.value,
    appearance: {
      theme: 'flat',
      variables: {
        colorBackground: '#e2e8f0',
      },
      labels: 'floating',
    },
  }
  elements.value = stripe.value.elements(options)
  paymentElement.value = elements.value.create('payment')
  paymentElement.value.mount('#payment-element')
})

const comfirmPayment = async () => {
  try {
    const result = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: 'http://localhost:4000/ecommerce/thankyou',
      },
    })
    console.log(result)
    if (result.error) console.log(result.error.message)
  } catch (err) {
    console.log(err.message)
  }
}
</script>

<template>
  <div class="secure w-full flex-1 bg-slate-900 flex-col items-center gap-1">
    <div class="content flex-row items-start gap-2 w-996p">
      <EcommerceCheckoutSteps :step="4" activeColor="#16a34a" />
    </div>
    <ClientOnly>
      <div class="gap-2 w-996p flex-row justify-center gap-2" v-if="cart.items && cart.items.length">
        <div class="main flex-1 bg-slate-50 p-2">
          <form id="payment-form" class="flex-col gap-2" @submit.prevent="comfirmPayment">
            <div id="payment-element" class=""></div>
            <button id="submit" class="btn btn__checkout px-2 py-1 items-self-end">
              <div class="spinner hidden" id="spinner"></div>
              <span id="button-text">Pay now</span>
            </button>
            <div id="payment-message" class="hidden"></div>
          </form>
        </div>
        <div class="aside bg-slate-50 w-32">
          <EcommerceCheckoutShippingCartOverview />
        </div>
      </div>
      <div v-else class="flex-1 flex-col gap-2 bg-slate-50 mt-10 p-4 br-3">
        <p>You have no items in your bag</p>
        <NuxtLink class="btn btn__checkout px-2 py-05" :to="{ name: 'ecommerce-products' }">
          <span>Start Shopping</span>
        </NuxtLink>
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.payment {
  font-size: 1.6rem;
}
</style>
