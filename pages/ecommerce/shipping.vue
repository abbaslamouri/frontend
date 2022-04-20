<script setup>
import cloneDeep from 'lodash.clonedeep'

useMeta({
  title: 'Shipping | YRL',
})
definePageMeta({
  layout: 'checkout',
})

const { user, isAuthenticated, updateLoggedInUserData } = useAuth()
const { cart, updateLocalStorage } = useCart()
const { fetchAll, saveDoc } = useHttp()
const { errorMsg } = useAppState()
const router = useRouter()
const showShippingAddressModal = ref(false)
// const addressToEdit = ref({})

const displayStatus = ref('displaying')
const editAction = ref('')
const localAddress = ref({})

const countries = (await fetchAll('countries', { sort: 'countryName' })).docs
const states = (await fetchAll('states', { sort: 'name' })).docs
provide('countries', countries)
provide('states', states)

const selectedAddress = computed(() => cart.value.customer.shippingAddresses.find((a) => a.selected))

// onMounted(async () => {
// cart.value = JSON.parse(localStorage.getItem('cart')) || {}
// localAddress.value = cloneDeep(selectedAddress.value)
// console.log(cart.value)
// })

const saveAddress = () => {
  console.log('ADR', localAddress.value)
  if (
    !localAddress.value.email ||
    !localAddress.value.name ||
    !localAddress.value.addressLine1 ||
    !localAddress.value.city ||
    !localAddress.value.postalCode
  )
    return (errorMsg.value = 'Please add required fields')
  if (editAction.value == 'edit') {
    const i = cart.value.customer.shippingAddresses.findIndex((a) => a.selected)
    console.log(i)
    if (i !== -1) {
      cart.value.customer.shippingAddresses.splice(i, 1, { ...cloneDeep(localAddress.value), selected: true })
      updateLocalStorage()
      localAddress.value = {}
      console.log('ZZZZ', cart.value.customer.shippingAddresses)
    }
    displayStatus.value = 'displaying'
  } else if (editAction.value == 'add') {
    localAddress.value.selected = true
    for (const prop in cart.value.customer.shippingAddresses) {
      cart.value.customer.shippingAddresses[prop].selected = false
    }
    cart.value.customer.shippingAddresses.push({ ...localAddress.value })
    updateLocalStorage()
    displayStatus.value = 'displaying'
  }
  // const { index, value } = payload
  // for (const prop in cart.value.customer.shippingAddresses) {
  //   cart.value.customer.shippingAddresses[prop].default = false
  // }
  // cart.value.customer.shippingAddresses[index].default = value
}

const addAddress = () => {
  localAddress.value = {
    email: 'abbaslamnouri1@yrlus.comdddd',
    title: 'Mr',
    name: 'Abbas Lamouri1',
    company: 'YRL Consulting LLC1',
    addressLine1: '599 Deep Woods Dr.1',
    city: 'Aurora1',
    postalCode: '442021',
    state: states.find((s) => s._id == '624ef322b9e91e20c3e32390'),
    country: countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e'),
    phones: [
      {
        phoneType: 'Home',
        phoneNumber: '21650263781',
        phoneCountryCode: countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e'),
      },
    ],
    deliveryInstructions: 'Some delivery instructions1',
  }
  displayStatus.value = 'editing'
  editAction.value = 'add'
}

const editAddress = () => {
  localAddress.value = cloneDeep(selectedAddress.value)
  displayStatus.value = 'editing'
  editAction.value = 'edit'
}

const cancelAddressUpdate = () => {
  localAddress.value = {}
  displayStatus.value = 'displaying'
}

const setSelectedAddress = (index) => {
  for (const prop in cart.value.customer.shippingAddresses) {
    cart.value.customer.shippingAddresses[prop].selected = false
  }
  cart.value.customer.shippingAddresses[index].selected = true
  updateLocalStorage()
  displayStatus.value = 'displaying'
}

const updateDbOrder = async () => {
  const order = await saveDoc('orders', cart.value)
  console.log('OOOO', order)
  if (order) {
    cart.value._id = order._id
    updateLocalStorage()
  }
}

const continueToPayment = () => {
  cart.value.status = 'shipping'
  updateDbOrder()
  router.push({ name: 'ecommerce-payment' })
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
          <div class="p-2 flex-col gap-1" v-if="displayStatus == 'displaying'">
            <div class="flex-row gap-4 items-center">
              <div class="flex-col gap-05 text-xs">
                <div class="flex-col items-start">
                  <div class="flex-row gap-05">
                    <div v-if="selectedAddress && selectedAddress.title">{{ selectedAddress.title }}.</div>
                    <div>{{ selectedAddress.name }}</div>
                  </div>
                  <div>{{ selectedAddress.company }}</div>
                  <div>{{ selectedAddress.addressLine1 }}</div>
                  <div>{{ selectedAddress.addressLine2 }}</div>
                  <div class="flex-row gap-03">
                    <div>{{ selectedAddress.city }},</div>
                    <div v-if="selectedAddress.state">
                      {{ selectedAddress.state.name }}
                    </div>
                    <div>{{ selectedAddress.postalCode }}</div>
                  </div>
                  <div v-if="selectedAddress.country">{{ selectedAddress.country.countryName }}</div>
                </div>
              </div>
              <!-- <EcommerceCheckoutShippingAddress :address="selectedAddress" /> -->
              <button
                class="btn btn__secondary px-2 py-05 text-xs"
                @click.prevent="displayStatus = 'selecting'"
                v-if="isAuthenticated"
              >
                Switch Address
              </button>
            </div>
            <div class="link text-xs" v-if="isAuthenticated">Currently set as your default delivery address</div>
            <button
              class="btn btn__link px-2 py-05 text-xs items-self-start"
              @click.prevent="editAddress"
              v-if="isAuthenticated"
            >
              Edit Address
            </button>
            <button class="btn btn__secondary px-2 py-1 items-self-end" v-if="isAuthenticated" @click="addAddress">
              Add Address
            </button>
          </div>
          <div class="p-2 flex-col gap-2" v-if="isAuthenticated && displayStatus == 'selecting'">
            <div
              class="flex-row gap-2 items-center justify-between"
              v-for="(address, index) in cart.customer.shippingAddresses"
            >
              <EcommerceCheckoutShippingAddress :class="{ selected: address === selectedAddress }" :address="address" />
              <button
                class="btn btn__secondary px-2 py-1 text-xs"
                v-if="address !== selectedAddress"
                @click="setSelectedAddress(index)"
              >
                Select this Address
              </button>
            </div>
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
                :address="localAddress"
                :showDefaultToggleField="true"
                @updateAddress="localAddress = $event"
              />
            </template>
            <template v-slot:footer>
              <section class="flex-row gap-2 justify-end px-3">
                <button class="btn btn__secondary px-2 py-1" @click="cancelAddressUpdate">Cancel</button>
                <button class="btn btn__primary px-2 py-1" @click="saveAddress">Save Address</button>
              </section>
            </template>
          </Modal>
          <EcommerceCheckoutShippingOptions />
          <div class="flex-row items-end justify-between gap-2 bg-stone-300 px-3 py-1 text-sm">
            <NuxtLink class="link btn__link" :to="{ name: 'ecommerce-checkout' }">
              <IconsChevronLeft /><span>Back to Basket</span>
            </NuxtLink>
            <button class="btn btn__checkout px-2 py-1 items-self-end" @click="continueToPayment">Continue</button>
            <!-- <NuxtLink class="btn btn__checkout px-1 py-05" :to="{ name: 'ecommerce-payment' }">
              <span> continue</span><IconsChevronRight />
            </NuxtLink> -->
          </div>
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
.selected {
  font-weight: 700;
}
</style>
