<script setup>
const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()

const { user, token, isAuthenticated, signin } = useAuth()
const { errorMsg, message } = useAppState()
const showAuthDropdown = ref(false)
const formUser = reactive({
  email: '',
  password: '',
})

const signup = async () => {
  router.push({ name: 'auth-signup', query: { redirect: route.name } })
  showAuthDropdown.value = false
}

const login = async () => {
  showAuthDropdown.value = false
  const data = await signin(formUser)
  console.log(data)
  if (!data) return (errorMsg.value = 'signin failed, please try again later')
  const auth = useCookie('auth', {
    expires: new Date(Date.now() + config.COOKIE_EXPIRES_IN * 24 * 3600 * 1000),
    path: '/',
  })
  auth.value = data.auth
  user.value = data.auth.user
  token.value = data.auth.token
  isAuthenticated.value = true
  message.value = 'Login successful'

  // errorMsg.value = null
  // message.value = null
  // try {
  //   const { data, pending, error } = await useFetch(`${config.API_URL}/auth/signin`, {
  //     method: 'POST',
  //     body: formUser,
  //   })
  //   if (error.value) throw error.value
  //   console.log('data', data.value)
  //   const auth = useCookie('auth', {
  //     expires: new Date(Date.now() + config.COOKIE_EXPIRES_IN * 24 * 3600 * 1000),
  //     path: '/',
  //   })
  //   auth.value = data.value.auth
  //   user.value = data.value.auth.user
  //   token.value = data.value.auth.token
  //   isAuthenticated.value = true
  //   message.value = 'Login successful'
  // } catch (err) {
  //   console.log(err)
  //   // errorMsg.value = err.data.message
  // }
}

const forgotPassword = async () => {
  router.push({ name: 'auth-forgotpassword' })
  showAuthDropdown.value = false
}
</script>

<template>
  <div class="relative">
    <div class="overlay" v-if="showAuthDropdown" @click="showAuthDropdown = !showAuthDropdown"></div>
    <div class=" ">
      <div
        class="header flex-row items-center gap-1 text-xs border border-slate-50 py-05 px-1 cursor-pointer br-3 relative z-99"
        :class="{ selected: showAuthDropdown }"
        @click="showAuthDropdown = !showAuthDropdown"
      >
        <IconsPersonFill class="fill-slate-50" />
        <h3 class="font-light uppercase text-slate-50">Sign in / Create acount</h3>
      </div>
      <form class="shadow-md flex-col gap-2 bg-slate-50 p-2 absolute z-99 text-slate-800" v-if="showAuthDropdown">
        <h3 class="title">Sin in</h3>
        <p class="text-xs">Access your account and place an order:</p>
        <div class="flex-col gap1">
          <FormsBaseInput label="Email" type="email" v-model="formUser.email" required />
          <FormsBaseInput label="Password" type="password" v-model="formUser.password" required />
        </div>

        <div>
          <button class="btn btn__secondary w-full justify-between px-1 py-05 text-xs" @click.prevent="forgotPassword">
            <p>Forgot Password?</p>
            <IconsChevronRight />
          </button>
        </div>
        <button class="btn btn__secondary w-full flex-row justify-between px-1 py-05 text-xs" @click.prevent="login">
          <p>Sign in</p>
          <IconsChevronRight />
        </button>
        <p class="text-sm">New User?</p>
        <button class="btn btn__secondary w-full justify-between px-1 py-05 text-xs" @click.prevent="signup">
          <p>Create an account</p>
          <IconsChevronRight />
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.header {
  &:hover,
  &.selected {
    border-radius: 3px 3px 0 0;
    background-color: $slate-50;

    h3 {
      color: $slate-800;
    }

    svg {
      fill: $slate-800;
    }
  }
}

form {
  border-radius: 0 0 3px 3px;
}
</style>
