<script setup>
useMeta({
  title: 'Secure | YRL',
})
definePageMeta({
  layout: 'checkout',
})

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()

const { user, token, isAuthenticated, signin } = useAuth()
const { errorMsg, message } = useAppState()
const { cart, updateLocalStorage } = useCart()
const { fetchAll, saveDoc } = useHttp()

// import { useAuth } from '~/store/useAuth'
// import { useCart } from '~/store/useCart'
// import { useMessage } from '~/store/useMessage'

// const router = useRouter()

// const auth = useAuth()
// const { cart } = useCart()
// onMounted(() => {
// cart.value = JSON.parse(localStorage.getItem('cart')) || {}

// console.log(cart.value)
// })
// const appMessage = useMessage()

const formUser = reactive({
  email: 'abbaslamouri@yrlus.com',
  password: 'adrar0714',
})

const updateDbOrder = async () => {
  const order = await saveDoc('orders', cart.value)
  console.log('OOOO', order)
  if (order) {
    cart.value._id = order._id
    updateLocalStorage()
  }
}

const login = async () => {
  const data = await signin(formUser)
  console.log(data)
  if (data) {
    const auth = useCookie('auth', {
      expires: new Date(Date.now() + config.COOKIE_EXPIRES_IN * 24 * 3600 * 1000),
      path: '/',
    })
    auth.value = data.auth
    user.value = data.auth.user
    token.value = data.auth.token
    isAuthenticated.value = true
    cart.value.customer = data.auth.user
    if (!cart.value.customer.shippingAddresses.length) {
      cart.value.status = 'address'
      updateDbOrder()
      router.push({ name: 'ecommerce-address' })
    } else {
      cart.value.status = 'shipping'
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
  <div class="w-full flex-1 bg-slate-900 flex-row justify-center">
    <div class="content flex-row items-start gap-2 w-996p">
      <div class="flex-1 bg-slate-50 h-35 mt-6">
        <h3 class="bg-stone-200 px-2 py-1 uppercase tracking-wide text-sm">I am a Returning Customer</h3>
        <form @submit.prevent="handleLogin" class="main p-2 flex-col items-center gap-2">
          <div class="w-full">
            <FormsBaseInput type="email" label="Email" v-model="formUser.email" :required="true" />
          </div>
          <div class="w-full">
            <FormsBaseInput type="password" label="Password" v-model="formUser.password" :required="true" />
          </div>

          <button class="btn btn__primary items-self-end px-2 py-1" @click="login">
            Sign In <IconsChevronRight />
          </button>
          <NuxtLink class="link items-self-start" :to="{ name: `index` }">Forgot Password?</NuxtLink>
        </form>
      </div>
      <div class="flex-1 bg-slate-50 h-35 mt-6">
        <h3 class="bg-stone-200 px-2 py-1 uppercase tracking-wide text-sm">I am a New Customer</h3>
        <div class="main p-2 flex-col items-center gap-1">
          <h4 class="text-center">Create a YRL account</h4>
          <p class="text-center">and receive these great benefits</p>
          <div class="promos flex-row justify-evenly my-4 w-full">
            <div class="flex-col justify-center items-center font-bold text-sm">
              <IconsWelcomeGift />
              <p>Welcome</p>
              <p>Gift</p>
            </div>
            <div class="flex-col justify-center items-center font-bold text-sm">
              <IconsFirstClass />
              <p>Early Coffee</p>
              <p>Access</p>
            </div>
            <div class="flex-col justify-center items-center font-bold text-sm">
              <IconsShoppingBag />
              <p>Exclusive</p>
              <p>Promotions</p>
            </div>
            <div class="flex-col justify-center items-center font-bold text-sm">
              <IconsShoppingCartCheckout />
              <p>Express</p>
              <p>Checkout</p>
            </div>
          </div>
          <div class="actions flex-row gap-2">
            <NuxtLink class="btn btn__checkout text-xs px-2 py-1" :to="{ name: 'auth-signup' }">
              <span>Create an Accoun</span>
            </NuxtLink>
            <!-- <button class="btn btn__link items-self-end px-2 py-1" @click="guestCheckout">
              Checkout as a guest <IconsChevronRight class="fill-yellow-700" />
            </button> -->
            <NuxtLink class="link" :to="{ name: 'ecommerce-address' }">
              <span>Checkout as a guest</span>
              <IconsChevronRight class="fill-yellow-700" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
