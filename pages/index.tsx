import { CTAButton } from '@/components/auth/CTAButton'
import { H1 } from '@/components/core/Typography'
import { LandingLayout } from '@/components/layouts/LandingLayout'
import Svg from '@/components/svgs'
import styled from 'styled-components'
import { useState } from 'react'

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

export default function Home() {
  const [isMinted, setIsMinted] = useState(false)

  return (
    <main>
      <LandingLayout>
        <LogoContainer>
          <Svg name="logo" />
        </LogoContainer>
        <Svg name="poap" size={30} />
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
