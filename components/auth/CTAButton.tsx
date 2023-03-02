import { ConnectKitButton } from 'connectkit'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import Button from '../core/Button'
import { NoSsr } from '../core/NoSsr'
import { Caption } from '../core/Typography'
import { useMintPoap } from './useMintPoap'
import styled from 'styled-components'

const DEFAULT_CAPTION =
  'Only wallet addresses whose DAO was made with Aragon can claim POAPs.'

export const CTAButton = () => {
  const { isConnected } = useAccount()
  const { canClaimPoap, handleMintPoap, mintError, mintStatus, mintedPoap } =
    useMintPoap()
  const poapGalleryUrl = `https://poap.gallery/event/${mintedPoap?.event?.externalId}`

  const handleMintPoapClick = async () => {
    if (mintStatus === 'ENABLED') {
      await handleMintPoap()
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
          <Button
            disabled={mintStatus !== 'ENABLED'}
            onClick={handleMintPoapClick}
            isLoading={mintStatus === 'MINTING'}
          >
            Claim POAP
          </Button>
          <Caption>{mintError?.message ?? DEFAULT_CAPTION}</Caption>
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
