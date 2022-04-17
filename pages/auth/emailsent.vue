<script setup>
useMeta({
  title: 'Signup | YRL',
})

const { message, errorMsg } = useAppState()
</script>

<template>
  <div class="h-100vh flex-1 bg-slate-900 flex-row justify-center items-start pt-10">
    <div class="bg-slate-50 p-4 br-3 flex-col items-center gap-2 max-w-60">
      <div class="text-sm flex-col items-center gap-1">
        <h2>All right, one last step:</h2>
        <h2>Verify your email</h2>
      </div>

      <div class="text-sm flex-col items-center gap-1">
        <p class="text-center">
          An email was sent to the address you provided. Click on the link in the eamil to complete your registration.
          Please note, you have 1 hour to complete your registration.
        </p>
        <p class="text-center">Make siute to check your protion tabs and add support@yrlus.com to your whitelist.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
