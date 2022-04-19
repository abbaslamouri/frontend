<script setup>
const route = useRoute()
const { cart } = useCart()

const quantitySelectors = ref([])

const resetQuantitySelectors = () => {
  for (const prop in cart.value.items) {
    quantitySelectors.value[prop] = false
  }
}

const toggleQuantitySelectors = (status, index) => {
  resetQuantitySelectors()
  quantitySelectors.value[index] = status
  // updateItemQuantity(cart.value.items[index], event.quantity)
}

// const handleCheckout = async () => {
//   if (auth.authenticated) {
//     // console.log(auth.user)
//     // cart.updateCustomerInfo(auth.user)
//     await cart.saveCart()
//     router.push({ name: 'shipping' })
//   } else {
//     router.push('/secure?redirect=/shipping')
//   }
// }

const removeItem = (item) => {
  // updateItemQuantity(item, 0)
}
</script>

<template>
  <div>
    <table class="collapses text-sm">
      <thead class="bg-stone-200">
        <tr>
          <th>Item</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart.items" :key="item.product._id">
          <td>
            <div class="flex-row gap-2 items-center">
              <div class="w-4 h-4" v-if="item.product && item.product.gallery && item.product.gallery[0]">
                <img
                  class="w-full h-full contain"
                  :src="item.product.gallery[0].path || '/placeholder.png'"
                  :alt="` ${item.product.name} Photo`"
                />
              </div>
              <h4 class="">{{ item.product.name }}</h4>
            </div>
          </td>
          <td class="text-yellow-700">${{ item.product.price.toFixed(2) }}</td>
          <td>
            <div class="flex-row justify-center">
              <EcommerceQuantitySelector
                class="cart"
                :product="item.product"
                :minVal="0"
                :maxVal="140"
                :stepVal="10"
                :showQuantitySelector="quantitySelectors[index]"
                :btnText="item.quantity"
                @toggleQuantitySelectors="toggleQuantitySelectors($event, index)"
                @cancel="resetQuantitySelectors"
              />
            </div>
          </td>
          <td class="text-yellow-700">${{ (item.quantity * item.product.price).toFixed(2) }}</td>
          <td>
            <button class="btn btn__close" @click="removeItem(item)">
              <IconsClose class="w-2 h-2 fill-slate-400" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

td {
  padding: 2rem;
  border-bottom: 1px solid $stone-300;
}
</style>
