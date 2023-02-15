import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { decodeToken } from 'react-jwt'
import Cookies from 'universal-cookie'
import Axios from '@/axios'
import { API_BASE_URL } from '@/constant/ApiConstant'

const cookies = new Cookies()

interface propTypes {
  token: string
  login: () => Promise<void>
  logout: () => void
}
const useAuth = (): propTypes => {
  const router = useRouter()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const authToken = cookies.get('access_token')
    if (authToken) {
      setToken(authToken)
    }
  }, [])

  // eslint-disable-next-line consistent-return
  const login = async (formValues?: { username: string; password: string }): Promise<void> => {
    const token = cookies.get('access_token')
    const user = formValues || decodeToken(token)
    try {
      const response = await Axios.post(`${API_BASE_URL}/api/user-srv/login`, user)
      const data = response.data
      console.log(data)

      setToken(data.result)
      cookies.set('access_token', data.result)
      router.replace('/corp-details')
      //   cookies.set('access_token', data.result, { expires: 7, secure: true, sameSite: 'strict' })
    } catch (err) {
      router.replace('/sign-in')
      return err.message
    }
  }

  const logout = (): void => {
    setToken(null)
    cookies.remove('access_token')
    router.replace('/sign-in')
  }

  return { token, login, logout }
}

export default useAuth
