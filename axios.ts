import axios from 'axios'
import Cookie from 'js-cookie'
import { API_BASE_URL } from '@/constant/ApiConstant'

const Axios = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${Cookie.get('auth_token')}`,
  },
})

export default Axios
