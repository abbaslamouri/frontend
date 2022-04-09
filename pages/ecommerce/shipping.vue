<script setup>
const { cart } = useCart()
const { $fetchAll } = useNuxtApp()

const countries = (await $fetchAll('countries', { sort: 'countryName' })).docs
const states = (await $fetchAll('states', { sort: 'name' })).docs
provide('countries', countries)
provide('states', states)

// onMounted(async () => {
//   console.log(cart.value)
// })

const setDefaultAddress = (payload) => {
  const { index, value } = payload
  for (const prop in cart.value.customer.shippingAddresses) {
    cart.value.customer.shippingAddresses[prop].default = false
  }
  cart.value.customer.shippingAddresses[index].default = value
}
</script>

<template>
  <div class="secure w-full flex-1 bg-slate-900 flex-col items-center gap-1">
    <div class="content flex-row items-start gap-2 w-996p">
      <EcommerceCheckoutSteps :step="2" activeColor="#16a34a" />
    </div>
    <ClientOnly>
      <div class="gap-2 w-996p flex-row justify-center gap-2">
        <div class="main flex-1 bg-slate-50">
          <EcommerceCheckoutShippingAddresses :customer="cart.customer" @setDefaultAddress="setDefaultAddress" />
        </div>
        <div class="aside bg-slate-50 border-pink w-32">Aside</div>
      </div>
    </ClientOnly>
    -->
  </div>
</template>

<style lang="scss" scoped></style>
