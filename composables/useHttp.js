const useHttp = () => {
  const config = useRuntimeConfig()
  const { errorMsg, message } = useAppState()

  // const user = useState('user', () =>
  //   useCookie('auth').value && useCookie('auth').value.user ? useCookie('auth').value.user : {}
  // )
  // const token = useState('token', () =>
  //   useCookie('auth').value && useCookie('auth').value.token ? useCookie('auth').value.token : null
  // )

  // const isAuthenticated = useState('isAuthenticated', () => (token && token.value ? true : false))

  // const isAdmin = useState('isAdmin', () => (user.value && user.value.role === 'admin' ? true : false))

  const fetchAll = async (resource, params) => {
    errorMsg.value = null
    message.value = 'GGGGGGG'
    try {
      const { data, pending, error } = await useFetch(`${config.API_URL}/${resource}`)
      console.log(data.value)
      if (error.value) throw error.value
      if (data.value && data.value.status === 'fail') {
        console.log('DATAT', data.value.message)
        if (process.client) errorMsg.value = data.value.message
        return { docs: [], totalCount: 0 }
      }
      return data.value
    } catch (err) {
      if (process.client) {
        console.log('MYERROR', err)
        errorMsg.value = err.data && err.data.message ? err.data.message : err.message ? err.message : ''
        return { docs: [], totalCount: 0 }
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

  return { fetchAll }
}

export default useHttp