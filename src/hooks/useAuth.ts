import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Axios from '@/axios'
import { API_BASE_URL } from '@/constant/ApiConstant'

interface propTypes {
  token: string
  login: () => Promise<void>
  logout: () => void
}
const useAuth = (): propTypes => {
  const router = useRouter()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const authToken = Cookies.get('access_token')
    if (authToken) {
      setToken(authToken)
    }
  }, [])

  // eslint-disable-next-line consistent-return
  const login = async (formValues?: { username: string; password: string }): Promise<void> => {
    // const token = Cookies.get('access_token')
    const user = formValues
    try {
      const response = await Axios.post(`${API_BASE_URL}/api/user-srv/login`, user)
      const data = response.data

      setToken(data.result)
      Cookies.set('access_token', data.result)
      router.replace('/corp-details')
      //   Cookies.set('access_token', data.result, { expires: 7, secure: true, sameSite: 'strict' })
    } catch (err) {
      router.replace('/sign-in')
      return err.message
    }
  }

  const logout = (): void => {
    setToken(null)
    Cookies.remove('access_token')
    router.replace('/sign-in')
  }

  return { token, login, logout }
}

export default useAuth
