<script setup>
useMeta({
  title: 'Address | YRL',
})
definePageMeta({
  layout: 'checkout',
})
const { cart, storeShippinAddress, storeCustomerEmail } = useCart()
// const { $fetchAll } = useNuxtApp()
const { fetchAll } = useHttp()
const { errorMsg, message } = useAppState()
const config = useRuntimeConfig()

const router = useRouter()

const countries = (await fetchAll('countries', { sort: 'countryName' })).docs
const states = (await fetchAll('states', { sort: 'name' })).docs
provide('countries', countries)
provide('states', states)

onMounted(() => {
  console.log(cart.value)

  if (!cart.value.shippingAddress.state)
    cart.value.shippingAddress.state = states.find((s) => s._id == '624ef322b9e91e20c3e32390')
  if (!cart.value.shippingAddress.country)
    cart.value.shippingAddress.country = countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e')
  for (const prop in cart.value.shippingAddress.phones) {
    if (!cart.value.shippingAddress.phones[prop].phoneCountryCode)
      cart.value.shippingAddress.phones[prop].phoneCountryCode = countries.find(
        (c) => c._id == '624ef31fb9e91e20c3e3215e'
      )
  }
  if (!cart.value.shippingAddress.phones)
    cart.value.shippingAddress.phones = [
      {
        phoneType: '',
        phoneNumber: '',
        phoneCountryCode: countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e'),
      },
    ]
  if (!cart.value.shippingAddress.addressType) cart.value.shippingAddress.addressType = 'Residential'
  cart.value.shippingAddress.name = cart.value.shippingAddress.name ? cart.value.shippingAddress.name : 'Abbas Lamouri'
  cart.value.email = cart.value.email ? cart.value.email : 'abbaslamouri@yrlus.com'
  cart.value.shippingAddress.addressLine1 = cart.value.shippingAddress.addressLine1
    ? cart.value.shippingAddress.addressLine1
    : '599 Deep Woods Dr.'
  cart.value.shippingAddress.city = cart.value.shippingAddress.city ? cart.value.shippingAddress.city : 'Aurora'
  cart.value.shippingAddress.postalCode = cart.value.shippingAddress.postalCode
    ? cart.value.shippingAddress.postalCode
    : '44202'
})

const updateShippinAddress = async () => {
  storeShippinAddress(cart.value.shippingAddress)
  storeCustomerEmail(cart.value.email)

  router.push({ name: 'ecommerce-shipping' })
}
</script>

<template>
  <div class="secure w-full flex-1 bg-slate-900 flex-col items-center gap-1">
    <div class="content flex-row items-start gap-2 w-996p">
      <EcommerceCheckoutSteps :step="2" activeColor="#16a34a" />
    </div>
    <ClientOnly>
      <div class="w-996p bg-slate-50 p-2 flex-col gap-2" v-if="cart.items">
        <EcommerceCheckoutShippingAddressForm
          :address="cart.shippingAddress"
          :email="cart.email"
          @updateAddress="cart.shippingAddress = $event"
          @updateEmail="cart.email = $event"
        />
        <div class="flex-row items-end justify-between gap-2 px-3 py-1 text-sm">
          <NuxtLink class="link btn__link" :to="{ name: 'ecommerce-checkout' }">
            <IconsChevronLeft /><span>Back to Basket</span>
          </NuxtLink>
          <button class="btn btn__checkout px-2 py-05" @click="updateShippinAddress">
            continue<IconsChevronRight />
          </button>
          <!-- <NuxtLink class="btn btn__checkout px-1 py-05" :to="{ name: 'ecommerce-shipping' }"> -->
          <!-- <span> continue</span><IconsChevronRight /> -->
          <!-- </NuxtLink> -->
        </div>
      </div>
      <div v-else class="flex-1 flex-col gap-2 bg-slate-50 mt-10 p-4 br-3">
        <p>You have no items in your bag</p>
        <NuxtLink class="btn btn__checkout px-2 py-05" :to="{ name: 'ecommerce-products' }">
          <span>Start Shopping</span>
        </NuxtLink>
      </div>
    </ClientOnly>
    -->
  </div>
</template>

<style lang="scss" scoped></style>
