/* eslint-disable no-restricted-imports */
import '../styles/bootstrap-utility.scss'
import '../styles/antd-override.scss'
import '../styles/invoice-bill.scss'
import '../styles/globals.scss'
import { Provider } from 'react-redux'
import { store } from '@/store/index'

import type { AppProps } from 'next/app'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
