import { ApolloError } from '@apollo/client'
import { useState } from 'react'
import { LandingLayout } from './layouts/LandingLayout'
import { useMintPoapMutation } from './types'

type ErrorType = 'red' | 'yellow'

type MintError = {
  message: string
  type: ErrorType
}

export const LandingView = () => {
  const [mintPoap] = useMintPoapMutation()
  const [mintError, setMintError] = useState<MintError | null>(null)
  console.log('🚀 ~ file: landing.tsx:15 ~ LandingPage ~ mintError:', mintError)

  const handleMintPoap = async () => {
    try {
      const { data } = await mintPoap()
      if (data?.mintPoap.id) {
        setMintError(null)
        // TODO: Enable see your POAP in gallery
      }
    } catch (error: unknown) {
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
              message: 'Something went wrong',
              type: 'red',
            })
          }
        }
      } else {
        console.error(error)
        setMintError({
          message: 'Something went wrong',
          type: 'red',
        })
      }
    }
  }
  return (
    <LandingLayout>
      <div>
        <button onClick={handleMintPoap}>Mint POAP</button>
      </div>
    </LandingLayout>
  )
}
