import { UserRejectedRequestError, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ConnectKitButton } from 'connectkit'
import { NoSsr } from '../core/NoSsr'
import Router from 'next/router'
import { apolloClient } from '@/lib/apollo-client'
import { useLoginMutation, useNonceLazyQuery } from '../types'

export const Login = () => {
  return (
    <NoSsr>
      <ConnectKitButton.Custom>
        {({ show, address, isConnected }) => (
          <>
            <SignInButton
              onClick={show}
              address={address}
              isConnected={isConnected}
            />
          </>
        )}
      </ConnectKitButton.Custom>
    </NoSsr>
  )
}

class SignVerificationError extends Error {}

enum LoginStatus {
  INITIALIZING = 'INITIALIZING',
  GETTING_NONCE = 'GETTING_NONCE',
  CHECKING_CONNECTION = 'CHECKING_CONNECTION',
  AUTHENTICATING = 'AUTHENTICATING',
  REQUESTING_ACCESS = 'REQUESTING_ACCESS',
  FORWARDING = 'FORWARDING',
  ERROR = 'ERROR',
}

interface LoginState {
  cause: Error | null
  nonce: string | null
  status: LoginStatus
  userActive: boolean
}

const initialLoginState: LoginState = {
  cause: null,
  status: LoginStatus.INITIALIZING,
  nonce: null,
  userActive: false,
}

interface SignInButtonProps {
  onClick: (() => void) | undefined
  address: string | undefined
  isConnected: boolean
}

const SignInButton = ({ onClick, isConnected, address }: SignInButtonProps) => {
  const [nonce, { called, loading, data }] = useNonceLazyQuery()
  const [login] = useLoginMutation()
  const fetchingNonce = useRef<boolean>(false)
  const [loginState, setLoginState] = useState<LoginState>(initialLoginState)
  const { chain: activeChain } = useNetwork()
  const { signMessageAsync } = useSignMessage()

  const siweMessage = useMemo(() => {
    return address && activeChain?.id && loginState.nonce
      ? new SiweMessage({
          domain: window.location.host,
          address,
          statement: 'Sign in with Ethereum to the app.',
          uri: window.location.origin,
          version: '1',
          chainId: activeChain?.id,
          nonce: loginState.nonce,
        })
      : undefined
  }, [activeChain, address, loginState.nonce])

  // 1. Fetch nonce
  // Pre-fetch random nonce when button is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  useEffect(() => {
    if (loginState.status === LoginStatus.INITIALIZING) {
      nonce()
    }
  }, [loginState.status, data])

  // 1.1 Wait for nonce to be fetched
  useEffect(() => {
    console.log(data?.nonce)
    if (called && !loading && data?.nonce) {
      setLoginState((s) => ({
        ...s,
        nonce: data.nonce,
        status: LoginStatus.CHECKING_CONNECTION,
      }))
    }
  }, [called, loading, data])

  // 2. When connected, update status to move forward
  useEffect(() => {
    if (isConnected && loginState.status === LoginStatus.CHECKING_CONNECTION) {
      setLoginState((s) => ({ ...s, status: LoginStatus.AUTHENTICATING }))
    }
  }, [isConnected, loginState.status])

  // 3. Authenticate with SIWE
  useEffect(() => {
    const authenticate = async (message: SiweMessage) => {
      try {
        const signature = await signMessageAsync({
          message: message.prepareMessage(),
        })

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
          localStorage.setItem(
            process.env.NEXT_PUBLIC_LOGIN_KEY ?? '',
            signature
          )
          apolloClient.resetStore()

          setLoginState((s) => ({
            ...s,
            status: LoginStatus.REQUESTING_ACCESS,
          }))
        }
      } catch (error: unknown) {
        if (error instanceof UserRejectedRequestError) {
          // user rejected, do nothing
          return
        }

        if (error instanceof SignVerificationError) {
          // nonce likely expired, restart flow
          setLoginState(initialLoginState)
          return
        }

        if (error instanceof Error) {
          setLoginState((s) => ({
            ...s,
            cause: error as Error,
            status: LoginStatus.ERROR,
          }))
        }
      }
    }
    if (siweMessage && loginState.status === LoginStatus.AUTHENTICATING) {
      authenticate(siweMessage)
    }
  }, [loginState.status, signMessageAsync, siweMessage])

  // 4. Request Access
  useEffect(() => {
    const requestAccess = async () => {
      try {
        setLoginState((s) => ({
          ...s,
          status: LoginStatus.FORWARDING,
          userActive: true,
        }))
      } catch (error: unknown) {
        if (error instanceof Error) {
          setLoginState((s) => ({
            ...s,
            cause: error as Error,
            status: LoginStatus.ERROR,
          }))
        }
      }
    }

    if (loginState.status === LoginStatus.REQUESTING_ACCESS) {
      requestAccess()
    }
  }, [loginState.status])

  // 5. Forward appropriately
  useEffect(() => {
    if (loginState.status === LoginStatus.FORWARDING) {
      Router.push('/landing')
    }
  }, [loginState.status, loginState.userActive])

  const handleClick = () => {
    if (!isConnected && onClick) {
      // get wallet connection
      onClick()
    } else {
      // start authentication over, retaining wallet connection
      setLoginState(initialLoginState)
    }
  }

  return <button onClick={handleClick}>Sign in with Ethereum</button>
}
