import { goerli, mainnet } from '@wagmi/core'
import { getDefaultClient } from 'connectkit'
import { createClient } from 'wagmi'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const wagmiClient = createClient(
  getDefaultClient({
    appName: publicRuntimeConfig.alchemy.appName,
    alchemyId: publicRuntimeConfig.alchemy.id,
    chains: publicRuntimeConfig.networkId === '1' ? [mainnet] : [goerli],
  })
)
