<script setup>
const { cart, cartTotal } = useCart()
</script>

<template>
  <div class="">
    <div class="intro">Shopping Bag</div>
    <div class="table shipping-shopping-bag">
      <div class="table__header">
        <div class="row">
          <div class="th">Item</div>
          <div class="th">Quantity</div>
          <div class="th">Total</div>
        </div>
      </div>
      <div class="table__body">
        <div class="row" v-for="(item, index) in cart.items" :key="item.product">
          <div class="image-name td">
            <h4 class="name">{{ item.name }}</h4>
          </div>
          <div class="quantity td">{{ item.quantity }}</div>
          <div class="line-item-total td">${{ (item.quantity * item.price).toFixed(2) }}</div>
        </div>
      </div>
    </div>
    <div class="total">
      <div class="cart-subtotal row">
        <span> Subtotal</span><span class="currency">${{ cartTotal().toFixed(2) }}</span>
      </div>
      <div class="cart-taxes row">
        <span> Estimated Taxes</span>
        <span v-if="cart.taxes" class="currency">${{ cart.taxes.toFixed(2) }}</span>
        <span v-else class="currency">$0.00</span>
      </div>
      <div class="cart-total row">
        <span> Total</span>
        <span v-if="cart.taxes" class="currency">${{ (cartTotal() + cart.taxes).toFixed }}</span>
        <span v-else class="currency">${{ cartTotal().toFixed(2) }}</span>
      </div>
    </div>
    <div class="">
      <NuxtLink class="btn btn__checkout flex-1 flex-row justify-center py-1" :to="{ name: 'ecommerce-checkout' }">
        Edit
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.aside {
  background-color: $slate-50;
  width: 320px;
  max-width: 320px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 415px;

  .intro {
    text-align: center;
    font-weight: 700;
    letter-spacing: 0.15rem;
  }

  .table.shipping-shopping-bag {
    border: 1px solid $stone-300;

    .table__header {
      padding: 1rem;
      background-color: $stone-300;
    }
    .table__body {
      padding: 0 1rem;
      .row {
        border: none;
        border-bottom: 1px solid $stone-200;
        padding: 0.75rem 0;

        .name {
          font-weight: 600;
        }

        .line-item-total {
          color: $yellow-700;
          font-size: 1.2rem;
        }
      }
    }
  }

  .total {
    padding: 0 2rem;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .currency {
        color: $yellow-700;
      }
    }
  }
  .footer {
    .btn {
      padding: 1rem 3rem;
      border-radius: 3px;
      background-color: transparent;
      color: $slate-800;
    }
  }
}
</style>
