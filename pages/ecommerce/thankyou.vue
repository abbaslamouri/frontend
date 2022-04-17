<script setup>
useMeta({ title: 'Payment | YRL' })
definePageMeta({ layout: 'checkout' })

const route = useRoute()
console.log('ROUTE', route)
const { cart, cartTotal } = useCart()
const { fetchPublishableKey, fetchClientSecret } = useHttp()

const stripe = ref(null)
const paymentElement = ref(null)
const elements = ref(null)
const clientSecret = ref(null)

// const publishableKey = await fetchPublishableKey()

onMounted(async () => {
  // cart.value.total = cartTotal()
  // stripe.value = Stripe(publishableKey)
  // clientSecret.value = await fetchClientSecret(cart.value)
  // const options = {
  //   clientSecret: clientSecret.value,
  //   appearance: {
  //     theme: 'stripe',
  //   },
  // }
  // elements.value = stripe.value.elements(options)
  // paymentElement.value = elements.value.create('payment')
  // paymentElement.value.mount('#payment-element')
})

const comfirmPayment = async () => {
  // try {
  //   const result = await stripe.value.confirmPayment({
  //     elements: elements.value,
  //     confirmParams: {
  //       return_url: 'http://localhost:4000/ecommerce/thankyou',
  //     },
  //   })
  //   console.log(result)
  //   if (result.error) console.log(result.error.message)
  // } catch (err) {
  //   console.log(err.message)
  // }
}
</script>

<template>
  <div class="payment">
    <!-- {{ clientSecret }} -->
    <form id="payment-form">
      <div id="payment-element">
        <!-- Elements will create form elements here -->
      </div>
      <button id="submit" @click.prevent="comfirmPayment">Submit</button>
      <div id="error-message">
        <!-- Display error message to your customers here -->
      </div>
    </form>

    <!-- <div id="payment-element"></div> -->
    ====
    <!-- <ProductsCheckoutSteps :step1="true" :step2="true" :step3="true" />
    <h1>Payment Method</h1>
    <div class="content flex gap-10">
      <form class="border" @submit.prevent="handleSubmit">
        <FormsBaseRadioGroup v-model="cart.cart.paymentMethod" name="payment-methods" :options="paymentOptions" />
        <button class="btn">Continue</button>
      </form>
      <div class="order-summary border flex-1 border-red-300">
        <div class="item w-full flex justify-around border items-center" v-for="item in cart.items" :key="item.product">
          <div class="image w-48">
            <img
              :src="item.featuredImage ? item.featuredImage.path : '/placeholder.png'"
              :alt="` ${item.name} Photo`"
            />
          </div>
          <h3 class="name">
            {{ item.name }}
          </h3>
          <h4 class="price">${{ item.price }}</h4>
          <div class="quantity">
            <span>{{ item.quantity }}</span>
          </div>
          <div class="line-item-total">{{ item.quantity * item.price }}</div>
        </div>
        <div>
          {{ cart.total }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.payment {
  font-size: 1.6rem;
}
</style>
