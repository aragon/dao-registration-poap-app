import { CTAButton } from '@/components/auth/CTAButton'
import { H1 } from '@/components/core/Typography'
import { LandingLayout } from '@/components/layouts/LandingLayout'
import Svg from '@/components/svgs'
import styled from 'styled-components'
import { useState } from 'react'
import Image from 'next/image'
import { NoSsr } from '@/components/core/NoSsr'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { processEnv },
} = getConfig()

console.log('🚀 processEnv', processEnv)

const ClaimTextContainer = styled.div`
  max-width: 59.2rem;
  text-align: center;
`

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    justify-content: center;
  }
`

interface Props {
  NEXT_PUBLIC_GRAPHQL_BASE_URL_GLOBAL?: string
  NEXT_PUBLIC_GRAPHQL_BASE_URL?: string
  NEXT_PUBLIC_GRAPHQL_BASE_URL_PROCESSENV?: string
}

export default function Home(props: Props) {
  console.log('🚀 ~ file: index.tsx:34 ~ Home ~ props:', props)
  const [isMinted, setIsMinted] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  console.log(
    '🚀 ~ file: index.tsx:13 ~ process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL:',
    process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL
  )

  console.log(
    '🚀 ~ file: index.tsx:13 ~ processEnv.NEXT_PUBLIC_GRAPHQL_BASE_UR:',
    processEnv.NEXT_PUBLIC_GRAPHQL_BASE_URL
  )

  console.log(
    '🚀 ~ file: index.tsx:13 ~ processEnv.NODE_ENV',
    processEnv.NODE_ENV
  )

  console.log(
    '🚀 ~ file: index.tsx:13 ~ process.env.NODE_ENV',
    process.env.NODE_ENV
  )

  return (
    <main>
      <LandingLayout>
        <LogoContainer>
          <Svg name="logo" />
        </LogoContainer>
        {isMobile ? (
          <NoSsr>
            <Image
              src="/images/og-image.png"
              alt="POAP"
              width={300}
              height={300}
              priority={true}
            />
          </NoSsr>
        ) : (
          <NoSsr>
            <Svg name="poap" size={30} />
          </NoSsr>
        )}
        <ClaimTextContainer>
          {isMinted ? (
            <H1>
              You have successfully <br /> claimed your Aragon Builder POAP!
            </H1>
          ) : (
            <H1>
              Claim your POAP for launching your
              <br /> DAO with Aragon!
            </H1>
          )}
        </ClaimTextContainer>
        <CTAButton onMinted={() => setIsMinted(true)} />
      </LandingLayout>
    </main>
  )
}

export async function getServerSideProps() {
  const { publicRuntimeConfig } = getConfig()

  return {
    props: {
      NEXT_PUBLIC_GRAPHQL_BASE_URL_GLOBAL:
        global.process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
      NEXT_PUBLIC_GRAPHQL_BASE_URL: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
      NEXT_PUBLIC_GRAPHQL_BASE_URL_PROCESSENV:
        publicRuntimeConfig.processEnv.NEXT_PUBLIC_GRAPHQL_BASE_URL,
    },
  }
}
