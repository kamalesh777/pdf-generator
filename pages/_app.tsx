/* eslint-disable no-restricted-imports */
import '../styles/bootstrap-utility.scss'
import '../styles/antd-override.scss'
import '../styles/invoice-bill.scss'
import '../styles/globals.scss'

import { useEffect } from 'react'
import useAuth from '@/hooks/useAuth'

import type { AppProps } from 'next/app'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function App({ Component, pageProps }: AppProps) {
  const { login, token } = useAuth()
  useEffect(() => {
    login()
  }, [])
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
