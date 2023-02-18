import axios from 'axios'
import Cookie from 'js-cookie'
import { API_BASE_URL } from '@/constant/ApiConstant'

const Axios = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: '',
  },
})

Axios.interceptors.request.use(function (config) {
  const token = Cookie.get('auth_token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})
export default Axios
