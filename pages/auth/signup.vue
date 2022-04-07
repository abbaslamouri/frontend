<script setup>
useMeta({
  title: 'Signup | YRL',
})

const { signup } = useAuth()
const { message, errorMsg } = useAppState()
const user = reactive({
  name: '',
  email: '',
  password: '',
})

const register = async () => {
  errorMsg.value = null
  message.value = null
  const response = await signup(user)
  console.log(response)
  if (!response) {
    if (errorMsg.value.includes('Email must be unique.'))
      errorMsg.value += '\nPlease click the link below to reset your password.'
  }
  message.value = response.message + response.url
}
</script>

<template>
  <div class="h-100vh flex-1 bg-slate-900 flex-row justify-center items-start pt-10">
    <form class="bg-slate-50 p-4 br-3 flex-col gap-2" @submit.prevent="register">
      <h2>Complete Registration</h2>
      <div class="bg-red-100 p-2 br-3 text-xs flex-col gap-2" v-if="errorMsg">
        <p>{{ errorMsg }}</p>
        <NuxtLink class="link items-self-end" :to="{ name: 'auth-forgot-password' }">
          <span>Reset Password</span>
          <IconsChevronRight />
        </NuxtLink>
      </div>
      <p class="text-sm">Please fill the form below. Fields marked with * are required.</p>
      <FormsBaseInput v-model="user.name" label="Name" placeholder="name" />
      <FormsBaseInput type="email" v-model="user.email" label="Email" placeholder="Email" />
      <p class="text-xs">
        By clicking on “continue” I have read and agree with Nespresso Privacy Notice & Terms of Service.
      </p>
      <button class="btn btn__primary py-05 px-1 items-self-end">Continue<IconsChevronRight /></button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
