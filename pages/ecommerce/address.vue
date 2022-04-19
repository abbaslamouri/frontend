<script setup>
useMeta({
  title: 'Address | YRL',
})
definePageMeta({
  layout: 'checkout',
})
const { cart, updateShippinAddress, updateCustomerEmail, updateLocalStorage } = useCart()

const { user, isAuthenticated, updateLoggedInUserData } = useAuth()
const { fetchAll } = useHttp()
// const { errorMsg, message } = useAppState()
// const config = useRuntimeConfig()

const router = useRouter()

const countries = (await fetchAll('countries', { sort: 'countryName' })).docs
const states = (await fetchAll('states', { sort: 'name' })).docs
provide('countries', countries)
provide('states', states)

const address = reactive({
  email: 'abbaslamnouri@yrlus.com',
  title: 'Mr',
  name: 'Abbas Lamouri',
  company: 'YRL Consulting LLC',
  addressLine1: '599 Deep Woods Dr.',
  city: 'Aurora',
  postalCode: '44202',
  state: states.find((s) => s._id == '624ef322b9e91e20c3e32390'),
  country: countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e'),
  phones: [
    {
      phoneType: 'Cell',
      phoneNumber: '2165026378',
      phoneCountryCode: countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e'),
    },
  ],
  deliveryInstructions: 'Some delivery instructions',
})

onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem('cart')) || {}
  console.log(cart.value)
})

const continueToShipping = async () => {
  cart.value.customer.shippingAddresses = [{ ...address, selected: true, isDefault: true }]
  console.log(cart.value)
  updateLocalStorage()

  if (isAuthenticated) {
    const response = await updateLoggedInUserData({
      shippingAddresses: cart.value.customer.shippingAddresses,
    })
    console.log('RRRRRR', response)
  }
  router.push({ name: 'ecommerce-shipping' })
}
</script>

<template>
  <div class="secure w-full flex-1 bg-slate-900 flex-col items-center gap-1">
    <div class="content flex-row items-start gap-2 w-996p">
      <EcommerceCheckoutSteps :step="2" activeColor="#16a34a" />
    </div>
    <ClientOnly>
      <div class="w-996p bg-slate-50 p-2 flex-col gap-2" v-if="cart.items && cart.items.length">
        <EcommerceCheckoutShippingAddressForm :address="address" @updateAddress="cart.shippingAddress = $event" />
        <div class="flex-row items-end justify-between gap-2 px-3 py-1 text-sm">
          <NuxtLink class="link btn__link" :to="{ name: 'ecommerce-checkout' }">
            <IconsChevronLeft /><span>Back to Basket</span>
          </NuxtLink>
          <button class="btn btn__checkout px-2 py-05" @click="continueToShipping">
            continue<IconsChevronRight />
          </button>
          <!-- <NuxtLink class="btn btn__checkout px-1 py-05" :to="{ name: 'ecommerce-shipping' }"> -->
          <!-- <span> continue</span><IconsChevronRight /> -->
          <!-- </NuxtLink> -->
        </div>
      </div>
      <div v-else class="flex-1 flex-col gap-2 bg-slate-50 mt-10 p-4 br-3">
        <p>You have no items in your bag</p>
        <NuxtLink class="btn btn__checkout px-2 py-05" :to="{ name: 'ecommerce-coffee' }">
          <span>Start Shopping</span>
        </NuxtLink>
      </div>
    </ClientOnly>
    -->
  </div>
</template>

<style lang="scss" scoped></style>
