import { goerli, mainnet } from '@wagmi/core'
import { getDefaultClient } from 'connectkit'
import { createClient } from 'wagmi'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const wagmiClient = createClient(
  getDefaultClient({
    appName: 'Aragon POAP',
    alchemyId: publicRuntimeConfig.processEnv.NEXT_PUBLIC_ALCHEMY_ID,
    chains:
      publicRuntimeConfig.processEnv.DEPLOYMENT_ENV === 'production'
        ? [mainnet]
        : [goerli],
  })
)
