import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import Button from '../core/Button'
import { NoSsr } from '../core/NoSsr'
import styled from 'styled-components'
import useEns from '../hooks/useEns'
import { shortenedAddress } from '@/utils/display'
import { useLogin } from './useLogin'

export const InternalLoginButton = () => {
  const { isConnected, address } = useAccount()
  const { loginConnectedAccount, loggedIn, loggingIn } = useLogin()
  const { ens } = useEns(address)

  if (!isConnected) {
    return (
      <NoSsr>
        <ConnectKitButton.Custom>
          {({ show, address, isConnected }) => (
            <ButtonContainer>
              <SignInButton
                onClick={show}
                address={address}
                isConnected={isConnected}
              />
            </ButtonContainer>
          )}
        </ConnectKitButton.Custom>
      </NoSsr>
    )
  } else {
    return (
      <NoSsr>
        <ButtonContainer>
          <Button
            disabled={loggedIn}
            onClick={loginConnectedAccount}
            isLoading={loggingIn}
          >
            {loggedIn ? ens ?? shortenedAddress(address) : 'Sign in'}
          </Button>
        </ButtonContainer>
      </NoSsr>
    )
  }
}

interface SignInButtonProps {
  onClick: (() => void) | undefined
  address: string | undefined
  isConnected: boolean
}

const SignInButton = ({ onClick }: SignInButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return <Button onClick={handleClick}>Connect Wallet</Button>
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1.2rem;

  ${({ theme }) => theme.bp.md} {
    width: 48rem;
  }
`
