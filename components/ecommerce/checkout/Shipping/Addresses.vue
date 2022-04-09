<script setup>
import cloneDeep from 'lodash.clonedeep'

const emit = defineEmits(['setDefaultAddress', 'updatesCustomer'])

const { cart } = useCart()
const countries = inject('countries')
const states = inject('states')
const showAddressForm = ref(false)
const selectedAddress = ref({})
const selectedAddressIndex = ref(null)
const displayStatus = ref('displaying')
const localAddresses = ref(cloneDeep(cart.value.customer.shippingAddresses))
// const cart.customer = ref(cloneDeep(props.customer))
// const currentCustomer = JSON.stringify(cart.value.customer)

const index = localAddresses.value.findIndex((a) => a.isDefault === true)
if (index !== -1) {
  selectedAddress.value = localAddresses.value[index]
  selectedAddressIndex.value = index
} else {
  selectedAddress.value = {}
}
const getCountryName = (countryCode) => {
  console.log(countryCode)
  const country = countries.find((c) => c.threeLetterCountryCod === countryCode)
  return country ? country.countryName : ''
}

const addAddress = () => {
  localAddresses.value.push({
    // title: 'ddfsfdsfsdfds',
    // name: '',
    // company: '',
    // addressLine1: '',
    // addressLine2: '',
    // city: '',
    state: states.find((s) => s._id == '624ef322b9e91e20c3e32390'),
    // postalCode: '',
    country: countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e'),
    addressType: 'Residential',
    // deliveryInstructions: '',
    phones: [
      {
        // phoneType: '',
        // phoneNumber: '',
        phoneCountryCode: countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e'),
      },
    ],
  })

  if (localAddresses.value.length === 1) {
    localAddresses.value.isDefault = true
    // localAddresses.value.selected = true
    selectedAddressIndex.value = 0
    selectedAddress.value = localAddresses.value[0]
  }
  // addressToEdit.value = localAddresses.value[localAddresses.value.length - 1]
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

const updateAddress = (address) => {
  console.log(address)
  console.log(selectedAddressIndex.value)
  selectedAddress.value = address
  displayStatus.value = 'displaying'
  // emit('updatesCustomer', cart.value.customer)
}
</script>

<template>
  <div class="flex-col">
    <div class="bg-stone-300 p-1">Shipping Address</div>
    <pre class="text-xs">{{ localAddresses }}=====</pre>
    <div class="flex-col gap-2 p-2 text-xs">
      <EcommerceCheckoutShippingAddress
        v-if="Object.values(selectedAddress).length"
        :address="selectedAddress"
        @updateDisplayStatus="displayStatus = $event"
      />
      <button class="btn btn__secondary px-2 py-1 items-self-end" @click="addAddress">Add Address</button>
    </div>
    <EcommerceCheckoutShippingAddressForm
      v-if="displayStatus === 'editing'"
      :shippingAddress="selectedAddress"
      @updateAddress="updateAddress"
    />
  </div>
</template>

<style lang="scss" scoped></style>
