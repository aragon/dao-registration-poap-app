import { ApolloError } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useCanClaimPoapLazyQuery, useMintPoapMutation } from '../types'
import { useLogin } from './useLogin'

type ErrorType = 'red' | 'yellow'

type MintError = {
  message: string
  type: ErrorType
}

type MintStatus =
  | 'PENDING'
  | 'VALIDATING'
  | 'ENABLED'
  | 'DISABLED'
  | 'MINTING'
  | 'MINTED'

export const useMintPoap = () => {
  const { address } = useAccount()
  const [mintError, setMintError] = useState<MintError | null>(null)
  const [mintStatus, setMintStatus] = useState<MintStatus>('PENDING')
  const [mintPoap] = useMintPoapMutation()
  const { loginConnectedAccount, loggedIn, loggingIn } = useLogin()
  const [camClaimPoapQuery, camClaimPoapQueryResponse] =
    useCanClaimPoapLazyQuery()

  // Resolve what to do whe canClaimPoap query is done
  useEffect(() => {
    if (
      camClaimPoapQueryResponse &&
      !camClaimPoapQueryResponse.loading &&
      mintStatus === 'VALIDATING'
    ) {
      if (camClaimPoapQueryResponse.data?.canClaimPoap) {
        setMintStatus('ENABLED')
      } else {
        resolveError(camClaimPoapQueryResponse.error)
        setMintStatus('DISABLED')
      }
    }
  }, [mintStatus, camClaimPoapQueryResponse])

  const canClaimPoap = async () => {
    if (address) {
      setMintStatus('VALIDATING')
      camClaimPoapQuery({
        variables: {
          address,
        },
      })
    }
  }

  // Trigger Mint Poap
  const handleMintPoap = async () => {
    setMintStatus('MINTING')
    loginConnectedAccount()
  }

  // Perform Mint Poap
  useEffect(() => {
    const claimPoap = async () => {
      try {
        const { data } = await mintPoap()
        if (data?.mintPoap.id) {
          setMintError(null)
          setMintStatus('MINTED')
        }
      } catch (error: unknown) {
        resolveError(error)
        setMintStatus('DISABLED')
      }
    }
    if (mintStatus === 'MINTING' && !loggingIn) {
      loggedIn ? claimPoap() : setMintStatus('DISABLED')
    }
  }, [loggedIn, mintStatus, loggingIn, mintPoap])

  // Private utility function to resolve errors
  const resolveError = (error: unknown) => {
    if (error instanceof ApolloError) {
      const { graphQLErrors } = error
      const [graphQLError] = graphQLErrors
      if (graphQLError) {
        const { message, extensions } = graphQLError
        if (extensions?.code === 'INVALID_ADDRESS_ERROR') {
          setMintError({
            message,
            type: 'red',
          })
        } else if (extensions?.code === 'ALREADY_MINTED_ERROR') {
          setMintError({
            message,
            type: 'yellow',
          })
        } else {
          console.error(error)
          setMintError({
            message: 'API Error',
            type: 'red',
          })
        }
      }
    } else {
      console.error(error)
      setMintError({
        message: `Not Apollo error  ${error} `,
        type: 'red',
      })
    }
  }

  return { handleMintPoap, canClaimPoap, mintError, mintStatus }
}
