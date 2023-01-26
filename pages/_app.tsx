/* eslint-disable no-restricted-imports */
import '../styles/bootstrap-utility.scss'
import '../styles/globals.scss'

import LayoutWrapper from '@/layout/Index'
import type { AppProps } from 'next/app'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
  )
}
