import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { API_BASE_URL } from '@/constant/ApiConstant'

export interface responseTye {
  username: string
  isAuth: string
  isLoading: boolean
  message: string
}

const initialState = {
  username: '',
  isAuth: '',
  isLoading: true,
  message: '',
}

export const userLogin = createAsyncThunk('auth/userLogin', async (formValues?: { username: string; password: string }) => {
  // eslint-disable-next-line consistent-return
  const payload = await new Promise(async (resolve, reject) => {
    // const token = await Cookies.get('access_token')
    const user = formValues
    try {
      const response = await Axios.post(`${API_BASE_URL}/api/user-srv/login`, user)
      const data = response.data

      if (!data.success) {
        reject(data.message)
      }

      Cookies.set('access_token', data.result)

      resolve({
        message: data.message,
        isAuth: data.success,
        isLoading: data.success,
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
      state.username = 'Kamalesh Maity'
      state.isLoading = (action.payload as responseTye).isLoading
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
