import styled from 'styled-components'

interface LandingLayoutProps {
  children: React.ReactNode
}

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: url(images/background-mobile.png) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  ${({ theme }) => theme.bp.md} {
    background: url(images/background-desktop.png) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`
