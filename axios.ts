import axios from 'axios'
import { API_BASE_URL } from '@/constant/ApiConstant'

const Axios = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export default Axios
