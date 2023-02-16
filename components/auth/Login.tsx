import { UserRejectedRequestError, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { useEffect, useMemo, useRef, useState } from 'react'
import Router from 'next/router'
import { ConnectKitButton } from 'connectkit'
import { NoSsr } from '../core/NoSsr'

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
class NoAccessTokenError extends Error {}

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
  nonce: null,
  status: LoginStatus.INITIALIZING,
  userActive: false,
}

interface SignInButtonProps {
  onClick: (() => void) | undefined
  address: string | undefined
  isConnected: boolean
}

const SignInButton = ({ onClick, isConnected, address }: SignInButtonProps) => {
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
    const fetchNonce = async () => {
      if (fetchingNonce.current === true) {
        // block state-driven updates from triggering multiple fetches
        return
      }
      fetchingNonce.current = true

      try {
        const nonceRes = await fetch('http://localhost:3000/auth/nonce')
        const nonceResponse = await nonceRes.json()
        console.log(
          '🚀 ~ file: Login.tsx:93 ~ fetchNonce ~ nonce',
          nonceResponse
        )
        setLoginState((s) => ({
          ...s,
          nonce: nonceResponse.nonce,
          status: LoginStatus.CHECKING_CONNECTION,
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

      fetchingNonce.current = false
    }

    if (loginState.status === LoginStatus.INITIALIZING) {
      fetchNonce()
    }
  }, [loginState.status])

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
        console.log(
          '🚀 ~ file: Login.tsx:130 ~ authenticate ~ message',
          message
        )
        console.log(
          '🚀 ~ file: Login.tsx:131 ~ authenticate ~ signature',
          signature
        )

        const verifyResponse = await fetch(
          'http://localhost:3000/auth/verify',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, signature }),
          }
        )

        if (!verifyResponse.ok) {
          throw new SignVerificationError('Unable to verify sign message')
        }

        setLoginState((s) => ({
          ...s,
          status: LoginStatus.REQUESTING_ACCESS,
        }))
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
        // const me = await fetch('/api/auth/me', {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // })

        // const response = await me.json()

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
      // Router.push(loginState.userActive ? '/projects' : '/onboarding')
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
