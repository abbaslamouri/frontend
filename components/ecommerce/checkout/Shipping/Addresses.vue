<script setup>
import cloneDeep from 'lodash.clonedeep'

const emit = defineEmits(['setDefaultAddress', 'updatesCustomer'])

const { cart } = useCart()
const { errorMsg } = useAppState()
const countries = inject('countries')
const states = inject('states')
const showAddressForm = ref(false)
const addressToEdit = ref({})
// const selectedAddress = ref({})
// const selectedAddressIndex = ref(null)
const displayStatus = ref('displaying')
const editAction = ref('')
const localAddresses = ref(cloneDeep(cart.value.customer.shippingAddresses))
// const cart.customer = ref(cloneDeep(props.customer))
// const currentCustomer = JSON.stringify(cart.value.customer)

const selectedAddress = computed(
  () =>
    localAddresses.value.find((a) => a.selected === true) ||
    localAddresses.value.find((a) => a.isDefault === true) ||
    {}
)

const getCountryName = (countryCode) => {
  console.log(countryCode)
  const country = countries.find((c) => c.threeLetterCountryCod === countryCode)
  return country ? country.countryName : ''
}

const addAddress = () => {
  console.log(localAddresses.value.length)
  if (localAddresses.value.length > 4) return (errorMsg.value = '5 addresses maxumum')
  // localAddresses.value.push({
  // title: 'ddfsfdsfsdfds',
  // name: '',
  // company: '',
  // addressLine1: '',
  // addressLine2: '',
  // city: '',
  // state: states.find((s) => s._id == '624ef322b9e91e20c3e32390'),
  // postalCode: '',
  // country: countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e'),
  // addressType: 'Residential',
  // deliveryInstructions: '',
  // phones: [
  //   {
  //     phoneType: '',
  //     phoneNumber: '',
  //     phoneCountryCode: countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e'),
  //   },
  // ],
  // })

  // if (localAddresses.value.length === 1) {
  // localAddresses.value[0].isDefault = true
  // localAddresses.value[0].selected = true
  // selectedAddressIndex.value = 0
  // selectedAddress.value = localAddresses.value[0]
  // }
  // addressToEdit.value = localAddresses.value[localAddresses.value.length - 1]
  addressToEdit.value = {}
  editAction.value = 'adding'
  displayStatus.value = 'editing'
}

// const addPhoneNumber = () => {
//   if (cart.value.customer.phones.length >= 4)
//     return (appMessage.errorMsg = 'You cannot enter more tghan 4 phone number')
//   cart.value.customer.phones.push({
//     phoneType: '',
//     phoneNumber: '',
//     phoneCountryCode: '1',
//   })
// }

// const cancelCustomerUpdate = (i) => {
//   cart.value.customer = JSON.parse(currentCustomer)
//   showAddressFormKeys.value[i] = false
// }

const setSelectedAddress = (index) => {
  for (const prop in localAddresses.value) {
    localAddresses.value[prop].selected = false
  }
  localAddresses.value[index].selected = true
  displayStatus.value = 'displaying'
}

const setAddressToEdit = () => {
  addressToEdit.value = selectedAddress.value
  editAction.value = 'editing'
  displayStatus.value = 'editing'
}

const updateAddress = (payload) => {
  console.log(payload)
  const { address, email } = payload
  if (editAction.value === 'adding') {
    if (Object.values(address).length) {
      localAddresses.value.push(address)
      if (localAddresses.value.length === 1) localAddresses.value[0].isDefault = true
      if (localAddresses.value.length === 1) localAddresses.value[0].selected = true
    }
  } else {
    const index = localAddresses.value.findIndex((a) => a.selected === true)
    if (index !== -1) {
      // if (!Object.values(address).length) localAddresses.value.splice(index, 1)
      localAddresses.value.splice(index, 1, address)
    }
  }
  // selectedAddress.value = address
  // emit('updatesCustomer', cart.value.customer)
  cart.value.customer.shippingAddresses = localAddresses.value
  if (email && !cart.value.customer.email) cart.value.customer.email = email

  console.log(cart.value.customer)
  addressToEdit.value = {}
  displayStatus.value = 'displaying'
}
</script>

<template>
  <div class="flex-col">
    <div class="bg-stone-400 p-1 text-slate-50">Shipping Address</div>
    <!-- <pre class="text-xs">{{ localAddresses }}====={{ selectedAddress }}</pre> -->
    <div class="flex-col gap-2 p-2 text-xs" v-if="displayStatus === 'displaying'">
      <div class="flex-row gap-3">
        <EcommerceCheckoutShippingAddress
          v-if="Object.values(selectedAddress).length"
          :address="selectedAddress"
          @editAddress="setAddressToEdit"
        />
        <button
          v-if="localAddresses.length > 1"
          class="btn btn__secondary px-2 py-05 text-xs items-self-center"
          @click.prevent="displayStatus = 'selecting'"
        >
          Switch Address
        </button>
      </div>

      <button class="btn btn__secondary px-2 py-1 items-self-end" @click="addAddress">Add Address</button>
    </div>

    <EcommerceCheckoutShippingAddressList
      :addresses="localAddresses"
      @setSelectedAddress="setSelectedAddress"
      v-if="displayStatus === 'selecting'"
    />

    <EcommerceCheckoutShippingAddressForm
      v-if="displayStatus === 'editing'"
      :shippingAddress="addressToEdit"
      @updateAddress="updateAddress"
    />
  </div>
</template>

<style lang="scss" scoped></style>
