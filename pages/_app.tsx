/* eslint-disable no-restricted-imports */
import '../styles/bootstrap-utility.scss'
import '../styles/antd-override.scss'
import '../styles/invoice-bill.scss'
import '../styles/globals.scss'

import LayoutWrapper from '@/layout/Index'
import type { AppProps } from 'next/app'
import SignIn from '@/components/SignIn'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SignIn />
      {/* <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper> */}
    </>
  )
}
