import { CTAButton } from '@/components/auth/CTAButton'
import { H1 } from '@/components/core/Typography'
import { LandingLayout } from '@/components/layouts/LandingLayout'
import Svg from '@/components/svgs'
import Head from 'next/head'
import styled from 'styled-components'

const ClaimTextContainer = styled.div`
  width: 59.2rem;
  text-align: center;
`

export default function Home() {
  return (
    <>
      <Head>
        <title>POAP Aragon Claim</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LandingLayout>
          <Svg name="logo" />
          <Svg name="poap" size={28} />
          <ClaimTextContainer>
            <H1>Claim your POAP for launching your DAO with Aragon App!</H1>
          </ClaimTextContainer>
          <CTAButton />
        </LandingLayout>
      </main>
    </>
  )
}
