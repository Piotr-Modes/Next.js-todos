import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import theme from '@rebass/preset'

import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'theme-ui'

import LocalStorageUpdater from '../components/utilities/LocalStorageUpdater'
import FullPageLoader from '../components/utilities/FullPageLoader'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true))
    router.events.on('routeChangeComplete', () => setLoading(false))
  })
  return (
    <RecoilRoot>
      <LocalStorageUpdater />
      <ThemeProvider theme={theme}>
        {loading && <FullPageLoader />}
        {!loading && <Component {...pageProps} />}
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp
