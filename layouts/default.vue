<script setup>
const { isAuthenticated } = useAuth()
const { showCartSlideout } = useAppState()
</script>

<template>
  <div class="app">
    <header class="sticky top-0 z-9">
      <EcommerceCheckoutFreeShipping />
      <div class="bg-slate-900 flex-row items-center justify-center py-1">
        <div class="w-996p flex-row items-center justify-between">
          <Branding />
          <div class="flex-row gap-2 items-center">
            <div>
              <AuthLoginDropdown v-if="!isAuthenticated" />
              <AuthProfileDropdown v-else />
            </div>
            <EcommerceCheckoutNavCart />
          </div>
        </div>
      </div>
      <nav class="nav">
        <MainNav />
      </nav>
    </header>
    <main class="border-red">
      <slot />
    </main>
    <footer class="flex-row items-center justify-center p-2 bg-slate-900 text-slate-50"><Footer /></footer>
    <EcommerceCheckoutCart v-if="showCartSlideout" />
  </div>
</template>

<style lang="scss" scoped></style>
