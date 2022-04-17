<script setup>
const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const { user, token, isAuthenticated, finishSignup } = useAuth()
const { errorMsg, message } = useAppState()
const formUser = reactive({
  email: '',
  password: '',
  passwordConfirm: 'adrar0714',
})

const completeSignup = async () => {
  errorMsg.value = null
  message.value = null
  if (formUser.password !== formUser.passwordConfirm)
    return (errorMsg.value = "Your password and confirmation password don't match")
  const data = await finishSignup(formUser, route.query.token)
  console.log(data)
  if (!data) return (errorMsg.value = 'signin failed, please try again later')
  const auth = useCookie('auth', {
    expires: new Date(Date.now() + config.COOKIE_EXPIRES_IN * 24 * 3600 * 1000),
    path: '/',
  })
  auth.value = data.auth
  user.value = data.user
  token.value = data.token
  isAuthenticated.value = true
  router.push({ name: 'ecommerce-coffee' })
  message.value = 'Registration successfull.  You are now logged in.'
}

const getNewToken = async () => {
  router.push({ name: 'auth-forgotpassword' })
  showAuthForm.value = false
}
</script>

<template>
  <main class="flex-1 bg-slate-900 flex-row justify-center items-start pt-10">
    <form class="bg-slate-50 p-4 br-3 flex-col gap-2 min-w-40" @submit.prevent="completeSignup">
      <h2>Activate your account</h2>
      <div class="bg-red-100 p-2 br-3 text-xs flex-col gap-2" v-if="errorMsg">
        <p>{{ errorMsg }}</p>
        <button
          class="btn btn__primary py-05 px-2 text-xs"
          @click.prevent="getNewToken"
          v-if="errorMsg.includes('token')"
        >
          <p>Click Here to get a new token</p>
        </button>
      </div>
      <FormsBaseInput type="email" label="Email" placeholder="Email" v-model="formUser.email" :required="true" />
      <FormsBaseInput
        type="password"
        label="Password"
        placeholder="Password"
        v-model="formUser.password"
        :required="true"
        minlength="8"
      />
      <FormsBaseInput
        type="password"
        label="Confirm Password"
        placeholder="Confirmation Password"
        v-model="formUser.passwordConfirm"
        :required="true"
        minlength="8"
      />
      <button class="btn btn__primary py-05 px-1 items-self-end">Complete Registration<IconsChevronRight /></button>
    </form>
  </main>
</template>

<style lang="scss" scoped></style>
