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
    authState.isAuth && void router.replace('/corp-details')
  }, [authState.isAuth]) //eslint-disable-line
  return <SignIn />
}

export default Index

// export async function getServerSideProps({ req }): Promise<responseType> {
//   console.log('decode token============', decodeToken(req.cookies.access_token))
//   const { username = 'k', password = 'a' } = decodeToken<bodyProps>(req?.cookies?.access_token)

//   const getResponse = await fetch(`${API_BASE_URL}/api/user-srv/login`, {
//     method: 'POST',
//     body: JSON.stringify({
//       username,
//       password,
//     }),
//   })
//   const response = await getResponse.json()
//   const data = await response.data
//   const user = decodeToken(data.result)

//   return {
//     props: {
//       loogedIn: data.success,
//       ...user,
//       message: data.message,
//     }, // will be passed to the page component as props
//   }
// }
