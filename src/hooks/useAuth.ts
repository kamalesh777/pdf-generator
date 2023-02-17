import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Axios from '@/axios'
import ToastMessage from '@/common/ToastMessage'

interface propTypes {
  token: string
  login: (api, formvalue) => Promise<void>
  logout: () => void
  loading: boolean
}
const useAuth = (): propTypes => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const authToken = Cookies.get('auth_token')
    if (authToken) {
      setToken(authToken)
    }
  }, [])

  const login = async (apiURL: string, formValues: { username: string; password: string }): Promise<void> => {
    try {
      setLoading(true)
      const response = await Axios.post(apiURL, formValues)
      const data = await response.data

      if (data.success) {
        setToken(data.result)
        Cookies.set('auth_token', data.result)
        router.replace('/corp-details')
      }
    } catch (err) {
      router.replace('/')
      ToastMessage('error', '', err.message)
    } finally {
      setTimeout(() => setLoading(false), 1000)
    }
  }

  const logout = (): void => {
    setToken(null)
    Cookies.remove('auth_token')
    router.replace('/')
  }

  return { token, login, logout, loading }
}

export default useAuth
