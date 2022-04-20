<script setup>
const { showCartSlideout } = useAppState()
const router = useRouter()

const startShopping = async () => {
  showCartSlideout.value = false
  router.push({ name: 'ecommerce-coffee' })
}
</script>

<template>
  <div class="empty-cart flex-col gap-2 justify-center items-center p-4">
    <p>You have no items in your bag</p>
    <button class="btn btn__checkout px-3 py-1" @click="startShopping">Start Shopping</button>
  </div>
</template>

<style lang="scss" scoped></style>
