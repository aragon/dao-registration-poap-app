import { goerli, mainnet } from '@wagmi/core'
import { getDefaultClient } from 'connectkit'
import { createClient } from 'wagmi'

export const wagmiClient = createClient(
  getDefaultClient({
    appName: 'Aragon POAP',
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: process.env.NODE_ENV === 'production' ? [mainnet] : [goerli],
  })
)
