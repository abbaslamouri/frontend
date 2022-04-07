const useAuth = () => {
  const { errorMsg, message } = useAppState()
  const config = useRuntimeConfig()

  const user = useState('user', () =>
    useCookie('auth').value && useCookie('auth').value.user ? useCookie('auth').value.user : {}
  )
  const token = useState('token', () =>
    useCookie('auth').value && useCookie('auth').value.token ? useCookie('auth').value.token : null
  )

  const isAuthenticated = useState('isAuthenticated', () => (token && token.value ? true : false))

  const isAdmin = useState('isAdmin', () => (user.value && user.value.role === 'admin' ? true : false))

  const signup = async (user) => {
    errorMsg.value = ''
    message.value = ''
    try {
      const { data, pending, error } = await useFetch(`${config.API_URL}/auth/signup`, { method: 'POST', body: user })
      console.log('DATA', data.value)
      if (error.value) throw error.value
      if (data.value && data.value.status === 'fail') {
        if (process.client) errorMsg.value = data.value.message
        return false
      }
      const response = await $fetch('/api/v1/email', {
        method: 'POST',
        body: { user, url: 'http://localhost:3000/auth/complete-signup', action: 'signup' },
      })
      console.log('RES', response)
      return response
    } catch (err) {
      if (process.client) {
        console.log('MYERROR', err)
        errorMsg.value = err.data && err.data.message ? err.data.message : err.message ? err.message : ''
        return false
      }
    }
  }

  // const finishSignup = async (user, token) => {
  //   try {
  //     const response = await $fetch('/api/v1/auth/complete-signup', {
  //       method: 'PATCH',
  //       params: { token },
  //       body: { ...user },
  //     })
  //     console.log(response)
  //     return response
  //   } catch (error) {
  //     console.log(error.data)
  //     return { ok: false, errorMsg: error.data }
  //   }
  // }

  // const login = async (user) => {
  //   console.log('here')
  //   try {
  //     const response = await $fetch('/api/v1/auth/login', {
  //       method: 'POST',
  //       body: user,
  //     })
  //     return response
  //   } catch (error) {
  //     return { ok: false, errorMsg: error.data }
  //   }
  // }
  // const logout = async () => {
  //   try {
  //     await $fetch('/api/v1/auth/logout')
  //     return true
  //   } catch (error) {
  //     return { ok: false, errorMsg: error.data }
  //   }
  // }

  // const forgotPassword = async (email) => {
  //   try {
  //     const response = await $fetch('/api/v1/auth/forgot-password', {
  //       method: 'POST',
  //       body: { email },
  //     })
  //     return response
  //   } catch (error) {
  //     return { ok: false, errorMsg: error.data }
  //   }
  // }

  // const resetPassword = async (payload) => {
  //   console.log(payload)
  //   try {
  //     const response = await $fetch('/api/v1/auth/reset-password', {
  //       method: 'PATCH',
  //       body: payload,
  //     })
  //     return response
  //   } catch (error) {
  //     return { ok: false, errorMsg: error.data }
  //   }
  // }

  return { user, token, isAuthenticated, isAdmin, signup }
}

export default useAuth
