<script setup>
useMeta({
  title: 'Signup | YRL',
})

const router = useRouter()
const { signup } = useAuth()
const { errorMsg } = useAppState()
const user = reactive({
  name: 'Abbas Lamouri',
  email: 'abbaslamouri@yrlus.com',
})

const register = async () => {
  // errorMsg.value = null
  // message.value = null
  // if (user.password !== user.passwordConfirm)
  // return (errorMsg.value = "Your password and confirmation password don't match")
  const response = await signup(user)
  console.log(response)
  if (!response)
    // if (errorMsg.value.includes('Email must be unique.'))
    return (errorMsg.value += ' Please login or click the link below to reset your password.')

  // message.value = `Email sent to ${user.email}.  Please follow the link in your email to complete your registration.  Submit a PATCH request with email and password to  ${url} to complete the registration`,
  // // url,

  router.push({ name: 'auth-emailsent' })
}
</script>

<template>
  <div class="h-100vh flex-1 bg-slate-900 flex-row justify-center items-start pt-10">
    <div class="bg-slate-50 p-4 br-3 flex-row gap-2 w-996p">
      <div class="flex-col gap-1 min-w-30">
        <h2>Ready to try YRL</h2>
        <div class="flex-row items-center gap-1">
          <IconsCheck class="w-2 h-2 bg-slate-400 br-50per p-02 fill-slate-50" />Forever free
        </div>
        <div class="flex-row items-center gap-1">
          <IconsCheck class="w-2 h-2 bg-slate-400 br-50per p-02 fill-slate-50" />No Credit card required
        </div>
      </div>
      <form class="flex-col gap-1" @submit.prevent="register">
        <div class="bg-red-100 p-2 br-3 text-xs flex-col gap-1" v-if="errorMsg">
          <p>{{ errorMsg }}</p>
          <NuxtLink class="link items-self-end" :to="{ name: 'auth-forgotpassword' }">
            <span>Reset Password</span>
            <IconsChevronRight />
          </NuxtLink>
        </div>
        <p class="text-sm">Fields marked with * are required.</p>
        <FormsBaseInput v-model="user.name" label="Name" placeholder="name" />
        <FormsBaseInput type="email" v-model="user.email" label="Email" placeholder="Email" />
        <p class="text-xs">
          By clicking on “continue” you acknowledge that you have read and agree with YRL Privacy Notice & Terms of
          Service.
        </p>
        <button class="btn btn__primary py-05 px-1 items-self-end">Continue<IconsChevronRight /></button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
