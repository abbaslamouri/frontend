<script setup>
import cloneDeep from 'lodash.clonedeep'

useMeta({
  title: 'Shipping | YRL',
})
definePageMeta({
  layout: 'checkout',
})

const { user, isAuthenticated, updateLoggedInUserData } = useAuth()
const { cart } = useCart()
const { fetchAll } = useHttp()
const showShippingAddressModal = ref(false)
const addressToEdit = ref({})

const displayStatus = ref('displaying')
const editAction = ref('')
const localAddress = ref('')

const countries = (await fetchAll('countries', { sort: 'countryName' })).docs
const states = (await fetchAll('states', { sort: 'name' })).docs
provide('countries', countries)
provide('states', states)

onMounted(async () => {
  cart.value = JSON.parse(localStorage.getItem('cart')) || {}
  localAddress.value = ref(cloneDeep(cart.value.shippingAddress))

  console.log(cart.value)
})

const setDefauAddress = (payload) => {
  const { index, value } = payload
  for (const prop in cart.value.customer.shippingAddresses) {
    cart.value.customer.shippingAddresses[prop].default = false
  }
  cart.value.customer.shippingAddresses[index].default = value
}

const addAddress = () => {
  addressToEdit.value = {}
  if (!addressToEdit.value.state) addressToEdit.value.state = states.find((s) => s._id == '624ef322b9e91e20c3e32390')
  if (!addressToEdit.value.country)
    addressToEdit.value.country = countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e')
  for (const prop in addressToEdit.value.phones) {
    if (!addressToEdit.value.phones[prop].phoneCountryCode)
      addressToEdit.value.phones[prop].phoneCountryCode = countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e')
  }
  if (!addressToEdit.value.phones)
    addressToEdit.value.phones = [
      {
        phoneType: '',
        phoneNumber: '',
        phoneCountryCode: countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e'),
      },
    ]
  if (!addressToEdit.value.addressType) addressToEdit.value.addressType = 'Residential'
  addressToEdit.value.name = addressToEdit.value.name ? addressToEdit.value.name : 'Abbas Lamourix'
  addressToEdit.value.email = addressToEdit.value.email ? addressToEdit.value.email : 'abbaslamouri@yrlus.comx'
  addressToEdit.value.addressLine1 = addressToEdit.value.addressLine1
    ? addressToEdit.value.addressLine1
    : '599 Deep Woods Dr.x'
  addressToEdit.value.city = addressToEdit.value.city ? addressToEdit.value.city : 'Aurora'
  addressToEdit.value.postalCode = addressToEdit.value.postalCode ? addressToEdit.value.postalCode : '44202x'
  displayStatus.value = 'editing'
}

const editAddress = () => {
  addressToEdit.value = cart.value.shippingAddress
  displayStatus.value = 'editing'
}

const cancelAddressUpdate = () => {
  cart.value.shippingAddress = localAddress.value
  displayStatus.value = 'displaying'
}
</script>

<template>
  <div class="secure w-full flex-1 bg-slate-900 flex-col items-center gap-1">
    <div class="content flex-row items-start gap-2 w-996p">
      <EcommerceCheckoutSteps :step="3" activeColor="#16a34a" />
    </div>
    <ClientOnly>
      <div class="gap-2 w-996p flex-row justify-center gap-2" v-if="cart.items && cart.items.length">
        <div class="main flex-1 bg-slate-50">
          <div class="bg-stone-400 p-1 text-slate-50">Shipping Address</div>
          <div class="p-2 flex-col gap-1">
            <div class="text-xs">{{ cart.email }}</div>
            <EcommerceCheckoutShippingAddress :address="cart.shippingAddress" />
            <div class="link text-xs" v-if="isAuthenticated">Currently set as your default delivery address</div>
            <button class="btn btn__link px-2 py-05 text-xs items-self-start" @click.prevent="editAddress()">
              Edit Address
            </button>
            <button class="btn btn__secondary px-2 py-1 items-self-end" v-if="isAuthenticated" @click="addAddress()">
              Add Address
            </button>
          </div>
          <Modal
            :outerBoxWidth="75"
            :outerBoxHeight="100"
            @closeModal="cancelAddressUpdate"
            v-if="displayStatus === 'editing'"
          >
            <template v-slot:header>
              <h3>Selected Shipping Address</h3>
            </template>
            <template v-slot:default>
              <EcommerceCheckoutShippingAddressForm
                :address="addressToEdit"
                :email="cart.email"
                :showDefaultToggleField="true"
                @updateAddress="cart.shippingAddress = $event"
                @updateEmail="cart.email = $event"
              />
            </template>
            <template v-slot:footer>
              <section class="flex-row gap-2 justify-end px-3">
                <button class="btn btn__secondary px-2 py-1" @click="cancelAddressUpdate">Cancel</button>
                <button class="btn btn__primary px-2 py-1" @click="displayStatus = 'displaying'">Save Address</button>
              </section>
            </template>
          </Modal>
          <!-- <EcommerceCheckoutShippingAddresses :customer="cart.customer" @setDefaultAddress="setDefaultAddress" /> -->

          <EcommerceCheckoutShippingOptions />

          <div class="flex-row items-end justify-between gap-2 bg-stone-300 px-3 py-1 text-sm">
            <NuxtLink class="link btn__link" :to="{ name: 'ecommerce-checkout' }">
              <IconsChevronLeft /><span>Back to Basket</span>
            </NuxtLink>
            <NuxtLink class="btn btn__checkout px-1 py-05" :to="{ name: 'ecommerce-payment' }">
              <span> continue</span><IconsChevronRight />
            </NuxtLink>
          </div>
        </div>
        <div class="aside bg-slate-50 w-32">
          <EcommerceCheckoutShippingCartOverview />
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
