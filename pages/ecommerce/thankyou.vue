<script setup>
useMeta({ title: 'Thank you | YRL' })
definePageMeta({ layout: 'checkout' })

const route = useRoute()
console.log(route.query)
const { cart, updateLocalStorage } = useCart()
const { fetchDoc } = useHttp()
const order = await fetchDoc('orders', route.query.orderId)
console.log(order)

onMounted(async () => {
  cart.value = {}
  localStorage.removeItem('cart')
})
</script>

<template>
  <div class="p-4 flex-row gap-4">
    <ClientOnly>
      <div class="flex-col gap-2 min-w-40">
        <h3 class="uppercase">Order Confirmation</h3>
        <div class="uppercase font-bold text-sm">Than you for your order</div>
        <div class="flex-col gap-1">
          <p>Your package will be delivered to:</p>
          <EcommerceCheckoutShippingAddress :address="order.shippingAddress" />
        </div>
        <div class="text-sm">
          <h3>Delivery Details:</h3>
          <p>Delivery mode:&nbsp;<span class="font-bold">Standard-Free (from $35)</span></p>
        </div>
        <NuxtLink class="link btn__link" :to="{ name: 'index' }"
          ><span>Track Order</span><IconsChevronRight />
        </NuxtLink>
        <NuxtLink class="btn__checkout gap-1 px-2 py-1 items-self-start flex-row items-center" :to="{ name: 'index' }"
          ><IconsChevronLeft /><span>Back To Home</span>
        </NuxtLink>
        <!-- <button class="btn btn__checkout gap-1 px-2 py-1 items-self-start" @click="continueToPayment">
          <IconsChevronLeft />Back To Home
        </button> -->
      </div>
      <div class="flex-1">
        <img class="w-full h-full contain" src="/assets/hp-shop-machines-jan3.jpeg" alt="" />
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped></style>
