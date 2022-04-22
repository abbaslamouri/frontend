<script setup>
useMeta({ title: 'Payment | YRL' })
definePageMeta({ layout: 'checkout' })

const router = useRouter(0)
const { cart, fetchPublishableKey, fetchClientSecret } = useCart()
const stripe = ref(null)
const paymentElement = ref(null)
const elements = ref(null)
const clientSecret = ref(null)
const errorMessage = ref('')
const submitting = ref(false)
const publishableKey = await fetchPublishableKey()

onMounted(async () => {
  console.log(cart.value)
  if (!cart.value.total || !cart.value.items.length) return router.push({ name: 'ecommerce-checkout' })
  stripe.value = await Stripe(publishableKey)
  clientSecret.value = await fetchClientSecret(cart.value.id)
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
  submitting.value = true
  try {
    const result = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: `http://localhost:4000/ecommerce/thankyou/?orderId=${cart.value.id}`,
      },
    })
    console.log(result)
    if (result.error) console.log(result.error.message)
    switch (result.error.code) {
      case 'card_declined':
        errorMessage.value = `${result.error.message}  Please try a different card.`
        break

      default:
        errorMessage.value = `Your card was declined.  Please try a different card.`
        break
    }
    submitting.value = false
  } catch (err) {
    console.log(err.message)
    errorMessage.value = result.error.message
    submitting.value = false
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
            <div>
              <input type="text" :value="cart.customer.shippingAddresses.find((a) => a.selected === true).name" />
              <input type="text" :value="cart.customer.shippingAddresses.find((a) => a.selected === true).email" />
            </div>
            <div id="payment-element" class=""></div>
            <button id="submit" class="btn btn__checkout px-2 py-1 items-self-end">
              <!-- <div class="spinner" id="spinner" v-if="submitting"></div> -->
              <Spinner width="2rem" height="2rem" v-if="submitting" />
              <span id="button-text" v-else>Pay now</span>
            </button>
            <div id="payment-message" class="bg-red-100 p-2" v-if="errorMessage">{{ errorMessage }}</div>
          </form>
        </div>
        <div class="aside bg-slate-50 w-32">
          <EcommerceCheckoutShippingCartOverview />
        </div>
      </div>
      <EcommerceCheckoutEmptyCart v-else class="bg-slate-50 p3" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.payment {
  font-size: 1.6rem;
}
</style>
