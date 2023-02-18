import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Axios from '@/axios'
import ToastMessage from '@/common/ToastMessage'
import { AFTER_SIGN_IN_URL, SIGN_IN_URL } from '@/constant/ApiConstant'

interface propTypes {
  token: string
  login: (api, formvalue) => Promise<void>
  logout: () => void
  loading: boolean
  profile: {
    name: string
    image?: string
  }
}
const useAuth = (): propTypes => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [token, setToken] = useState(null)
  const [profile, setProfile] = useState<{ name: string; image: string }>()

  useEffect(() => {
    const authToken = Cookies.get('auth_token')
    const profile_info = Cookies.get('profile')
    if (authToken) {
      setToken(authToken)
      setProfile(JSON.parse(profile_info))
    }
  }, [])

  const login = async (apiURL: string, formValues: { username: string; password: string }): Promise<void> => {
    try {
      setLoading(true)
      const response = await Axios.post(apiURL, formValues)
      const data = await response.data

      if (data.success) {
        setToken(data.result.token)
        setProfile(data.result.profile)
        Cookies.set('auth_token', data.result.token)
        Cookies.set('profile', JSON.stringify(data.result.profile))
        // Cookies.set('profile_name', data.result.profile.name)
        // Cookies.set('profile_image', data.result.profile.image)
        router.replace(AFTER_SIGN_IN_URL)
      }
    } catch (err) {
      router.replace(SIGN_IN_URL)
      ToastMessage('error', '', err.response.data.message)
    } finally {
      setTimeout(() => setLoading(false), 1000)
    }
  }

  const logout = (): void => {
    setToken(null)
    router.replace(SIGN_IN_URL)
    Cookies.remove('auth_token')
    Cookies.remove('profile')
    // Cookies.remove('profile_name')
    // Cookies.remove('profile_image')
  }

  return { token, login, logout, loading, profile }
}

export default useAuth
