import styled from 'styled-components'
import { Body } from './Typography'

interface ButtonWrapperProps {
  isLoading: boolean
}

const ButtonWrapper = styled.button<ButtonWrapperProps>`
  border: none;
  background: ${(props) => props.theme.colors.primary400};
  cursor: pointer;
  border-radius: 1.2rem;
  padding: 1.2rem 1.6rem;
  width: 100%;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ isLoading }) => isLoading && 'cursor: wait;'}
`

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  isLoading?: boolean
}

const Button = ({
  children,
  onClick,
  disabled = false,
  isLoading = false,
}: ButtonProps) => (
  <ButtonWrapper
    disabled={disabled}
    isLoading={isLoading}
    onClick={disabled || isLoading ? () => console.log('disabled') : onClick}
  >
    <Body $color="neutral000">{children}</Body>
  </ButtonWrapper>
)

export default Button
