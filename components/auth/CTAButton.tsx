import { ConnectKitButton } from 'connectkit'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import Button from '../core/Button'
import { NoSsr } from '../core/NoSsr'
import { Caption, CaptionBold } from '../core/Typography'
import { MintError, useMintPoap } from './useMintPoap'
import styled from 'styled-components'
import Input from '../core/Input'
import Svg from '../svgs'

const DEFAULT_CAPTION =
  'Only wallet addresses whose DAO was made with Aragon can claim POAPs.'

const getErrorComponent = ({ type, message }: MintError) => (
  <CaptionBold $color={type === 'error' ? 'critical' : type}>
    <Svg name={type} color={type} size={5} />
    {message}
  </CaptionBold>
)

export const CTAButton = () => {
  const { isConnected } = useAccount()
  const { canClaimPoap, handleMintPoap, mintError, mintStatus } = useMintPoap()
  const [eventId, setEventId] = useState<number | null>(null)

  const handleMintPoapClick = async () => {
    if (mintStatus === 'ENABLED') {
      await handleMintPoap()
      setEventId(1)
    }
  }

  useEffect(() => {
    if (isConnected && mintStatus === 'PENDING' && !mintError) {
      canClaimPoap()
    }
  }, [isConnected, canClaimPoap, mintStatus, mintError])

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
              <Caption>{DEFAULT_CAPTION}</Caption>
            </ButtonContainer>
          )}
        </ConnectKitButton.Custom>
      </NoSsr>
    )
  } else {
    return (
      <NoSsr>
        <ButtonContainer>
          <Input placeholder="ens/address" />
          <Button
            disabled={mintStatus !== 'ENABLED'}
            onClick={handleMintPoapClick}
            isLoading={mintStatus === 'MINTING'}
          >
            Claim POAP
          </Button>
          {mintError?.message ? (
            getErrorComponent(mintError)
          ) : (
            <Caption>{DEFAULT_CAPTION}</Caption>
          )}
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
  max-width: 32rem;
  gap: 1.2rem;

  ${({ theme }) => theme.bp.md} {
    display: flex;
    width: 32rem;
  }
`
