import { AppHead } from '@/components/shared/head'
import { apolloClient } from '@/lib/apollo-client'
import { wagmiClient } from '@/lib/wagmi-client'
import theme from '@/styles/theme'
import { ApolloProvider } from '@apollo/client'
import { ConnectKitProvider } from 'connectkit'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { WagmiConfig } from 'wagmi'
import GlobalStyles from '../styles/global'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AppHead />
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <ConnectKitProvider>
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </ConnectKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  )
}

export default App
