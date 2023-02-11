import axios from 'axios'
import { API_BASE_URL } from '@/constant/ApiConstant'

const Axios = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Cookies: 'name=kamalesh',
    Authorization: 'Bearer token',
  },
})

export default Axios
