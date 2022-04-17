<script setup>
useMeta({
  title: 'Secure | YRL',
})
definePageMeta({
  layout: 'checkout',
})
// import { useAuth } from '~/store/useAuth'
// import { useCart } from '~/store/useCart'
// import { useMessage } from '~/store/useMessage'

// const router = useRouter()

// const auth = useAuth()
const { cart } = useCart()
onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem('cart')) || {}

  console.log(cart.value)
})
// const appMessage = useMessage()

const user = reactive({
  email: 'lamouri@genvac.com',
  password: 'adrar0714',
})

const signin = async () => {
  // appMessage.errorMsg = null
  // appMessage.successMsg = null
  // try {
  // 	let response = await $fetch('/api/v1/auth/login', {
  // 		method: 'POST',
  // 		body: user,
  // 	})
  // 	auth.user = response.user
  // 	auth.token = response.token
  // 	appMessage.showCartSlideout = false
  // 	// if (auth.authenticated) {
  // 	appMessage.errorMsg = null
  // 	// try {
  // 	response = await $fetch('/api/v1/users', { params: { id: auth.user._id } })
  // 	cart.updateCartCustomer(response)
  // 	router.push({ name: 'checkout' })
  // } catch (error) {
  // 	appMessage.errorMsg = error.data
  // }
  // // router.push({ name: 'checkout' })
}
</script>

<template>
  <div class="secure w-full flex-1 bg-slate-900 flex-row justify-center">
    <div class="content flex-row items-start gap-2 w-996p">
      <div class="flex-1 bg-slate-50 h-35 mt-6">
        <h3>I am a Returning Customer</h3>
        <form @submit.prevent="handleLogin" class="main p-2 flex-col items-center gap-2">
          <div class="w-full">
            <FormsBaseInput type="email" label="Email" v-model="user.email" :required="true" />
          </div>
          <div class="w-full">
            <FormsBaseInput type="password" label="Password" v-model="user.password" :required="true" />
          </div>

          <button class="btn btn__primary items-self-end px-2 py-1" @click="signin">
            Sign In <IconsChevronRight />
          </button>
          <NuxtLink class="link items-self-start" :to="{ name: `index` }">Forgot Password?</NuxtLink>
        </form>
      </div>
      <div class="flex-1 bg-slate-50 h-35 mt-6">
        <h3>I am a New Customer</h3>
        <div class="main p-2 flex-col items-center gap-1">
          <h4 class="text-center">Create a YRL account</h4>
          <p class="text-center">and receive these great benefits</p>
          <div class="promos flex-row justify-evenly my-4 w-full">
            <div class="promo">
              <IconsWelcomeGift />
              <p>Welcome</p>
              <p>Gift</p>
            </div>
            <div class="promo">
              <IconsFirstClass />
              <p>Early Coffee</p>
              <p>Access</p>
            </div>
            <div class="promo">
              <IconsShoppingBag />
              <p>Exclusive</p>
              <p>Promotions</p>
            </div>
            <div class="promo">
              <IconsShoppingCartCheckout />
              <p>Express</p>
              <p>Checkout</p>
            </div>
          </div>
          <div class="actions flex-row gap-2">
            <NuxtLink class="btn btn__checkout text-xs px-2 py-1" :to="{ name: 'auth-signup' }">
              <span>Create an Accoun</span>
            </NuxtLink>
            <NuxtLink class="link" :to="{ name: 'ecommerce-address' }">
              <span>Checkout as a guest</span>
              <IconsChevronRight />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
.secure {
  h3 {
    background-color: $stone-200;
    padding: 1rem 2rem;
    text-transform: uppercase;
    font-size: 1.4rem;
    letter-spacing: 0.1rem;
  }

  .promo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    font-size: 1.4rem;

    p {
      font-weight: bold;
    }
  }
}
</style>
