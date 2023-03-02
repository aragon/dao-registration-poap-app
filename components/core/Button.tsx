import styled from 'styled-components'
import { Body } from './Typography'

const ButtonWrapper = styled.button`
  border: none;
  background: ${(props) => props.theme.colors.primary400};
  cursor: pointer;
  border-radius: 1.2rem;
  padding: 1.2rem 1.6rem;
  width: 100%;
`

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}

const Button = ({ children, onClick }: ButtonProps) => (
  <ButtonWrapper onClick={onClick}>
    <Body $color="neutral000">{children}</Body>
  </ButtonWrapper>
)

export default Button
