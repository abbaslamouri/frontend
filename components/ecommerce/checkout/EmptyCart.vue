<script setup>
// import { useMessage } from '~/store/useMessage'
// const {appMessage = useMessage()
</script>

<template>
  <div class="empty-cart flex-col gap-2 justify-center items-center p-4">
    <p>You have no items in your bag</p>
    <NuxtLink class="btn btn__checkout py-1 px-3 text-sm" :to="{ name: 'ecommerce-coffee' }">
      <span>Start Shopping</span>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped></style>
