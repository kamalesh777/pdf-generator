import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'
import { decodeToken } from 'react-jwt'
import Cookies from 'universal-cookie'
import { API_BASE_URL } from '@/constant/ApiConstant'

const cookies = new Cookies()

export interface responseTye {
  username: string
  isAuth: string
  isLoading: boolean
  message: string
}

const initialState = {
  username: '',
  isAuth: '',
  isLoading: false,
  message: '',
}

export const userLogin = createAsyncThunk('auth/userLogin', async (formValues?: { username: string; password: string }) => {
  // eslint-disable-next-line consistent-return
  const payload = await new Promise(async (resolve, reject) => {
    const token = await cookies.get('access_token')
    const user = formValues || decodeToken(token)
    try {
      const response = await Axios.post(`${API_BASE_URL}/api/user-srv/login`, user)
      const data = response.data

      if (!data.success) {
        reject(data.message)
      }

      cookies.set('access_token', data.result)

      resolve({
        message: data.message,
        isAuth: data.success,
        username: 'Kamalesh Maity',
      })
    } catch (err) {
      return err.message
    }
  })
  return payload
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(userLogin.pending, state => {
      // Add user to the state array
      state.isLoading = true
    })
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.message = (action.payload as responseTye).message
      state.isAuth = (action.payload as responseTye).isAuth
      state.username = (action.payload as responseTye).username
      state.isLoading = false
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false
      state.message = action.error.message
    })
  },
  reducers: undefined,
})

// Action creators are generated for each case reducer function
// export  authSlice.actions;
export default authSlice.reducer
