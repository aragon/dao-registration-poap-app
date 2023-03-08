import { SiweMessage } from 'siwe'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { useLoginMutation, useNonceQuery } from '../types'
import { apolloClient } from '@/lib/apollo-client'
import { disconnect } from '@wagmi/core'
import { useCallback, useState } from 'react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const useLogin = () => {
  const { data } = useNonceQuery()
  const [login] = useLoginMutation()
  const { signMessageAsync } = useSignMessage()
  const { chain: activeChain } = useNetwork()
  const { address } = useAccount()
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)

  const loginConnectedAccount = useCallback(async () => {
    if (data) {
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: activeChain?.id,
        nonce: data.nonce,
      })

      try {
        setLoggingIn(true)
        const signature = await signMessageAsync({
          message: message.prepareMessage(),
        })

        if (signature) {
          const result = await login({
            variables: {
              domain: message.domain,
              address: message.address,
              statement: message.statement ?? '',
              uri: message.uri,
              version: message.version,
              chainId: message.chainId,
              nonce: message.nonce,
              issuedAt: message.issuedAt,
              signature,
            },
          })
          if (result?.data?.login) {
            localStorage.setItem(publicRuntimeConfig.loginKey ?? '', signature)
            apolloClient.resetStore()

            setLoggedIn(true)
          } else {
            setLoggedIn(false)
          }
        }
      } catch (error) {
        console.log(error)
        disconnect()
        apolloClient.resetStore()
        setLoggedIn(false)
      } finally {
        setLoggingIn(false)
      }
    }
  }, [data, login, signMessageAsync, address, activeChain])

  return { loginConnectedAccount, loggingIn, loggedIn }
}
