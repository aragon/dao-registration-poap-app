import { wagmiClient } from '@/lib/wagmi-client'
import theme from '@/styles/theme'
import { ConnectKitProvider } from 'connectkit'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { WagmiConfig } from 'wagmi'
import GlobalStyles from '../styles/global'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Aragon POAP Claim</title>
        <meta name="description" content="Aragon POAP Claim." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <ConnectKitProvider>
            <Component {...pageProps} />
          </ConnectKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  )
}
