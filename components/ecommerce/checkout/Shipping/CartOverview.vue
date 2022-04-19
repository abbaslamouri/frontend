<script setup>
const { cart, cartTotal } = useCart()
</script>

<template>
  <div class="flex-col">
    <div class="flex-row justify-center p-2 text-lg">Shopping Bag</div>
    <table class="collapse text-sm flex-1">
      <thead class="bg-stone-300 text-xs">
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="" v-for="(item, index) in cart.items" :key="item.product._id">
          <td>
            <h4>{{ item.product.name }}</h4>
          </td>
          <td>{{ item.quantity }}</td>
          <td class="text-yellow-700">${{ (item.quantity * item.product.price).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="border border-t-slate-300 p-2 text-xs flex-col gap-1">
      <div class="flex-row justify-between">
        <span> Subtotal</span><span class="text-yellow-700">${{ cartTotal().toFixed(2) }}</span>
      </div>
      <div class="flex-row justify-between">
        <span> Estimated Taxes</span>
        <span v-if="cart.taxes" class="currency">${{ cart.taxes.toFixed(2) }}</span>
        <span v-else class="text-yellow-700">$0.00</span>
      </div>
      <div class="flex-row justify-between">
        <span> Total</span>
        <span v-if="cart.taxes" class="text-yellow-700">${{ (cartTotal() + cart.taxes).toFixed }}</span>
        <span v-else class="text-yellow-700">${{ cartTotal().toFixed(2) }}</span>
      </div>
    </div>
    <div class="p-2">
      <NuxtLink class="btn btn__checkout flex-1 flex-row justify-center py-1" :to="{ name: 'ecommerce-checkout' }">
        Edit
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

th {
  // border: 1px solid red;
  text-align: left;
  padding: 1rem;
}
td {
  font-size: 1.2rem;
  padding: 1rem;
  border-bottom: 1px solid $stone-200;
}
</style>
