import { LoadingOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SignIn from '@/components/SignIn'
import type { RootState } from '@/store/index'
import { userLogin } from '@/store/slices/authSlice'

const Index = (): JSX.Element => {
  const dispatch = useDispatch()
  const authState = useSelector(state => (state as RootState).auth)
  const router = useRouter()

  useEffect(() => {
    dispatch(userLogin(null))
    if (authState.isAuth) {
      void router.replace('/corp-details')
    }
  }, [authState.isAuth]) //eslint-disable-line
  return authState.isLoading ? <LoadingOutlined /> : <SignIn />
}

export default Index
