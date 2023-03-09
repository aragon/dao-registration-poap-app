import { ConnectKitButton } from 'connectkit'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import Button from '../core/Button'
import { NoSsr } from '../core/NoSsr'
import { Caption, CaptionBold } from '../core/Typography'
import { MintError, useMintPoap } from './useMintPoap'
import styled from 'styled-components'
import Input from '../core/Input'
import Svg from '../svgs'
import useEns from '../hooks/useEns'
import { shortenedAddress } from '@/utils/display'

const DEFAULT_CAPTION =
  'Only wallet addresses whose DAO was made with Aragon can claim POAPs.'

const getErrorComponent = ({ type, message }: MintError) => (
  <MessageContainer>
    <Svg name={type} color={type} size={1.5} />
    <CaptionBold $color={type === 'error' ? 'critical' : type}>
      {message}
    </CaptionBold>
  </MessageContainer>
)

interface CTAButtonProps {
  onMinted: () => void
}

export const CTAButton = ({ onMinted }: CTAButtonProps) => {
  const { isConnected, address } = useAccount()
  const { ens } = useEns(address)
  const displayAddress = ens ?? shortenedAddress(address)
  const { canClaimPoap, handleMintPoap, mintError, mintStatus } = useMintPoap()
  const poapGalleryUrl = `https://app.poap.xyz/scan/${ens ?? address}`

  const handleMintPoapClick = async () => {
    if (mintStatus === 'ENABLED') {
      await handleMintPoap()
    } else if (mintStatus === 'MINTED') {
      onMinted()
      window.open(poapGalleryUrl, '_blank')
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
          {isConnected && <Input placeholder={displayAddress} disabled />}
          <Button
            disabled={!['ENABLED', 'MINTED'].includes(mintStatus)}
            onClick={handleMintPoapClick}
            isLoading={mintStatus === 'MINTING'}
          >
            {mintStatus === 'MINTED'
              ? 'Check out in POAP Gallery'
              : 'Claim your POAP'}
            {mintStatus === 'MINTED' && <Svg name="arrow-right" />}
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
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1.2rem;

  ${({ theme }) => theme.bp.md} {
    width: 48rem;
  }
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
  justify-content: center;
  align-items: center;
  width: max-content;
  max-width: 100%;
`
